<template>
  <div>
    <v-app-bar
      dark
      class="primary primary-gradient"
    >
      <v-toolbar-title
        class="headline"
      >
        <span
          class="pointer"
          @click="initialize()"
        >
          JSON Editor
        </span>
      </v-toolbar-title>
    </v-app-bar>
  </div>
</template>

<script>
import {
  mapState, mapActions,
} from 'vuex';

export default {
  computed: {
    ...mapState('editor', [
      'codeEditor',
      'treeEditor',
    ]),
  },
  methods: {
    ...mapActions('editor', [
      'setData',
    ]),
    initialize() {
      this.setData({});
      this.codeEditor.set({});
      this.treeEditor.set({});
    },
  },
};
</script>
