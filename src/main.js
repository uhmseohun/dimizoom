import Vue from 'vue';
import AdFit from 'vue-adfit-component';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';

Vue.use(AdFit.Banner);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
