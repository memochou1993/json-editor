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
        <v-btn
          :disabled="!record || loading"
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
    ...mapState([
      'loading',
    ]),
    ...mapState('editor', [
      'codeEditor',
      'treeEditor',
      'record',
      'data',
    ]),
  },
  methods: {
    ...mapMutations([
      'setDialog',
    ]),
    ...mapMutations('editor', [
      'setRecord',
    ]),
    ...mapActions('editor', [
      'setData',
    ]),
    initialize() {
      this.record && this.$router.push('/editor');
      this.setRecord(null);
      this.setData({});
      this.codeEditor.set({});
      this.treeEditor.set({});
    },
    save() {
      this.setDialog('AppDialogSave');
    },
    share() {
      this.setDialog('AppDialogShare');
    },
  },
};
</script>
