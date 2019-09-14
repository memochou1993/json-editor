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
    dialog: '',
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
    setDialog(state, dialog) {
      state.dialog = dialog;
    },
  },
  actions: {
    resetState({
      commit,
      dispatch,
    }) {
      commit('setError', null);
      commit('setLoading', false);
      commit('setDialog', '');
      dispatch('editor/resetEditor', null, { root: true });
      dispatch('record/resetRecord', null, { root: true });
    },
  },
});
