<template>
  <v-app>
    <TheToolbar />
    <v-content>
      <v-container
        fluid
        fill-height
      >
        <v-flex>
          <router-view />
        </v-flex>
      </v-container>
    </v-content>
    <TheFooter />
  </v-app>
</template>

<script>
import TheToolbar from '@/components/TheToolbar.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
  name: 'App',
  components: {
    TheToolbar,
    TheFooter,
  },
};
</script>

<style lang="scss">
//
</style>
