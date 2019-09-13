import Vue from 'vue';
import Vuex from 'vuex';
import editor from '@/store/modules/editor';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    editor,
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
});
