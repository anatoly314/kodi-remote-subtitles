import moment from "moment";

import SOCKET_STATUS from '../enums/socket.status';
import { connect, disconnect, ping } from '../websockets/websocket';

export default {
    namespaced: true,
    state: {
        url: 'ws://192.168.1.8:9090/jsonrpc',
        isPlaying: false,
        connectionStatus: SOCKET_STATUS.CLOSED,
        currentPlayTime: moment.utc().startOf('day')
    },
    getters: {
        isPlaying: state => state.isPlaying,
        currentPlayTime: state => state.currentPlayTime,
        currentPlayTimeInMilliseconds: state => {
            const startOfTheDay = state.currentPlayTime.clone().startOf('day');
            const diffMilliseconds = state.currentPlayTime.diff(startOfTheDay, 'milliseconds');
            return diffMilliseconds;
        }
    },
    actions: {
        async PING () {
            const response = await ping();
            console.log(response);
        },
        // eslint-disable-next-line no-unused-vars
        ON_MESSAGE ({ state }, value) {
            console.log('ON_MESSAGE', value)
        },
        // eslint-disable-next-line no-unused-vars
        ON_CONNECTION_STATE_CHANGES ({ state }, value) {
            console.log('ON_CONNECTION_STATE_CHANGES', value)
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
        SET_PLAYING_STATUS (state, event) {
            state.isPlaying = event;
        }
    }
}
