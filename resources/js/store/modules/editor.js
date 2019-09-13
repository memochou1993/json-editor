export default {
  namespaced: true,
  state: {
    error: '',
    codeEditor: null,
    treeEditor: null,
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
  },
};
