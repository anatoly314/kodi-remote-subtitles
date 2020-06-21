import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex';

import { routes } from './routes';
import store from './store'
import vuetify from './vuetify';


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);


const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  render: h => h(App),
  router,
  store,
  vuetify
}).$mount('#app')
