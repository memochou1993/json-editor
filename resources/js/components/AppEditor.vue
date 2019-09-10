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
      class="pa-3"
    >
      <div
        ref="code"
      />
    </v-flex>
    <v-flex
      md6
      xs12
      class="pa-3"
    >
      <div
        ref="tree"
      />
    </v-flex>
  </v-layout>
</template>

<script>
import {
  mapState, mapMutations, mapActions,
} from 'vuex';
import JsonEditor from 'jsoneditor';
import VanillaPicker from 'jsoneditor/src/js/vanilla-picker';
import Cache from '@/helpers/Cache';

export default {
  data() {
    return {
      initialData: {
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
    };
  },
  computed: {
    ...mapState('editor', [
      'codeEditor',
      'treeEditor',
      'data',
      'error',
    ]),
    code() {
      return this.$route.params.code;
    },
  },
  watch: {
    data(value) {
      Cache.set('data', value);
      this.error && this.setError('');
    },
  },
  created() {
    !this.code && this.setData(Cache.get('data') || JSON.stringify(this.initialData));
  },
  mounted() {
    this.initCodeEditor();
    this.initTreeEditor();
    this.fetchData(this.code);
  },
  methods: {
    ...mapMutations('editor', [
      'setCodeEditor',
      'setTreeEditor',
    ]),
    ...mapActions('editor', [
      'setData',
      'setError',
      'fetchData',
    ]),
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
            this.setError(error);
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
          this.setError(error);
        },
      });
    },
  },
};
</script>
