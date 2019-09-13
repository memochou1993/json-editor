<template>
  <v-dialog
    v-model="enabled"
    :max-width="400"
  >
    <v-card>
      <v-card-title />
      <v-card-text>
        <v-text-field
          :value="links.editor"
          label="Editor"
          outlined
          readonly
          hide-details
          append-icon="mdi-content-copy"
          class="my-3"
          @click:append="copy()"
          @focus="$event.target.select()"
        />
        <v-text-field
          :value="links.response"
          label="Response"
          outlined
          readonly
          hide-details
          append-icon="mdi-share-variant"
          class="my-3"
          @click:append="open()"
          @focus="$event.target.select()"
        />
        <v-text-field
          :value="links.file"
          label="File"
          outlined
          readonly
          hide-details
          append-icon="mdi-download"
          class="my-3"
          @click:append="download()"
          @focus="$event.target.select()"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mapState,
  mapMutations,
} from 'vuex';

export default {
  data () {
    return {
      enabled: false,
    };
  },
  computed: {
    ...mapState('record', [
      'record',
    ]),
    links() {
      return {
        editor: `${location.host}/e/${this.record.code}`,
        response: `${location.host}/r/${this.record.code}`,
        file: `${location.host}/f/${this.record.code}`,
      };
    },
  },
  watch: {
    enabled(value) {
      !value && this.setDialog('');
    },
  },
  created() {
    this.setEnabled(true);
  },
  methods: {
    ...mapMutations([
      'setDialog',
    ]),
    setEnabled(enabled) {
      this.enabled = enabled;
    },
    copy() {
      //
    },
    open() {
      //
    },
    download() {
      //
    },
  },
};
</script>
