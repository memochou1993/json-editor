import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/e/:code?',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '*',
      redirect: {
        name: 'home',
      },
    },
  ],
});
