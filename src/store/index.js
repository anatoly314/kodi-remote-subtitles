import Vue from 'vue'
import Vuex from 'vuex'

//
// import Worker from 'workerize-loader!../workers/worker';
// import createWorkerPlugin from './plugins/store.worker.plugin';

import subtitles from './subtitles.store';
import kodi from './kodi.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        subtitles,
        kodi
    }
});
