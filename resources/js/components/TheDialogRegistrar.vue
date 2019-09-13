<template>
  <component
    :is="dialog"
  />
</template>

<script>
import {
  mapState,
} from 'vuex';
import AppDialogSave from '@/components/AppDialogSave';

export default {
  components: {
    AppDialogSave,
  },
  computed: {
    ...mapState([
      'dialog',
    ]),
  },
};
</script>
