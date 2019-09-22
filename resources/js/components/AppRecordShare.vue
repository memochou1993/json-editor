<template>
  <v-dialog
    v-model="enabled"
    :max-width="400"
  >
    <v-card>
      <v-card-title
        class="pa-2"
      />
      <v-card-text
        class="px-5 py-0"
      >
        <v-text-field
          v-for="(link, index) in links"
          :id="link.id"
          :key="index"
          :label="link.label"
          :value="link.value"
          color="secondary"
          outlined
          readonly
          hide-details
          class="my-5"
          @focus="focus($event)"
        >
          <template
            v-slot:append
          >
            <v-icon
              :color="copied === link.id ? 'secondary' : 'secondary lighten-3'"
              @click="copy(link.id)"
            >
              mdi-content-copy
            </v-icon>
          </template>
        </v-text-field>
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
      copied: '',
    };
  },
  computed: {
    ...mapState('record', [
      'record',
    ]),
    links() {
      return [
        {
          id: 'edit',
          label: 'Edit',
          value: `${window.location.origin}/${this.record.code}`,
        },
        {
          id: 'response',
          label: 'Response',
          value: `${window.location.origin}/api/records/${this.record.code}`,
        },
        {
          id: 'download',
          label: 'Download',
          value: `${window.location.origin}/${this.record.code}/download`,
        },
      ];
    },
  },
  methods: {
    setCopied(copied) {
      this.copied = copied;
    },
    focus(event) {
      event.target.select();
      this.setCopied('');
    },
    copy(id) {
      document.execCommand('copy');
      this.setCopied(id);
    },
  },
};
</script>
