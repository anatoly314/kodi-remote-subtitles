import SOCKET_STATE from '../enums/socket.states';
import {
    connect,
    disconnect,
    ping,
    requestCurrentSpeed,
    requestCurrentMovieDetails,
    requestCurrentTime,
    inputBack, togglePlayPause
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
        async REQUEST_CURRENT_TIME () {
            const response = await requestCurrentTime();
            console.log(response);
        },
        INPUT_BACK () {
            inputBack();
        },
        TOGGLE_PLAY_PAUSE () {
            togglePlayPause();
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
        ON_MESSAGE ({ commit }, message) {
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
        },
        ON_CONNECTION_STATE_CHANGES ({ dispatch, commit }, connectionState) {
            commit('SET_CONNECTION_STATE', connectionState);
            dispatch('SYNC_PLAYING_STATUS');
        },
        CONNECT ({ state, dispatch }) {
            const onMessage = dispatch.bind(null, 'ON_MESSAGE');
            const onConnectionChange = dispatch.bind(null, 'ON_CONNECTION_STATE_CHANGES');
            connect(state.url, onMessage, onConnectionChange);
        },
        DISCONNECT () {
            disconnect();
        }
    },
    mutations:{
        SET_PLAYING_STATUS (state, value) {
            state.isPlaying = value;
        },
        SET_CONNECTION_STATE(state, value){
            state.connectionState = value;
        }
    }
}
