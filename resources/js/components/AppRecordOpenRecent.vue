<template>
  <v-dialog
    v-model="enabled"
    :max-width="400"
  >
    <v-card>
      <v-card-title
        class="pa-2"
      />
      <v-card-text
        class="px-5 py-0"
      >
        To do
      </v-card-text>
      <v-card-actions />
    </v-card>
  </v-dialog>
</template>

<script>
import dialog from '@/mixins/dialog';

export default {
  mixins: [
    dialog,
  ],
  data() {
    return {
      //
    };
  },
};
</script>
