import WebSocketExtended from './websocket.extended';
import KODI_REQUESTS from './kodi.requests';

let socket;
let kodiMessageCallback;
let kodiConnectionStateCallback;
let delayedResponseBag = {};

function _initListeners () {
    socket.onstate = function () {
        const currentReadyState = socket.STATES[socket.readyState];
        if (kodiConnectionStateCallback) {
            kodiConnectionStateCallback(currentReadyState);
        }
    }

    socket.onmessage = function (rawMessage) {
        const message = JSON.parse(rawMessage.data);
        const messageId = message.id;
        if (delayedResponseBag[messageId]) {    // user initiated action
            const duration = performance.now() - delayedResponseBag[messageId].started;
            message.duration = duration;
            delayedResponseBag[messageId].resolve(message);
        } else if (kodiMessageCallback) {       // player initiated action
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

/**
 * Kodi commands
 */

export function ping () {
    const request = KODI_REQUESTS.PING;
    const delayedResponse = new Promise((resolve, reject) => {
      delayedResponseBag[KODI_REQUESTS.PING.id] = {
          resolve: resolve,
          reject: reject,
          started: performance.now()
      }
    });
    send(request);
    return delayedResponse;
}

export function currentSpeed () {

}

export function currentMovieDetails () {

}

export function currentTime () {

}

export function changeToDeltaMs () {

}

export function inputBack () {

}

export function togglePlayPause () {

}
