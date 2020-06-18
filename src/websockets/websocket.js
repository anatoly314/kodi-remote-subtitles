import WebSocketExtended from './websocket.extended';

let socket;
let kodiMessageCallback;
let kodiConnectionStateCallback;

function _initListeners () {
    socket.onstate = function () {
        const currentReadyState = socket.STATES[socket.readyState];
        if (kodiConnectionStateCallback) {
            kodiConnectionStateCallback(currentReadyState);
        }
    }

    socket.onmessage = function (rawMessage) {
        const message = JSON.parse(rawMessage.data);
        if (kodiMessageCallback) {
            kodiMessageCallback(message);
        }
    }
}

export function send(message) {
    socket.send(JSON.stringify(message));
}

export function connect(url, messageCallback, connectionStateCallback) {
    kodiMessageCallback = messageCallback;
    kodiConnectionStateCallback = connectionStateCallback;
    if (socket) {
        disconnect();
    }
    socket = new WebSocketExtended(url);
    _initListeners();
}

export function disconnect() {
    socket.close();
}
