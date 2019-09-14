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
          class="pointer mx-2"
          @click="open()"
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
          :color="confirmed ? 'warning accent-2': ''"
          :disabled="!Object.values(data).length || loading"
          icon
          @click="deleteRecord()"
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
        <!--
        <v-btn
          icon
          @click="list()"
        >
          <v-icon>
            mdi-file-document-box-outline
          </v-icon>
        </v-btn>
        -->
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';
import dialog from '@/mixins/dialog';

export default {
  mixins: [
    dialog,
  ],
  data() {
    return {
      confirmed: false,
    };
  },
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
    ...mapActions('editor', [
      'resetEditor',
    ]),
    ...mapActions('record', [
      'destroyRecord',
    ]),
    setConfirmed(confirmed) {
      this.confirmed = confirmed;
    },
    deleteRecord() {
      if (!this.confirmed) {
        return this.confirm();
      }
      this.record && this.destroyRecord();
      return this.reset();
    },
    reset() {
      this.resetEditor();
      this.$route.path === '/' || this.$router.push('/');
    },
    open() {
      window.open('/', '_blank', 'noopener noreferrer');
    },
    save() {
      this.setDialog('AppDialogSave');
    },
    confirm() {
      this.setConfirmed(true);
      setTimeout(() => {
        this.setConfirmed(false);
      }, 2 * 1000);
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
