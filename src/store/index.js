import Vue from 'vue'
import Vuex from 'vuex'


import Worker from 'workerize-loader!../workers/worker';
import createWorkerPlugin from './plugins/store.worker.plugin';

import socket from './socket.store';
import subtitles from './subtitles.store';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        socket,
        subtitles
    },
    plugins: [createWorkerPlugin(Worker())]
});
