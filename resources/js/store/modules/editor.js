import axios from 'axios';
import router from '@/router';

export default {
  namespaced: true,
  state: {
    error: '',
    codeEditor: null,
    treeEditor: null,
    record: null,
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
    setRecord(state, record) {
      state.record = record;
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
      commit('setLoading', true, { root: true });
      axios.get(`/records/${code}`)
        .then(({ data }) => {
          commit('setRecord', data);
          dispatch('setData', data.data);
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
      dispatch,
    }, params) {
      commit('setLoading', true, { root: true });
      axios.post('/records', params)
        .then(({ data }) => {
          setTimeout(() => {
            router.push(`/editor/${data.code}`);
            commit('setRecord', data);
            dispatch('setData', data.data);
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
    updateData({
      state,
      commit,
      dispatch,
    }, params) {
      commit('setLoading', true, { root: true });
      axios.put(`/records/${state.record.code}`, params)
        .then(({ data }) => {
          setTimeout(() => {
            commit('setRecord', data);
            dispatch('setData', data.data);
            commit('setDialog', '', { root: true });
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
