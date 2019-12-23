<template>
  <v-dialog
    v-model="enabled"
    :max-width="400"
  >
    <v-form
      ref="form"
      @submit.prevent="submit()"
    >
      <v-card>
        <v-card-title
          class="pa-3"
        >
          <v-spacer />
          <v-icon
            small
            @click="setEnabled(false)"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-divider />
        <v-card-text
          class="subtitle-1 pa-5"
        >
          Are you sure you want to delete this file?
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            :disabled="loading"
            text
            color="secondary"
            small
            @click="cancel()"
          >
            Cancel
          </v-btn>
          <v-spacer />
          <v-btn
            id="submit"
            :disabled="loading"
            text
            type="submit"
            color="secondary"
            small
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
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
  computed: {
    ...mapState([
      'loading',
    ]),
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('submit').focus();
    }, 0);
  },
  methods: {
    ...mapActions('editor', [
      'resetEditor',
    ]),
    ...mapActions('record', [
      'destroyRecord',
    ]),
    cancel() {
      this.setComponent('');
    },
    submit() {
      this.resetEditor();
      this.deleteRecord();
    },
    deleteRecord() {
      this.destroyRecord()
        .then(() => {
          this.setComponent('');
        })
        .finally(() => {
          this.$router.push('/');
        });
    },
  },
};
</script>
