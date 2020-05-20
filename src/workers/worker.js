import WebSocketExtended from './websocket.extended';
import WORKER_MESSAGES from '../enums/worker.messages';

let socket;

function _initListeners () {
    socket.onstate = function () {
        const currentReadyState = socket.STATES[socket.readyState];
        postMessage([WORKER_MESSAGES.STATE_CHANGED, currentReadyState]);
    }

    socket.onmessage = function (message) {
        postMessage([WORKER_MESSAGES.KODI_MESSAGE, message.data])
    }
}

export function send(message) {
    socket.send(message);
}


export function connect(url) {
    socket = new WebSocketExtended(url);
    _initListeners();
}

export function disconnect() {
    socket.close();
}
