import axios from 'axios';
import Common from '@/helpers/Common';
import Storage from '@/helpers/Storage';

export default {
  namespaced: true,
  state: {
    records: Storage.get('records') || [],
    record: null,
  },
  mutations: {
    setRecords(state, records) {
      state.records = records;
    },
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
    setRecords({
      commit,
    }, records) {
      commit('setRecords', records);
      Storage.set('records', records);
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
            resolve(data);
          })
          .catch((error) => {
            dispatch('setRecords', state.records.filter(record => record.code !== code));
            commit('setError', error, { root: true });
            reject(error);
          })
          .finally(() => {
            commit('setLoading', false, { root: true });
          });
      });
    },
    storeRecord({
      state,
      commit,
      dispatch,
    }, params) {
      commit('setLoading', true, { root: true });
      return new Promise((resolve, reject) => {
        axios.post('/records', params)
          .then(async ({ data }) => {
            await Common.defer(0.25);
            dispatch('setRecords', [...state.records, data]);
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
      dispatch,
    }, params) {
      commit('setLoading', true, { root: true });
      return new Promise((resolve, reject) => {
        axios.put(`/records/${state.record.code}`, params)
          .then(async ({ data }) => {
            await Common.defer(0.25);
            dispatch('setRecords', state.records.find(record => record.code === data.code)
              ? state.records.map(record => record.code === data.code ? data : record)
              : [...state.records, data]);
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
      dispatch,
    }) {
      commit('setLoading', true, { root: true });
      return new Promise((resolve, reject) => {
        axios.delete(`/records/${state.record.code}`)
          .then(async () => {
            await Common.defer(0);
            dispatch('setRecords', state.records.filter(record => record.code !== state.record.code));
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
