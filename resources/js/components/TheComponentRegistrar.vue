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
import AppRecordDelete from '@/components/AppRecordDelete';
import AppRecordShare from '@/components/AppRecordShare';

export default {
  components: {
    AppRecordSave,
    AppRecordSaveAs,
    AppRecordRename,
    AppRecordDelete,
    AppRecordShare,
  },
  computed: {
    ...mapState([
      'component',
    ]),
  },
};
</script>
