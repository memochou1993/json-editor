<template>
  <component
    :is="component"
  />
</template>

<script>
import {
  mapState,
} from 'vuex';
import AppRecordSave from '@/components/AppRecordSave';
import AppRecordSaveAs from '@/components/AppRecordSaveAs';
import AppRecordRename from '@/components/AppRecordRename';
import AppRecordDestroy from '@/components/AppRecordDestroy';
import AppRecordShare from '@/components/AppRecordShare';

export default {
  components: {
    AppRecordSave,
    AppRecordSaveAs,
    AppRecordRename,
    AppRecordDestroy,
    AppRecordShare,
  },
  computed: {
    ...mapState([
      'component',
    ]),
  },
};
</script>
