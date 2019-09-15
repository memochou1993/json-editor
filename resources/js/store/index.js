import Vue from 'vue';
import Vuex from 'vuex';
import editor from '@/store/modules/editor';
import record from '@/store/modules/record';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    editor,
    record,
  },
  state: {
    error: null,
    loading: false,
    component: '',
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setComponent(state, component) {
      state.component = component;
    },
  },
  actions: {
    resetState({
      commit,
      dispatch,
    }) {
      commit('setError', null);
      commit('setLoading', false);
      commit('setComponent', '');
      dispatch('editor/resetEditor', null, { root: true });
      dispatch('record/resetRecord', null, { root: true });
    },
  },
});
