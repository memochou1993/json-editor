import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/new',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/:code?',
      name: 'home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/edit/:code?',
      redirect: {
        name: 'home',
      },
    },
    {
      path: '*',
      redirect: {
        name: 'home',
      },
    },
  ],
});
