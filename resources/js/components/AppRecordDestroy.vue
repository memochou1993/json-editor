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
      this.$route.path === '/' || this.$router.push('/');
    },
  },
};
</script>
