import moment from "moment";
import SOCKET_STATUS from '../enums/socket.status';

export default {
    namespaced: true,
    state: {
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
    },
    mutations:{
        SET_PLAYING_STATUS (state, event) {
            state.isPlaying = event;
        }
    }
}
