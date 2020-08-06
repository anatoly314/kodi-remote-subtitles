import WebSocketExtended from './websocket.extended';
import KODI_REQUESTS from './kodi.requests';

const RESPONSE_TIMEOUT = 5000; //ms
let timeoutIntervalId;
let delayedResponseBag = {};

let socket;
let kodiMessageCallback;
let kodiConnectionStateCallback;
let isConnecting = false;
let connectionPromise = {
    resolve: null,
    reject: null
};

function _delayedResponseBagTimeoutMonitor() {
    const keys = Object.keys(delayedResponseBag);
    keys.forEach(key => {
        const now = performance.now();
        const started = delayedResponseBag[key].started;
        if (now - started > RESPONSE_TIMEOUT) {
            const reject = delayedResponseBag[key].reject;
            const error = Error(`Timeout of ${RESPONSE_TIMEOUT}ms for request ${key} expired`);
            console.error(error);
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
        console.log(currentReadyState);
        if (isConnecting && currentReadyState === 'CLOSED') {
            connectionPromise.reject('Connection error');
            isConnecting = false;
        } else if (isConnecting) {
            connectionPromise.resolve();
            isConnecting = false;
        } else if (currentReadyState === 'CONNECTING') {
            isConnecting = true;
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
    return new Promise((resolve, reject) => {
        connectionPromise.resolve = resolve;
        connectionPromise.reject = reject;
        kodiMessageCallback = messageCallback;
        kodiConnectionStateCallback = connectionStateCallback;
        if (socket) {
            disconnect();
        }
        socket = new WebSocketExtended(url);
        _initListeners();
        timeoutIntervalId = setInterval(_delayedResponseBagTimeoutMonitor, RESPONSE_TIMEOUT);
    })
}

export function disconnect() {
    clearInterval(timeoutIntervalId);
    socket.close();
}

/**
 * Kodi commands
 */

export function sendAsyncRequest (request) {
    const newRequest = Object.assign({}, request);
    const delayedResponse = new Promise((resolve, reject) => {
        newRequest.id = `${newRequest.id}-${performance.now()}`;
        delayedResponseBag[newRequest.id] = {
          resolve: resolve,
          reject: reject,
          started: performance.now()
        }
    });
    send(newRequest);
    return delayedResponse;
}

export const ping = sendAsyncRequest.bind(null, KODI_REQUESTS.PING);
export const requestCurrentSpeed = sendAsyncRequest.bind(null, KODI_REQUESTS.CURRENT_SPEED);
export const requestCurrentMovieDetails = sendAsyncRequest.bind(null, KODI_REQUESTS.CURRENT_MOVIE_DETAILS);
export const requestCurrentTime = sendAsyncRequest.bind(null, KODI_REQUESTS.CURRENT_TIME);
export const inputBack = sendAsyncRequest.bind(null, KODI_REQUESTS.INPUT_BACK);
export const togglePlayPause = sendAsyncRequest.bind(null, KODI_REQUESTS.TOGGLE_PLAY_PAUSE);
export const isSubtitlesPlaying = sendAsyncRequest.bind(null, KODI_REQUESTS.IS_SUBTITLES_PLAYING);
export function setPlayingToTime (hours, minutes, seconds, milliseconds) {
    const request = KODI_REQUESTS.CHANGE_TO_DELTA_SECONDS;
    request.params.value.hours = hours;
    request.params.value.minutes = minutes;
    request.params.value.seconds = seconds;
    request.params.value.milliseconds = Math.ceil(milliseconds);
    return sendAsyncRequest(request);
}
export function toggleSubtitles (isSubtitleOn) {
    const request = KODI_REQUESTS.TOGGLE_SUBTITLES;
    request.params.subtitle = isSubtitleOn ? "on" : "off"
    return sendAsyncRequest(request);
}

