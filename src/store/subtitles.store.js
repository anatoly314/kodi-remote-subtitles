import { parse } from "subtitle";

export default {
    namespaced: true,
    state: {
        originalSubtitles: ''
    },
    getters: {
        originalSubtitles: status => status.originalSubtitles,
    },
    actions: {
        async addOriginalSubtitles ({ commit, dispatch }, event) {
            const subtitles = await dispatch('uploadFile', event);
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
