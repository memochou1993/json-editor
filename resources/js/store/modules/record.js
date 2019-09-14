import axios from 'axios';
import Common from '@/helpers/Common';

export default {
  namespaced: true,
  state: {
    record: null,
  },
  mutations: {
    setRecord(state, record) {
      state.record = record;
    },
  },
  actions: {
    resetRecord({
      commit,
    }) {
      commit('setRecord', null);
    },
    fetchRecord({
      commit,
    }, code) {
      commit('setLoading', true, { root: true });
      return new Promise((resolve, reject) => {
        axios.get(`/records/${code}`)
          .then(async ({ data }) => {
            await Common.defer(0);
            commit('setRecord', data);
            resolve(data);
          })
          .catch((error) => {
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
            await Common.defer(0.25);
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
            await Common.defer(0.25);
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
    destroyRecord({
      state,
      commit,
    }) {
      commit('setLoading', true, { root: true });
      return new Promise((resolve, reject) => {
        axios.delete(`/records/${state.record.code}`)
          .then(async () => {
            await Common.defer(0.25);
            commit('setRecord', null);
            resolve();
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => {
            commit('setLoading', false, { root: true });
          });
      });
    },
  },
};
