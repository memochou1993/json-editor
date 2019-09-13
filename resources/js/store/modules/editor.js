import axios from 'axios';
import router from '@/router';
import Common from '@/helpers/Common';

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
      return new Promise((resolve, reject) => {
        axios.get(`/records/${code}`)
          .then(({ data }) => {
            commit('setRecord', data);
            dispatch('setData', data.data);
            state.codeEditor.set(data.data);
            state.treeEditor.set(data.data);
            resolve(data);
          })
          .catch((error) => {
            router.push('/editor');
            commit('setError', error, { root: true });
            reject(error);
          })
          .finally(() => {
            commit('setLoading', false, { root: true });
          });
      });
    },
    storeData({
      commit,
      dispatch,
    }, params) {
      commit('setLoading', true, { root: true });
      return new Promise((resolve, reject) => {
        axios.post('/records', params)
          .then(async ({ data }) => {
            await Common.defer(1);
            await commit('setRecord', data);
            await dispatch('setData', data.data);
            await commit('setDialog', 'AppDialogShare', { root: true });
            await router.push(`/editor/${data.code}`);
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error, { root: true });
            reject(error);
          })
          .finally(() => {
            commit('setLoading', false, { root: true });
          });
      });
    },
    updateData({
      state,
      commit,
      dispatch,
    }, params) {
      commit('setLoading', true, { root: true });
      return new Promise((resolve, reject) => {
        axios.put(`/records/${state.record.code}`, params)
          .then(async ({ data }) => {
            await Common.defer(1);
            await commit('setRecord', data);
            await dispatch('setData', data.data);
            await commit('setDialog', '', { root: true });
            resolve(data);
          })
          .catch((error) => {
            commit('setError', error, { root: true });
            reject(error);
          })
          .finally(() => {
            commit('setLoading', false, { root: true });
          });
      });
    },
  },
};
