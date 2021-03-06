import moment from "moment";

import SOCKET_STATE from '../enums/socket.states';
import {
    connect,
    disconnect,
    ping,
    requestCurrentSpeed,
    requestCurrentMovieDetails,
    requestCurrentTime,
    inputBack, togglePlayPause,
    toggleSubtitles,
    setPlayingToTime,
    isSubtitlesPlaying
} from '../websockets/websocket';
import { startCalculate, stopCalculate } from '../utils/time-calculator';
import KODI_METHODS from "../enums/kodi.methods";

export default {
    namespaced: true,
    state: {
        kodiIpPort: null,
        isPlaying: false,
        connectionState: SOCKET_STATE.CLOSED,
        currentPlayTimeInMilliseconds: 0,
        currentCalculatedPlayTimeMs: 0,
        syncTimestamp: 0
    },
    getters: {
        getKodiIpPort: state => state.kodiIpPort,
        connectionState: state => state.connectionState,
        isPlaying: state => state.isPlaying,
        currentPlayTimeInMilliseconds: state => state.currentPlayTimeInMilliseconds,
        currentCalculatedPlayTimeMs: state => state.currentCalculatedPlayTimeMs,
        syncTimestamp: state => state.syncTimestamp,
        currentPlayingTimeHumanReadable: state => {
            const currentCalculatedPlayTimeMs = state.currentCalculatedPlayTimeMs;
            const currentPlayingTimeDuration = moment.duration(currentCalculatedPlayTimeMs, 'milliseconds');
            const currentPlayingTimeHumanReadable =  moment.utc(currentPlayingTimeDuration.as('milliseconds')).format('HH:mm:ss');
            return currentPlayingTimeHumanReadable;
        }
    },
    actions: {
        /**
         * BASIC KODI ACTIONS
         */
        async CONNECT ({ state, dispatch }) {
            const url = `ws://${state.kodiIpPort}/jsonrpc`;
            const onMessage = dispatch.bind(null, 'ON_MESSAGE');
            const onConnectionChange = dispatch.bind(null, 'ON_CONNECTION_STATE_CHANGES');
            await connect(url, onMessage, onConnectionChange);
        },
        DISCONNECT () {
            disconnect();
        },
        async PING () {
            const response = await ping();
            console.log(response);
        },
        async REQUEST_CURRENT_SPEED () {
            const response = await requestCurrentSpeed();
            const currentSpeed = response.result.speed;
            return currentSpeed;
        },
        async REQUEST_CURRENT_MOVIE_DETAILS () {
            const response = await requestCurrentMovieDetails();
            const movieDetails = {
                filename: response.result['Player.Filename'],
                title: response.result['Player.Title'],
                fps: response.result['Player.Process(VideoFPS)']
            }
            return movieDetails;
        },
        async CHANGE_TO_DELTA_SECONDS ({ state }, deltaSeconds) {
            const currentPlayingTime = moment.duration(state.currentCalculatedPlayTimeMs, 'milliseconds');
            const newPlayingTime = currentPlayingTime.clone().add(deltaSeconds, 'seconds');
            const hours = newPlayingTime.hours();
            const minutes = newPlayingTime.minutes();
            const seconds = newPlayingTime.seconds();
            const milliseconds = newPlayingTime.milliseconds();
            await setPlayingToTime(hours, minutes, seconds, milliseconds);
        },
        async REQUEST_CURRENT_TIME () {
            const response = await requestCurrentTime();
            const hours = response.result.time.hours;
            const minutes = response.result.time.minutes;
            const seconds = response.result.time.seconds;
            const milliseconds = response.result.time.milliseconds;
            const requestDuration = response.__duration;
            let currentTimeInMs = (((hours * 60 * 60) + (minutes * 60) + seconds) * 1000) + milliseconds;
            currentTimeInMs += requestDuration / 2;
            return currentTimeInMs;
        },
        async INPUT_BACK () {
            await inputBack();
        },
        async TOGGLE_PLAY_PAUSE ({dispatch}) {
            await dispatch('SYNC_PLAYING_TIME');
            await togglePlayPause();
        },
        async TURN_SUBTITLES_ON () {
            await toggleSubtitles(true);
        },
        async TURN_SUBTITLES_OFF () {
            await toggleSubtitles(false);
        },
        async IS_SUBTITLES_PLAYING () {
            const response = await isSubtitlesPlaying();
            const result = response.result.subtitleenabled;
            return result;
        },
        /**
         * COMPOSED KODI ACTIONS
         */
        SET_CURRENT_PLAYING_TIME ({ commit, getters }, timeInMs) {
            commit('SET_CURRENT_PLAYING_TIME', timeInMs);
            if (!getters.isPlaying) {
                commit('SET_CURRENT_CALCULATED_PLAY_TIME', timeInMs);
            }

        },
        async MOVE_TO_SPECIFIC_TIME({ dispatch }, timeInMs) {
            dispatch('SET_CURRENT_PLAYING_TIME', timeInMs);
            const duration = moment.duration(timeInMs, 'milliseconds');
            const hours = duration.hours();
            const minutes = duration.minutes();
            const seconds = duration.seconds();
            const milliseconds = duration.milliseconds();
            await setPlayingToTime(hours, minutes, seconds, milliseconds);
        },
        async TOGGLE_SUBTITLES ({ dispatch }) {
            const isSubtitlesPlaying = await dispatch('IS_SUBTITLES_PLAYING');
            if (isSubtitlesPlaying) {
                await dispatch('TURN_SUBTITLES_OFF');
            } else {
                await dispatch('TURN_SUBTITLES_ON');
            }
        },
        async MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES ({dispatch}, deltaSeconds) {
          await dispatch('TURN_SUBTITLES_ON');
          await dispatch('CHANGE_TO_DELTA_SECONDS', -deltaSeconds);
        },
        async SYNC_PLAYING_STATUS ({ dispatch, commit, state }) {
            if (state.connectionState !== SOCKET_STATE.OPEN) {
                commit('SET_PLAYING_STATUS', false);
                return;
            }

            const playingSpeed = await dispatch('REQUEST_CURRENT_SPEED');
            if (playingSpeed === 0) {
                commit('SET_PLAYING_STATUS', false);
            } else {
                commit('SET_PLAYING_STATUS', true);
            }
        },
        async SYNC_PLAYING_TIME({ dispatch }) {
            const currentPlayingTimeMs = await dispatch('REQUEST_CURRENT_TIME');
            dispatch('SET_CURRENT_PLAYING_TIME', currentPlayingTimeMs);
        },
        /**
         * KODI CALLBACKS
         */
        ON_MESSAGE ({ commit, dispatch }, message) {
            const method = message.method;
            if (method && method === KODI_METHODS["Player.OnPause"]) {
                commit('SET_PLAYING_STATUS', false);
            } else if (method && method === KODI_METHODS["Player.OnStop"]) {
                commit('SET_PLAYING_STATUS', false);
            } else if (method && method === KODI_METHODS["Player.OnResume"]) {
                commit('SET_PLAYING_STATUS', true);
            } else if (method && method === KODI_METHODS["Player.OnAVStart"]) {
                commit('SET_PLAYING_STATUS', true);
            } else if (method && method === KODI_METHODS["Player.OnSeek"]) {
                dispatch('SYNC_PLAYING_TIME');
            } else {
                console.log('UNKNOWN MESSAGE', message);
            }
            dispatch('SYNC_PLAYING_TIME');
        },
        ON_CONNECTION_STATE_CHANGES ({ dispatch, commit }, connectionState) {
            commit('SET_CONNECTION_STATE', connectionState);
            dispatch('SYNC_PLAYING_STATUS');
            if (connectionState === SOCKET_STATE.OPEN) {
                dispatch('SYNC_PLAYING_TIME');
            }
        },
        /**
         * SERVICE
         */
        START_CALCULATE_TIME ({ commit, getters, dispatch }) {
            const setCalculatedTimeCallback = commit.bind(null, 'SET_CURRENT_CALCULATED_PLAY_TIME');
            const syncPlayingTimeCallback = dispatch.bind(null, 'SYNC_PLAYING_TIME');
            startCalculate(
                setCalculatedTimeCallback,
                syncPlayingTimeCallback,
                getters
            );
        },
        STOP_CALCULATE_TIME () {
            stopCalculate();
        }
    },
    mutations:{
        SET_PLAYING_STATUS (state, value) {
            state.isPlaying = value;
        },
        SET_CURRENT_PLAYING_TIME(state, value) {
            state.currentPlayTimeInMilliseconds = value;
            state.syncTimestamp = performance.now();
        },
        SET_CURRENT_CALCULATED_PLAY_TIME(state, value) {
          state.currentCalculatedPlayTimeMs = value;
        },
        SET_CONNECTION_STATE(state, value) {
            state.connectionState = value;
        },
        SET_KODI_IP_PORT(state, value) {
            state.kodiIpPort = value;
        }
    }
}
