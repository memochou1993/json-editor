<template>
  <div />
</template>

<script>
import {
  mapMutations,
  mapActions,
} from 'vuex';

export default {
  created() {
    this.deleteRecord();
  },
  mounted() {
    this.setComponent('');
  },
  methods: {
    ...mapMutations([
      'setComponent',
    ]),
    ...mapActions('editor', [
      'resetEditor',
    ]),
    ...mapActions('record', [
      'destroyRecord',
    ]),
    deleteRecord() {
      this.resetEditor();
      this.destroyRecord();
      this.$router.push('/');
    },
  },
};
</script>
