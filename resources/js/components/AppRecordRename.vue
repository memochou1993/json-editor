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
          class="pa-5"
        >
          <v-text-field
            id="name"
            v-model="name"
            :readonly="loading"
            color="secondary"
            label="Name"
            outlined
            autofocus
            autocomplete="off"
            hide-details
            class="my-5"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            :disabled="!valid || loading"
            text
            color="secondary"
            small
            @click="$refs.form.reset()"
          >
            Clear
          </v-btn>
          <v-spacer />
          <v-btn
            :disabled="!valid || loading"
            text
            type="submit"
            color="secondary"
            small
          >
            Save
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
  data () {
    return {
      name: '',
    };
  },
  computed: {
    ...mapState([
      'loading',
    ]),
    ...mapState('record', [
      'record',
    ]),
    valid() {
      return this.name && this.name.trim();
    },
    params() {
      return {
        name: this.name,
      };
    },
  },
  created() {
    this.fill();
  },
  mounted() {
    setTimeout(() => {
      document.getElementById('name').focus();
    }, 0);
  },
  methods: {
    ...mapActions('record', [
      'updateRecord',
    ]),
    setName(name) {
      this.name = name;
    },
    fill() {
      this.setName(this.record.name);
    },
    submit() {
      this.renameRecord();
    },
    renameRecord() {
      this.updateRecord(this.params)
        .then(() => {
          this.setComponent('');
        });
    },
  },
};
</script>
