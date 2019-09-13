import Vue from 'vue';
import Vuex from 'vuex';
import record from '@/store/modules/record';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
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
});
