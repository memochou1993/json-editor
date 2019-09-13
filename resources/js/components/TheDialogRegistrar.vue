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
import AppDialogShare from '@/components/AppDialogShare';

export default {
  components: {
    AppDialogSave,
    AppDialogShare,
  },
  computed: {
    ...mapState([
      'dialog',
    ]),
  },
};
</script>
