let animationFrame = null;
let startedCalculatingTimeAt = 0;
let RESYNC_EVERY_SECONDS = 60;

let kodiState = {
    getters: {},
    actions: {
        SYNC_PLAYING_TIME: null
    },
    mutations: {
        SET_CURRENT_CALCULATED_PLAY_TIME: null
    }
}


function calculateTime() {
    const syncTimestamp = kodiState.getters.syncTimestamp;
    const currentPlayTimeInMilliseconds = kodiState.getters.currentPlayTimeInMilliseconds;
    const diffSinceSync = performance.now() - syncTimestamp;
    const currentCalculatedPlayTimeMs = currentPlayTimeInMilliseconds + diffSinceSync;
    kodiState.mutations.SET_CURRENT_CALCULATED_PLAY_TIME(currentCalculatedPlayTimeMs)
    const secondsSinceStartedCalculating = (performance.now() - startedCalculatingTimeAt) / 1000;
    if (secondsSinceStartedCalculating > RESYNC_EVERY_SECONDS) {
        kodiState.actions.SYNC_PLAYING_TIME();
        startedCalculatingTimeAt = performance.now();
    }
    animationFrame = requestAnimationFrame(calculateTime);
}

export function startCalculate(SET_CURRENT_CALCULATED_PLAY_TIME, SYNC_PLAYING_TIME, getters) {
    kodiState.mutations.SET_CURRENT_CALCULATED_PLAY_TIME = SET_CURRENT_CALCULATED_PLAY_TIME;
    kodiState.actions.SYNC_PLAYING_TIME = SYNC_PLAYING_TIME;
    kodiState.getters = getters;
    startedCalculatingTimeAt = performance.now();
    animationFrame = requestAnimationFrame(calculateTime);
}

export function stopCalculate() {
    cancelAnimationFrame(animationFrame);
    animationFrame = null;
}
