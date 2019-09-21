import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import router from '@/router';

const id = process.env.MIX_GOOGLE_ANALYTICS_ID;

Vue.use(VueAnalytics, {
  id: id || 'N/A',
  disabled: !id,
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production',
  },
  autoTracking: {
    pageviewOnLoad: false,
  },
});
