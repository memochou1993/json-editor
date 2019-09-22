import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store/index';
import i18n from '@/i18n/index';
import vuetify from '@/plugins/vuetify';
import '@/plugins/axios';
import '@/plugins/editor';
import '@/plugins/analytics';
import '@/sass/main.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
