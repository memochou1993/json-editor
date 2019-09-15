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
          @click="reload()"
        >
          JSON Editor
        </span>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-menu
          offset-y
        >
          <template
            v-slot:activator="{ on }"
          >
            <v-btn
              text
              v-on="on"
            >
              File
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              @click="newFile()"
            >
              <v-list-item-title>
                New File
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              @click="newWindow()"
            >
              <v-list-item-title>
                New Window
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              :disabled="!valid"
              @click="record ? save() : saveAs()"
            >
              <v-list-item-title>
                Save
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              :disabled="!record || !valid"
              @click="saveAs()"
            >
              <v-list-item-title>
                Save As...
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              :disabled="!record || !valid"
              @click="rename()"
            >
              <v-list-item-title>
                Rename
              </v-list-item-title>
            </v-list-item>
            <v-list-item
              :disabled="!record || !valid"
              @click="destroy()"
            >
              <v-list-item-title>
                Delete
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-toolbar-items>
      <v-toolbar-items>
        <v-btn
          :disabled="!record"
          text
          @click="download()"
        >
          Download
        </v-btn>
        <v-btn
          :disabled="!record"
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
import Storage from '@/helpers/Storage';

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
    valid() {
      return Object.values(this.data).length;
    },
  },
  methods: {
    ...mapMutations([
      'setComponent',
    ]),
    ...mapActions([
      'resetState',
      'setSettings',
    ]),
    reload() {
      this.$router.go(0);
    },
    newFile() {
      this.resetState();
      this.$route.path === '/' || this.$router.push('/');
    },
    newWindow() {
      this.setSettings({ ...Storage.get('settings'), ...{ initialized: false } });
      window.open('/', '_blank', 'noopener noreferrer');
    },
    save() {
      this.setComponent('AppRecordSave');
    },
    saveAs() {
      this.setComponent('AppRecordSaveAs');
    },
    rename() {
      this.setComponent('AppRecordRename');
    },
    destroy() {
      this.setComponent('AppRecordDestroy');
    },
    share() {
      this.setComponent('AppRecordShare');
    },
    download() {
      window.location.href = `/download/${this.record.code}`;
    },
  },
};
</script>
