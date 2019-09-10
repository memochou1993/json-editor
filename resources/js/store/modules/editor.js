import axios from 'axios';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    codeEditor: null,
    treeEditor: null,
    data: {},
    error: '',
  },
  mutations: {
    setCodeEditor(state, codeEditor) {
      state.codeEditor = codeEditor;
    },
    setTreeEditor(state, treeEditor) {
      state.treeEditor = treeEditor;
    },
    setData(state, data) {
      state.data = data;
    },
    setError(state, error) {
      state.error = error;
    },
  },
  actions: {
    setData({
      commit,
    }, data) {
      commit('setData', typeof data === 'string' ? JSON.parse(data) : data);
    },
    setError({
      commit,
    }, error) {
      commit('setError', typeof error === 'string' ? error : error.toString());
    },
    fetchData({
      state,
      dispatch,
    }, code) {
      code && axios.get(`/records/${code}`)
        .then(({ data }) => {
          dispatch('setData', JSON.stringify(data.data));
          state.codeEditor.set(data.data);
          state.treeEditor.set(data.data);
        })
        .catch((error) => {
          dispatch('setError', error.message) && router.push('/');
        });
    }
  },
};
