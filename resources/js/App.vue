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
    <AppSnackbar />
    <TheComponentRegistrar />
  </v-app>
</template>

<script>
import TheToolbar from '@/components/TheToolbar.vue';
import AppSnackbar from '@/components/AppSnackbar.vue';
import TheFooter from '@/components/TheFooter.vue';
import TheComponentRegistrar from '@/components/TheComponentRegistrar';

export default {
  name: 'App',
  components: {
    TheToolbar,
    AppSnackbar,
    TheFooter,
    TheComponentRegistrar,
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
