<template>
  <v-dialog
    v-model="enabled"
    :max-width="400"
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
        {{ links.editor }}
        {{ links.response }}
        {{ links.file }}
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
    ...mapState('editor', [
      'record',
    ]),
    links() {
      return {
        editor: `${location.host}/editor/${this.record.code}`,
        response: `${location.host}/response/${this.record.code}`,
        file: `${location.host}/file/${this.record.code}`,
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
  },
};
</script>
