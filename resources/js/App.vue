<template>
  <div>
    <v-app>
      <v-content>
        <v-container
          fluid
        >
          <v-flex>
            <router-view></router-view>
          </v-flex>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
