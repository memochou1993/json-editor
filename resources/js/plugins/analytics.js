import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import router from '@/router';

Vue.use(VueAnalytics, {
  id: process.env.MIX_GOOGLE_ANALYTICS_ID,
  router,
  debug: {
    sendHitTask: process.env.NODE_ENV === 'production',
  },
  autoTracking: {
    pageviewOnLoad: false,
  },
});
