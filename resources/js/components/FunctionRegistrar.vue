<template>
  <component
    :is="component"
  />
</template>

<script>
import {
  mapState,
} from 'vuex';
import RecordSave from '@/components/RecordSave';
import RecordShare from '@/components/RecordShare';
import RecordDelete from '@/components/RecordDelete';
import RecordRename from '@/components/RecordRename';
import RecordSaveAs from '@/components/RecordSaveAs';
import RecordOpenRecent from '@/components/RecordOpenRecent';

export default {
  components: {
    RecordSave,
    RecordShare,
    RecordDelete,
    RecordRename,
    RecordSaveAs,
    RecordOpenRecent,
  },
  computed: {
    ...mapState([
      'component',
    ]),
  },
};
</script>
