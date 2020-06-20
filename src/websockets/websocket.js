import WebSocketExtended from './websocket.extended';
import KODI_REQUESTS from './kodi.requests';

const RESPONSE_TIMEOUT = 5000; //ms
let timeoutIntervalId;
let delayedResponseBag = {};

let socket;
let kodiMessageCallback;
let kodiConnectionStateCallback;

function _delayedResponseBagTimeoutMonitor() {
    const keys = Object.keys(delayedResponseBag);
    keys.forEach(key => {
        const now = performance.now();
        const strated = delayedResponseBag[key].started;
        if (now - strated > RESPONSE_TIMEOUT) {
            const reject = delayedResponseBag[key].reject;
            const error = Error(`Timeout of ${RESPONSE_TIMEOUT}ms for request ${key} expired`);
            reject(error);
            delete delayedResponseBag[key];
        }
    });
}

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
            message.__duration = duration;
            delayedResponseBag[messageId].resolve(message);
            delete delayedResponseBag[messageId];
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
    timeoutIntervalId = setInterval(_delayedResponseBagTimeoutMonitor, RESPONSE_TIMEOUT);
}

export function disconnect() {
    clearInterval(timeoutIntervalId);
    socket.close();
}

/**
 * Kodi commands
 */

export function sendAsyncRequest (request) {
    const delayedResponse = new Promise((resolve, reject) => {
      delayedResponseBag[request.id] = {
          resolve: resolve,
          reject: reject,
          started: performance.now()
      }
    });
    send(request);
    return delayedResponse;
}

export const ping = sendAsyncRequest.bind(null, KODI_REQUESTS.PING);
export const requestCurrentSpeed = sendAsyncRequest.bind(null, KODI_REQUESTS.CURRENT_SPEED);
export const requestCurrentMovieDetails = sendAsyncRequest.bind(null, KODI_REQUESTS.CURRENT_MOVIE_DETAILS);
export const requestCurrentTime = sendAsyncRequest.bind(null, KODI_REQUESTS.CURRENT_TIME);
export const inputBack = sendAsyncRequest.bind(null, KODI_REQUESTS.INPUT_BACK);
export const togglePlayPause = sendAsyncRequest.bind(null, KODI_REQUESTS.TOGGLE_PLAY_PAUSE);
export function setPlayingToTime (hours, minutes, seconds, milliseconds) {
    const request = KODI_REQUESTS.CHANGE_TO_DELTA_MS;
    request.params.value.hours = hours;
    request.params.value.minutes = minutes;
    request.params.value.seconds = seconds;
    request.params.value.milliseconds = milliseconds;
    return sendAsyncRequest(request);
}
export function toggleSubtitles (isSubtitleOn) {
    const request = KODI_REQUESTS.TOGGLE_SUBTITLES;
    request.params.subtitle = isSubtitleOn ? "on" : "off"
    return sendAsyncRequest(request);
}

