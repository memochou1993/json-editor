import axios from 'axios';
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
    fetchRecord({
      state,
      commit,
      dispatch,
    }, code) {
      commit('setLoading', true, { root: true });
      return new Promise((resolve, reject) => {
        axios.get(`/records/${code}`)
          .then(async ({ data }) => {
            await Common.defer(0);
            commit('setRecord', data);
            dispatch('setData', data.data);
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
    storeRecord({
      commit,
    }, params) {
      commit('setLoading', true, { root: true });
      return new Promise((resolve, reject) => {
        axios.post('/records', params)
          .then(async ({ data }) => {
            await Common.defer(1);
            commit('setRecord', data);
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
    updateRecord({
      state,
      commit,
    }, params) {
      commit('setLoading', true, { root: true });
      return new Promise((resolve, reject) => {
        axios.put(`/records/${state.record.code}`, params)
          .then(async ({ data }) => {
            await Common.defer(1);
            commit('setRecord', data);
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
