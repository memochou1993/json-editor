<template>
  <v-snackbar
    v-model="enabled"
    :timeout="3000"
    top
    color="secondary lighten-2 subtitle-1"
  >
    {{ message }}
    <v-btn
      icon
      @click="setEnabled(false)"
    >
      <v-icon
        small
      >
        mdi-close
      </v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import {
  mapState,
} from 'vuex';

export default {
  data() {
    return {
      enabled: false,
    };
  },
  computed: {
    ...mapState([
      'error',
    ]),
    message() {
      if (!this.error) {
        return '';
      }
      if (this.error.response && this.error.response.status === 404) {
        return this.error.response.statusText;
      }
      return this.error.message;
    },
  },
  watch: {
    error(value) {
      value && this.setEnabled(true);
    },
  },
  methods: {
    setEnabled(enabled) {
      this.enabled = enabled;
    },
  },
};
</script>
