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
    dialog: '',
    loading: false,
  },
  mutations: {
    setDialog(state, dialog) {
      state.dialog = dialog;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
});
