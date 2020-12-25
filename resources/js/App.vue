<template>
  <v-app>
    <TheToolbar />
    <FunctionRegistrar />
    <v-main>
      <v-container
        fill-height
      >
        <router-view />
      </v-container>
    </v-main>
    <TheFooter />
    <TheSnackbar />
  </v-app>
</template>

<script>
import FunctionRegistrar from '@/components/FunctionRegistrar';
import TheFooter from '@/components/TheFooter.vue';
import TheToolbar from '@/components/TheToolbar.vue';
import TheSnackbar from '@/components/TheSnackbar.vue';

export default {
  name: 'App',
  components: {
    FunctionRegistrar,
    TheFooter,
    TheToolbar,
    TheSnackbar,
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
