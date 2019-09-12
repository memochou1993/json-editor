<template>
  <div>
    <v-toolbar
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
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          text
          @click="share()"
        >
          Share
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';

export default {
  computed: {
    ...mapState('editor', [
      'codeEditor',
      'treeEditor',
    ]),
  },
  methods: {
    ...mapMutations([
      'setDialog',
    ]),
    ...mapActions('editor', [
      'setData',
    ]),
    initialize() {
      this.setData({});
      this.codeEditor.set({});
      this.treeEditor.set({});
      this.$router.push('/');
    },
    share() {
      this.setDialog('AppDialogShare');
    },
  },
};
</script>
