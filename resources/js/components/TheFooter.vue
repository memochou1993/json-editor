<template>
  <v-footer
    padless
  >
    <v-card
      width="100%"
      class="primary primary-gradient text-center"
    >
      <v-card-text
        class="white--text"
      >
        <span
          class="pointer"
          @click="explore()"
        >
          &copy; 2019 Memo Chou
        </span>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  methods: {
    explore() {
      window.open('https://github.com/memochou1993/json-vue', '_blank');
    },
  },
};
</script>
