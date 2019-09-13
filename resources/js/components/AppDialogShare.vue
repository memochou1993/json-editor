<template>
  <v-dialog
    v-model="enabled"
    :max-width="400"
  >
    <v-card>
      <v-card-title />
      <v-card-text>
        <v-text-field
          ref="editor"
          :value="links.editor"
          color="secondary"
          label="Editor"
          outlined
          readonly
          append-icon="mdi-content-copy"
          hide-details
          class="my-3"
          @focus="$event.target.select()"
          @click:append="copy($refs.editor)"
        />
        <v-text-field
          ref="response"
          :value="links.response"
          color="secondary"
          label="Response"
          outlined
          readonly
          append-icon="mdi-content-copy"
          hide-details
          class="my-3"
          @focus="$event.target.select()"
          @click:append="copy($refs.response)"
        />
        <v-text-field
          ref="file"
          :value="links.file"
          color="secondary"
          label="File"
          outlined
          readonly
          append-icon="mdi-content-copy"
          hide-details
          class="my-3"
          @focus="$event.target.select()"
          @click:append="copy($refs.file)"
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
    copy(element) {
      element.focus();
      document.execCommand('copy');
    },
  },
};
</script>
