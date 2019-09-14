<template>
  <v-layout
    row
    wrap
    align-center
    justify-center
  >
    <v-flex
      md6
      xs12
      class="px-5 py-3"
    >
      <transition
        name="fade"
      >
        <div
          v-show="codeEditor && loaded"
          ref="code"
        />
      </transition>
    </v-flex>
    <v-flex
      md6
      xs12
      class="px-5 py-3"
    >
      <transition
        name="fade"
      >
        <div
          v-show="treeEditor && loaded"
          ref="tree"
        />
      </transition>
    </v-flex>
  </v-layout>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';
import JsonEditor from 'jsoneditor';
import VanillaPicker from 'jsoneditor/src/js/vanilla-picker';
import Storage from '@/helpers/Storage';

export default {
  data() {
    return {
      initialData: Storage.get('data') || {
        array: [
          1,
          2,
          3,
        ],
        boolean: true,
        color: '#82b92c',
        null: null,
        number: 123,
        object: {
          a: 'b',
          c: 'd',
          e: 'f',
        },
        string: 'Hello World',
      },
      loaded: false,
    };
  },
  computed: {
    ...mapState('editor', [
      'error',
      'codeEditor',
      'treeEditor',
      'data',
    ]),
    code() {
      return this.$route.params.code;
    },
  },
  watch: {
    data(value) {
      Storage.set('data', value);
      this.error && this.setError('');
    },
  },
  created() {
    this.code ? this.getRecord() : this.initData();
  },
  mounted() {
    this.initCodeEditor();
    this.initTreeEditor();
  },
  methods: {
    ...mapMutations('editor', [
      'setError',
      'setCodeEditor',
      'setTreeEditor',
    ]),
    ...mapActions('editor', [
      'setData',
    ]),
    ...mapActions('record', [
      'fetchRecord',
    ]),
    setLoaded(loaded) {
      this.loaded = loaded;
    },
    initCodeEditor() {
      const codeEditor = this.initEditor(this.$refs.code, 'code');
      this.setCodeEditor(codeEditor);
      this.codeEditor.set(this.data);
      this.codeEditor.focus();
    },
    initTreeEditor() {
      const treeEditor = this.initEditor(this.$refs.tree, 'tree');
      this.setTreeEditor(treeEditor);
      this.treeEditor.set(this.data);
      this.treeEditor.expandAll();
    },
    initEditor(container, mode) {
      return new JsonEditor(container, {
        mode,
        onChangeText: (data) => {
          try {
            this.setData(data);
            mode === 'code' && this.treeEditor.update(this.data);
            mode === 'tree' && this.codeEditor.update(this.data);
          } catch (error) {
            this.setError(error.toString());
          }
        },
        onColorPicker: (parent, color, onChange) => {
          new VanillaPicker({
            parent,
            color,
            onChange: (selectedColor) => {
              const hex = selectedColor.rgba[3] === 1
                ? selectedColor.hex.substr(0, 7)
                : selectedColor.hex;
              onChange(hex);
            },
          }).show();
        },
        onError: (error) => {
          this.setError(error.toString());
        },
      });
    },
    initData() {
      this.setData(this.initialData);
      this.setLoaded(true);
    },
    getRecord() {
      this.fetchRecord(this.code)
        .then((data) => {
          this.setData(data.data);
          this.codeEditor.set(data.data);
          this.treeEditor.set(data.data);
        })
        .catch(() => {
          this.$router.push('/');
        })
        .finally(() => {
          this.setLoaded(true);
        });
    },
  },
};
</script>
