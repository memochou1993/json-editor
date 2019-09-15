<template>
  <div />
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';

export default {
  computed: {
    ...mapState('editor', [
      'data',
    ]),
    params() {
      return {
        data: this.data,
      };
    },
  },
  created() {
    this.editRecord();
    this.setComponent('');
  },
  methods: {
    ...mapMutations([
      'setComponent',
    ]),
    ...mapActions('record', [
      'updateRecord',
    ]),
    editRecord() {
      this.updateRecord(this.params);
    },
  },
};
</script>
