import Vue from 'vue';
import { parse } from "subtitle";
import {download, getSubtitlesListByQuery} from "../utils/opensubtitles";

const calculateHash = function(string) {
    let hash = 0, i, chr;
    for (i = 0; i < string.length; i++) {
        chr   = string.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
}

const addIdToSubtitles = function(subtitles) {
    subtitles = subtitles.map(row => {
        return {
            start: row.start,
            end: row.end,
            text: row.text.trim(),
            id: calculateHash(`${row.start}-${row.end}-${row.text}`)
        }
    })
    return subtitles;
}

export default {
    namespaced: true,
    state: {
        originalSubtitles: [],
        subtitlesTimingDeltaMs: 0
    },
    getters: {
        subtitlesTimingDeltaMs: state => state.subtitlesTimingDeltaMs,
        originalSubtitles: state => state.originalSubtitles,
        activeRow: (state, getters, rootState, rootGetters) => {
            // https://github.com/vuejs/vue/issues/6660#issuecomment-331417140
            const originalSubtitles = state.originalSubtitles;
            const subtitlesTimingDeltaMs = state.subtitlesTimingDeltaMs;
            let currentPlayingTimeMs = rootGetters['kodi/currentCalculatedPlayTimeMs'];
            let currentPlayingTimeWithDeltaMs = currentPlayingTimeMs + subtitlesTimingDeltaMs;
            let activeRow = -1;
            for (let i = 0; i < originalSubtitles.length; i++){
                const row = originalSubtitles[i];
                const followingRow = originalSubtitles[i + 1];
                const start = row.start;
                const followingStart = followingRow ? followingRow.start : start + 1;
                if (currentPlayingTimeWithDeltaMs >= start && currentPlayingTimeWithDeltaMs < followingStart) {
                    activeRow = i;
                    break;
                }
            }
            return activeRow;
        }
    },
    actions: {
        async GET_SUBTITLES_LIST_BY_QUERY(state, query) {
            const subtitlesList = await getSubtitlesListByQuery(query);
            return subtitlesList;
        },
        async DOWNLOAD_SUBTITLES_BY_ID (state, id) {
            const subtitles = await download(id);
            Vue.prototype.$bus.$emit('show-notification', {
                type: 'info',
                text: 'Subtitles successfully donwloaded'
            });
            return subtitles;
        },
        async ADD_ORIGINAL_SUBTITLES_FILE ({ commit, dispatch }, event) {
            let subtitles = await dispatch('UPLOAD_FILE', event);
            subtitles = addIdToSubtitles(subtitles);
            commit('SET_ORIGINAL_SUBTITLES', subtitles);
        },
        // eslint-disable-next-line no-unused-vars
        async ADD_ORIGINAL_SUBTITLES_API ({ commit, dispatch }, subtitlesString) {
            let subtitles = parse(subtitlesString);
            subtitles = addIdToSubtitles(subtitles);
            commit('SET_ORIGINAL_SUBTITLES', subtitles);
        },
        async UPLOAD_FILE (state, event) {
            return new Promise((resolve, reject) => {
                const files = event.target.files || event.dataTransfer.files;
                if (!files.length) {
                    return;
                }
                const file = files[0];

                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target.result;
                    const base64 = result.split(",")[1];
                    const string = atob(base64);
                    const subtitles = parse(string);
                    return resolve(subtitles);
                };

                reader.onerror = (error) => {
                    return reject(error);
                }

                reader.readAsDataURL(file);
            })
        }
    },
    mutations:{
        SET_ORIGINAL_SUBTITLES: (state, event) => {
            state.originalSubtitles = event;
        },
        SET_SUBTITLES_TIMING_DELTA_MS: (state, event) => {
            let deltaMs = Number.parseInt(event);
            deltaMs = isNaN(deltaMs) ? 0 : deltaMs;
            state.subtitlesTimingDeltaMs = deltaMs;
        }
    }
}
