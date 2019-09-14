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
          class="default mx-2"
        >
          JSON Editor
        </span>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn
          :disabled="!Object.values(data).length || loading"
          icon
          @click="save()"
        >
          <v-icon>
            mdi-content-save
          </v-icon>
        </v-btn>
        <v-btn
          :disabled="!Object.values(data).length || loading"
          icon
          @click="destroy()"
        >
          <v-icon>
            mdi-trash-can-outline
          </v-icon>
        </v-btn>
        <v-btn
          :disabled="!record || loading"
          icon
          @click="share()"
        >
          <v-icon>
            mdi-share-variant
          </v-icon>
        </v-btn>
        <v-btn
          :disabled="!record || loading"
          icon
          @click="download()"
        >
          <v-icon>
            mdi-download
          </v-icon>
        </v-btn>
        <v-btn
          icon
          @click="list()"
        >
          <v-icon>
            mdi-file-document-box-outline
          </v-icon>
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
      'data',
    ]),
    ...mapState('record', [
      'record',
    ]),
  },
  methods: {
    ...mapMutations([
      'setDialog',
    ]),
    ...mapActions([
      'resetState',
    ]),
    ...mapActions('record', [
      'destroyRecord',
    ]),
    reset() {
      this.resetState();
      this.$route.path === '/' || this.$router.push('/');
    },
    save() {
      this.setDialog('AppDialogSave');
    },
    destroy() {
      this.record && this.destroyRecord();
      this.reset();
    },
    share() {
      this.setDialog('AppDialogShare');
    },
    download() {
      window.location.href = `/download/${this.record.code}`;
    },
    list() {
      //
    },
  },
};
</script>
