import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";


import subtitles from './subtitles.store';
import kodi from './kodi.store';
Vue.use(Vuex);

const dataState = new createPersistedState({
    paths: ['kodi.kodiIpPort', 'subtitles.originalSubtitles']
})

export default new Vuex.Store({
    modules: {
        subtitles,
        kodi
    },
    plugins: [dataState]
});
