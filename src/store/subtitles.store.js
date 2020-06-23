import { parse } from "subtitle";

// eslint-disable-next-line no-unused-vars
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
    },
    actions: {
        async addOriginalSubtitles ({ commit, dispatch }, event) {
            let subtitles = await dispatch('uploadFile', event);
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
        async uploadFile (state, event) {
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
