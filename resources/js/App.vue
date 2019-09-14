<template>
  <v-app>
    <TheToolbar />
    <v-content>
      <v-container
        fill-height
      >
        <router-view />
      </v-container>
    </v-content>
    <TheFooter />
    <TheDialogRegistrar />
  </v-app>
</template>

<script>
import TheToolbar from '@/components/TheToolbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheDialogRegistrar from '@/components/TheDialogRegistrar';

export default {
  name: 'App',
  components: {
    TheToolbar,
    TheFooter,
    TheDialogRegistrar,
  },
};
</script>

<style lang="scss">
.pointer {
  cursor: pointer;
}
.primary-gradient {
  background-image: -webkit-linear-gradient(right, #061D30, #2C4C68);
  background-image: -moz-linear-gradient(right, #061D30, #2C4C68);
  background-image: -o-linear-gradient(right, #061D30, #2C4C68);
  background-image: linear-gradient(to right, #061D30, #2C4C68);
}
.fade-enter {
  opacity: 0.5;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
</style>
