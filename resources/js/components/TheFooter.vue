<template>
  <v-footer
    padless
  >
    <v-card
      tile
      width="100%"
      class="primary primary-gradient text-center"
    >
      <v-card-text
        class="white--text py-3"
      >
        <span
          class="pointer"
          @click="explore()"
        >
          Designed by Memo Chou
        </span>
        <span
          class="float-right"
        >
          <TheThemeSwitcher />
        </span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
import TheThemeSwitcher from '@/components/TheThemeSwitcher';

export default {
  components: {
    TheThemeSwitcher,
  },
  methods: {
    explore() {
      window.open('https://github.com/memochou1993/json-editor', '_blank', 'noopener noreferrer');
    },
  },
};
</script>
