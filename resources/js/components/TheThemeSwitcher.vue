<template>
  <v-avatar
    :size="20"
    class="pointer"
    @click="toggle()"
  >
    <img
      src="@/images/moon.png"
    >
  </v-avatar>
</template>

<script>
import Storage from '@/helpers/Storage';

export default {
  data() {
    return {
      darkMode: Storage.get('dark-mode') || false,
    };
  },
  created() {
    if (this.darkMode) {
      document.body.classList.add('dark-mode');
    }
  },
  methods: {
    setDarkMode(darkMode) {
      this.darkMode = darkMode;
      Storage.set('dark-mode', darkMode);
    },
    toggle() {
      document.body.classList.toggle('dark-mode');
      this.setDarkMode(!this.darkMode);
    },
  },
};
</script>
