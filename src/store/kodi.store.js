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
    setPlayingToTime
} from '../websockets/websocket';
import KODI_METHODS from "../enums/kodi.methods";

export default {
    namespaced: true,
    state: {
        url: 'ws://192.168.1.8:9090/jsonrpc',
        isPlaying: false,
        connectionState: SOCKET_STATE.CLOSED,
        currentPlayTimeInMilliseconds: 0
    },
    getters: {
        connectionState: state => state.connectionState,
        isPlaying: state => state.isPlaying,
        currentPlayTime: state => state.currentPlayTime,
        currentPlayTimeInMilliseconds: state => state.currentPlayTimeInMilliseconds
    },
    actions: {
        /**
         * BASIC KODI ACTIONS
         */
        CONNECT ({ state, dispatch }) {
            const onMessage = dispatch.bind(null, 'ON_MESSAGE');
            const onConnectionChange = dispatch.bind(null, 'ON_CONNECTION_STATE_CHANGES');
            connect(state.url, onMessage, onConnectionChange);
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
            console.log(response);
        },
        async CHANGE_TO_DELTA_MS ({ state, dispatch }, deltaSeconds) {
            await dispatch('SYNC_PLAYING_TIME');
            const currentPlayingTime = moment.duration(state.currentPlayTimeInMilliseconds, 'milliseconds');
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
            const currentTimeInMs = (((hours * 60 * 60) + (minutes * 60) + seconds) * 1000) + milliseconds;
            return currentTimeInMs;
        },
        INPUT_BACK () {
            inputBack();
        },
        TOGGLE_PLAY_PAUSE () {
            togglePlayPause();
        },
        /**
         * COMPOSED KODI ACTIONS
         */
        async MOVE_BACKWARD_TO_SECONDS_AND_TURN_ON_SUBTITLES ({dispatch}, deltaSeconds) {
          await dispatch('TURN_SUBTITLES_ON');
          await dispatch('CHANGE_TO_DELTA_MS', -deltaSeconds);
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
        async SYNC_PLAYING_TIME({ dispatch, commit }) {
            const currentPlayingTimeMs = await dispatch('REQUEST_CURRENT_TIME');
            commit('SET_CURRENT_PLAYING_TIME', currentPlayingTimeMs)
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
        async TURN_SUBTITLES_ON () {
            await toggleSubtitles(true);
        },
        async TURN_SUBTITLES_OFF () {
            await toggleSubtitles(false);
        }
    },
    mutations:{
        SET_PLAYING_STATUS (state, value) {
            state.isPlaying = value;
        },
        SET_CURRENT_PLAYING_TIME(state, value) {
            state.currentPlayTimeInMilliseconds = value;
        },
        SET_CONNECTION_STATE(state, value) {
            state.connectionState = value;
        }
    }
}