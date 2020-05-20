import moment from "moment";

import SOCKET_STATUS from "../enums/socket.status";
import kodiRequests from './kodi.requests';

const KODI_URL = 'ws://192.168.1.8:9090/jsonrpc';

export default {
    namespaced: true,
    state: {
        socket: {
            status: SOCKET_STATUS.CLOSED
        },
        worker: null,
        currentPlayTime: moment.utc().startOf('day'),
        currentPlayTimeInMilliseconds: 0
    },
    getters: {
        status: state => state.socket.status,
        currentPlayTime: state => state.currentPlayTime,
        currentPlayTimeInMilliseconds: state => {
            const startOfTheDay = state.currentPlayTime.clone().startOf('day');
            const diffMilliseconds = state.currentPlayTime.diff(startOfTheDay, 'milliseconds');
            return diffMilliseconds;
        },
    },

    actions: {
        // eslint-disable-next-line no-unused-vars
        setCurrentPlayTime ({commit}, message){
            const hours = message.hours;
            const minutes = message.minutes;
            const seconds = message.seconds;
            const milliseconds = message.milliseconds;


            const stringTime = `${hours}:${minutes}:${seconds}:${milliseconds}`;
            const currentPlayTime = moment.utc(stringTime, "H:mm:ss:SSS");
            commit('SET_CURRENT_PLAY_TIME', currentPlayTime);
        },
        togglePollingGetCurrentTime({state}) {
            const request = kodiRequests.CURRENT_TIME;
            state.worker.togglePollingGetCurrentTime(request);
        },
        getCurrentTime: function({ dispatch }) {
            const request = kodiRequests.CURRENT_TIME;
            dispatch('sendMessage', request);
        },
        changeToDeltaSeconds ({ dispatch, getters }, deltaSeconds) {
            const newPlayTime = getters.currentPlayTime.add(deltaSeconds, "seconds");
            const hours = Number.parseInt(newPlayTime.format("H"));
            const minutes = Number.parseInt(newPlayTime.format("mm"));
            const seconds = Number.parseInt(newPlayTime.format("ss"));
            const milliseconds = Number.parseInt(newPlayTime.format("SSS"));
            const request = kodiRequests.CHANGE_TO_DELTA_MS;
            request.params.value.hours = hours;
            request.params.value.minutes = minutes;
            request.params.value.seconds = seconds;
            request.params.value.milliseconds = milliseconds;
            dispatch('sendMessage', request);
        },
        backButton: function ({dispatch}) {
            const request = kodiRequests.INPUT_BACK;
            dispatch('sendMessage', request);
        },
        togglePlayPause: function({dispatch}) {
            const request = kodiRequests.TOGGLE_PLAY_PAUSE;
            dispatch('sendMessage', request);
        },
        sendMessage: function({ state }, message) {
            if (state.socket.status === SOCKET_STATUS.OPEN && state.worker) {
                state.worker.send(message);
            }
        },
        connectKodi: function ({state}) {
            state.worker.connect(KODI_URL);
        },
        disconnectKodi: function ({state}) {
            state.worker.disconnect();
        }
    },
    mutations:{
        INIT_WORKER (state, event) {
          state.worker = event;
        },
        SET_STATUS (state, event) {
            state.socket.status = event;
        },
        SET_CURRENT_PLAY_TIME (state, event) {
            state.currentPlayTime = event;
        }
    }
}
