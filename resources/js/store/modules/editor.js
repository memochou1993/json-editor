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
      code && commit('setLoading', true, { root: true });
      code && axios.get(`/records/${code}`)
        .then(({ data }) => {
          dispatch('setData', JSON.stringify(data.data));
          state.codeEditor.set(data.data);
          state.treeEditor.set(data.data);
        })
        .catch((error) => {
          router.push('/editor');
          commit('setError', error, { root: true });
        })
        .finally(() => {
          setTimeout(() => {
            commit('setLoading', false, { root: true });
          }, 0 * 1000);
        });
    },
    storeData({
      commit,
    }, params) {
      commit('setLoading', true, { root: true });
      axios.post(`/records`, params)
        .then(({ data }) => {
          setTimeout(() => {
            router.push(`/editor/${data.code}`);
            commit('setDialog', 'AppDialogShare', { root: true });
          }, 1 * 1000);
        })
        .catch((error) => {
          commit('setError', error, { root: true });
        })
        .finally(() => {
          setTimeout(() => {
            commit('setLoading', false, { root: true });
          }, 1 * 1000);
        });
    },
  },
};
