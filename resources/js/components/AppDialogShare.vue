<template>
  <v-dialog
    v-model="enabled"
    :max-width="400"
  >
    <v-card>
      <v-card-title
        class="pa-3"
      />
      <v-card-text
        class="pa-5"
      >
        <v-text-field
          ref="edit"
          :value="`${link}/edit/${record.code}`"
          color="secondary"
          label="Edit"
          outlined
          readonly
          append-icon="mdi-content-copy"
          hide-details
          class="my-5"
          @focus="$event.target.select()"
          @click:append="copy('edit')"
        />
        <v-text-field
          ref="response"
          :value="`${link}/response/${record.code}`"
          color="secondary"
          label="Response"
          outlined
          readonly
          append-icon="mdi-content-copy"
          hide-details
          class="my-5"
          @focus="$event.target.select()"
          @click:append="copy('response')"
        />
        <v-text-field
          ref="download"
          :value="`${link}/download/${record.code}`"
          color="secondary"
          label="Download"
          outlined
          readonly
          append-icon="mdi-content-copy"
          hide-details
          class="my-5"
          @focus="$event.target.select()"
          @click:append="copy('download')"
        />
      </v-card-text>
      <v-card-actions />
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
    link() {
      return location.host;
    },
  },
  methods: {
    copy(type) {
      this.$refs[type].focus();
      document.execCommand('copy');
    },
  },
};
</script>
