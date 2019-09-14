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
        <v-card-title />
        <v-card-text>
          <v-alert
            v-if="error"
            text
            type="error"
            outlined
          >
            {{ message }}
          </v-alert>
          <v-text-field
            ref="name"
            v-model="name"
            :readonly="loading"
            color="secondary"
            label="Name"
            outlined
            autofocus
            autocomplete="off"
            hide-details
            class="my-3"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            :disabled="!valid || loading"
            text
            color="secondary"
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
  mapMutations,
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
      'error',
      'loading',
    ]),
    ...mapState('editor', [
      'data',
    ]),
    ...mapState('record', [
      'record',
    ]),
    valid() {
      return this.name && this.name.trim();
    },
    message() {
      if (!this.error) {
        return '';
      }
      if (this.error.response) {
        return this.error.response.data.message;
      }
      return this.error.message;
    },
    params() {
      return {
        name: this.name,
        data: this.data,
      };
    },
  },
  watch: {
    enabled(value) {
      !value && this.setDialog('');
    },
  },
  created() {
    this.fill();
  },
  mounted() {
    setTimeout(() => {
      this.$refs.name.focus();
    }, 0);
  },
  methods: {
    ...mapActions('record', [
      'storeRecord',
      'updateRecord',
    ]),
    setName(name) {
      this.name = name;
    },
    fill() {
      if (this.record) {
        this.setName(this.record.name);
      }
    },
    submit() {
      this.record ? this.editRecord() : this.createRecord();
    },
    createRecord() {
      this.storeRecord(this.params)
        .then((data) => {
          this.setDialog('');
          this.$router.push(`/${data.code}`);
        });
    },
    editRecord() {
      this.updateRecord(this.params)
        .then(() => {
          this.setDialog('');
        })
    },
  },
};
</script>
