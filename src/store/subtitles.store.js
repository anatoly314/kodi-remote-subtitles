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

export default {
    namespaced: true,
    state: {
        originalSubtitles: []
    },
    getters: {
        originalSubtitles: status => status.originalSubtitles,
        activeRow: (state, getters, rootState, rootGetters) => {
            // https://github.com/vuejs/vue/issues/6660#issuecomment-331417140
            const originalSubtitles = state.originalSubtitles;
            const currentPlayingTimeMs = rootGetters['kodi/currentCalculatedPlayTimeMs'];
            let activeRow = -1;
            for (let i = 0; i < originalSubtitles.length; i++){
                const row = originalSubtitles[i];
                const followingRow = originalSubtitles[i + 1];
                const start = row.start;
                const followingStart = followingRow ? followingRow.start : start + 1;
                if (currentPlayingTimeMs >= start && currentPlayingTimeMs < followingStart) {
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
            return subtitles;
        },
        async ADD_ORIGINAL_SUBTITLES ({ commit, dispatch }, event) {
            let subtitles = await dispatch('UPLOAD_FILE', event);
            subtitles = subtitles.map(row => {
                return {
                    start: row.start,
                    end: row.end,
                    text: row.text.trim(),
                    id: calculateHash(`${row.start}-${row.end}-${row.text}`)
                }
            })
            commit('ADD_ORIGINAL_SUBTITLES', subtitles);
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
        ADD_ORIGINAL_SUBTITLES: (state, event) => {
            state.originalSubtitles = event;
        }
    }
}
