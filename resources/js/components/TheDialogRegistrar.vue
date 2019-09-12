<template>
  <component
    :is="dialog"
  />
</template>

<script>
import {
  mapState,
} from 'vuex';
import AppDialogShare from '@/components/AppDialogShare';

export default {
  components: {
    AppDialogShare,
  },
  computed: {
    ...mapState([
      'dialog',
    ]),
  },
};
</script>
