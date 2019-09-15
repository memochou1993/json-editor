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
import AppRecordShare from '@/components/AppRecordShare';
import AppRecordDelete from '@/components/AppRecordDelete';
import AppRecordRename from '@/components/AppRecordRename';
import AppRecordSaveAs from '@/components/AppRecordSaveAs';
import AppRecordOpenRecent from '@/components/AppRecordOpenRecent';

export default {
  components: {
    AppRecordSave,
    AppRecordShare,
    AppRecordDelete,
    AppRecordRename,
    AppRecordSaveAs,
    AppRecordOpenRecent,
  },
  computed: {
    ...mapState([
      'component',
    ]),
  },
};
</script>
