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
        <v-card-title>
          <v-spacer />
          <v-icon
            @click="setEnabled(false)"
          >
            mdi-close
          </v-icon>
        </v-card-title>
        <v-card-text>
          <v-alert
            v-if="error"
            type="error"
            text
          >
            {{ message }}
          </v-alert>
          <v-text-field
            ref="name"
            v-model="name"
            :loading="loading"
            label="Name"
            autofocus
            autocomplete="off"
          />
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-btn
            :disabled="loading"
            text
            color="blue-grey"
            @click="$refs.form.reset()"
          >
            Clear
          </v-btn>
          <v-spacer />
          <v-btn
            :disabled="!valid || loading"
            text
            type="submit"
            color="blue-grey"
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

export default {
  data () {
    return {
      enabled: false,
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
      return !!this.name.trim();
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
    this.setEnabled(true);
    this.fill();
  },
  mounted() {
    setTimeout(() => {
      this.$refs.name.focus();
    }, 0);
  },
  methods: {
    ...mapMutations([
      'setDialog',
    ]),
    ...mapActions('record', [
      'storeRecord',
      'updateRecord',
    ]),
    setEnabled(enabled) {
      this.enabled = enabled;
    },
    setName(name) {
      this.name = name;
    },
    createRecord() {
      this.storeRecord(this.params)
        .then((data) => {
          this.setDialog('AppDialogShare');
          this.$router.push(`/e/${data.code}`);
        });
    },
    editRecord() {
      this.updateRecord(this.params)
        .then(() => {
          this.setDialog('');
        })
    },
    fill() {
      if (this.record) {
        this.setName(this.record.name);
      }
    },
    submit() {
      this.record ? this.editRecord() : this.createRecord();
    },
  },
};
</script>
