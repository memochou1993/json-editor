<template>
  <v-dialog
    v-model="enabled"
    :max-width="400"
  >
    <v-card>
      <v-card-title />
      <v-card-text>
        <v-text-field
          ref="edit"
          :value="links.edit"
          color="secondary"
          label="Edit"
          outlined
          readonly
          append-icon="mdi-content-copy"
          hide-details
          class="my-3"
          @focus="$event.target.select()"
          @click:append="copy($refs.edit)"
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
          ref="download"
          :value="links.download"
          color="secondary"
          label="Download"
          outlined
          readonly
          append-icon="mdi-content-copy"
          hide-details
          class="my-3"
          @focus="$event.target.select()"
          @click:append="copy($refs.download)"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mapState,
} from 'vuex';
import dialog from '@/mixins/dialog';

export default {
  mixins: [
    dialog,
  ],
  computed: {
    ...mapState('record', [
      'record',
    ]),
    links() {
      return {
        edit: `${location.host}/edit/${this.record.code}`,
        response: `${location.host}/response/${this.record.code}`,
        download: `${location.host}/download/${this.record.code}`,
      };
    },
  },
  watch: {
    enabled(value) {
      !value && this.setDialog('');
    },
  },
  methods: {
    copy(element) {
      element.focus();
      document.execCommand('copy');
    },
  },
};
</script>
