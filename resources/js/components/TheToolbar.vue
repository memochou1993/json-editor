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
          :disabled="!Object.values(data).length || loading"
          text
          @click="save()"
        >
          Save
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
    ...mapState([
      'loading',
    ]),
    ...mapState('editor', [
      'codeEditor',
      'treeEditor',
      'code',
      'data',
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
      this.code && this.$router.push('/editor');
    },
    save() {
      this.setDialog('AppDialogSave');
    },
  },
};
</script>
