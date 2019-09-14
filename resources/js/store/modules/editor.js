export default {
  namespaced: true,
  state: {
    codeEditor: null,
    treeEditor: null,
    error: '',
    data: {},
  },
  mutations: {
    setCodeEditor(state, codeEditor) {
      state.codeEditor = codeEditor;
    },
    setTreeEditor(state, treeEditor) {
      state.treeEditor = treeEditor;
    },
    setError(state, error) {
      state.error = error;
    },
    setData(state, data) {
      state.data = data;
    },
  },
  actions: {
    resetEditor({
      state,
      commit,
    }) {
      state.codeEditor.set({});
      state.treeEditor.set({});
      commit('setError', '');
      commit('setData', {});
    },
    setData({
      commit,
    }, data) {
      commit('setData', typeof data === 'string' ? JSON.parse(data) : data);
    },
  },
};
