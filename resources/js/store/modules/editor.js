import axios from 'axios';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    error: '',
    codeEditor: null,
    treeEditor: null,
    code: '',
    data: {},
  },
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setCodeEditor(state, codeEditor) {
      state.codeEditor = codeEditor;
    },
    setTreeEditor(state, treeEditor) {
      state.treeEditor = treeEditor;
    },
    setCode(state, code) {
      state.code = code;
    },
    setData(state, data) {
      state.data = data;
    },
  },
  actions: {
    setData({
      commit,
    }, data) {
      commit('setData', typeof data === 'string' ? JSON.parse(data) : data);
    },
    fetchData({
      state,
      commit,
      dispatch,
    }, code) {
      code && axios.get(`/records/${code}`)
        .then(({ data }) => {
          dispatch('setData', JSON.stringify(data.data));
          state.codeEditor.set(data.data);
          state.treeEditor.set(data.data);
        })
        .catch((error) => {
          router.push('/');
          commit('setError', error, { root: true });
        });
    },
    storeData({
      commit,
    }, params) {
      axios.post(`/records`, params)
        .then(({ data }) => {
          console.log(data);
        })
        .catch((error) => {
          commit('setError', error, { root: true });
        });
    },
  },
};
