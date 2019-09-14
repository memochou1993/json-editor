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
        class="px-5 py-0"
      >
        <v-text-field
          v-for="(link, index) in links"
          :id="link.id"
          :key="index"
          :label="link.label"
          :value="`${host}/${link.id}/${record.code}`"
          color="secondary"
          outlined
          readonly
          append-icon="mdi-content-copy"
          hide-details
          class="my-5"
          @focus="$event.target.select()"
          @click:append="copy(link.id)"
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
  data() {
    return {
      host: location.host,
      links: [
        {
          id: 'edit',
          label: 'Edit',
        },
        {
          id: 'response',
          label: 'Response',
        },
        {
          id: 'download',
          label: 'Download',
        },
      ]
    };
  },
  computed: {
    ...mapState('record', [
      'record',
    ]),
  },
  methods: {
    copy(id) {
      document.getElementById(id).focus();
      document.execCommand('copy');
    },
  },
};
</script>
