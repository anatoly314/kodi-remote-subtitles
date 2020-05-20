import WORKER_MESSAGES from '../../enums/worker.messages';
import SOCKET_STATUS from '../../enums/socket.status';
import KODI_MESSAGES from '../../enums/kodi.messages';

let socketstatus = SOCKET_STATUS;

function _processKodiMessages(store, message) {
    if (message.id === KODI_MESSAGES.CURRENT_TIME) {
        store.dispatch('socket/setCurrentPlayTime', message.result.time);
    } else {
        console.log(KODI_MESSAGES.UNKNOWN_MESSAGE, message);
    }
}

export default function createWorkerPlugin (worker) {
    return store => {
        store.commit('socket/INIT_WORKER', worker);
        worker.onmessage = e => {
            const messageType = e.data[0];
            const messageValue = e.data[1];

            if (messageType === WORKER_MESSAGES.STATE_CHANGED){
                store.commit('socket/SET_STATUS', socketstatus[messageValue]);
            } else if (messageType === WORKER_MESSAGES.KODI_MESSAGE){
                _processKodiMessages(store, JSON.parse(messageValue));
            }
         }
    }
}
