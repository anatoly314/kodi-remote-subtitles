import { parse } from "subtitle";
import {download, getSubtitlesListByQuery} from "../utils/opensubtitles";
import {translate} from "../utils/google-translate";
import openSubtitlesLangugages from "../utils/opensubtitles-languages.json";

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
            text: row.text ? row.text.trim() : '',
            id: calculateHash(`${row.start}-${row.end}-${row.text}`)
        }
    })
    return subtitles;
}

export default {
    namespaced: true,
    state: {
        originalSubtitles: [],
        translationSubtitles: [],
        subtitlesTimingDeltaMs: 0,
        subtitlesLanguage: undefined,
        subtitlesTranslationLanguage: undefined
    },
    getters: {
        subtitlesTimingDeltaMs: state => state.subtitlesTimingDeltaMs,
        originalSubtitles: state => state.originalSubtitles,
        translationSubtitles: state => state.translationSubtitles,
        subtitlesLanguage: state => state.subtitlesLanguage,
        subtitlesTranslationLanguage: state => state.subtitlesTranslationLanguage,
        openSubtitlesLangugages: () => {
            return openSubtitlesLangugages;
        },
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
        },
        activeRowTranslation: (state, getters, rootState, rootGetters) => {
            // https://github.com/vuejs/vue/issues/6660#issuecomment-331417140
            const translationSubtitles = state.translationSubtitles;
            const subtitlesTimingDeltaMs = state.subtitlesTimingDeltaMs;
            let currentPlayingTimeMs = rootGetters['kodi/currentCalculatedPlayTimeMs'];
            let currentPlayingTimeWithDeltaMs = currentPlayingTimeMs + subtitlesTimingDeltaMs;
            let activeRowTranslation = -1;
            for (let i = 0; i < translationSubtitles.length; i++){
                const row = translationSubtitles[i];
                const followingRow = translationSubtitles[i + 1];
                const start = row.start;
                const followingStart = followingRow ? followingRow.start : start + 1;
                if (currentPlayingTimeWithDeltaMs >= start && currentPlayingTimeWithDeltaMs < followingStart) {
                    activeRowTranslation = i;
                    break;
                }
            }
            return activeRowTranslation;
        }
    },
    actions: {
        async GET_SUBTITLES_LIST_BY_QUERY(state, { query, language, translationLanguage }) {
            const subtitlesList = await getSubtitlesListByQuery(query, language, translationLanguage);
            let subtitlesByLanguage = [];
            for (const currentLanguageKey of Object.keys(subtitlesList)){
                const subtitlesByCurrentLanguage = currentLanguageKey ? subtitlesList[currentLanguageKey] : [];
                subtitlesByLanguage = subtitlesByLanguage.concat(subtitlesByCurrentLanguage);
            }
            return subtitlesByLanguage;
        },
        async DOWNLOAD_SUBTITLES_BY_ID (state, id) {
            const subtitles = await download(id);
            return subtitles;
        },
        async ADD_ORIGINAL_SUBTITLES_FILE ({ commit, dispatch }, event) {
            let subtitles = await dispatch('UPLOAD_FILE', event);
            subtitles = addIdToSubtitles(subtitles);
            commit('SET_ORIGINAL_SUBTITLES', subtitles);
        },
        async ADD_ORIGINAL_SUBTITLES_API ({ commit }, subtitlesString) {
            let subtitles = parse(subtitlesString);
            subtitles = addIdToSubtitles(subtitles);
            commit('SET_ORIGINAL_SUBTITLES', subtitles);
        },
        async ADD_TRANSLATION_SUBTITLES_API ({ commit }, subtitlesString) {
            let subtitles = parse(subtitlesString);
            subtitles = addIdToSubtitles(subtitles);
            commit('SET_TRANSLATION_SUBTITLES', subtitles);
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
        },
        async TRANSLATE_SUBTITLES_ROW(state, { subtitlesRow, subtitlesLanguage, subtitlesTranslationLanguage }) {
            const sourceLanguage = subtitlesLanguage.ISO639;
            const translationLanguage = subtitlesTranslationLanguage.ISO639;
            const subtitlesList = await translate(subtitlesRow, sourceLanguage, translationLanguage);
            return subtitlesList;
        }
    },
    mutations:{
        SET_ORIGINAL_SUBTITLES: (state, event) => {
            state.originalSubtitles = event;
        },
        SET_TRANSLATION_SUBTITLES: (state, event) => {
            state.translationSubtitles = event;
        },
        SET_SUBTITLES_TIMING_DELTA_MS: (state, event) => {
            let deltaMs = Number.parseInt(event);
            deltaMs = isNaN(deltaMs) ? 0 : deltaMs;
            state.subtitlesTimingDeltaMs = deltaMs;
        },
        SET_SUBTITLES_LANGUAGE: (state, event) => {
            state.subtitlesLanguage = event;
        },
        SET_SUBTITLES_TRANSLATION_LANGUAGE: (state, event) => {
            state.subtitlesTranslationLanguage = event;
        }
    }
}
