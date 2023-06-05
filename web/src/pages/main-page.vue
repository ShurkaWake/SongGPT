<script>
import router from "@/router/router";
import store from "@/store";

export default {
  mounted() {
    if (!store.state.isAuth) {
      router.push("/unauthorized")
    }
  }
}
</script>

<template>
  <v-app>
    <v-app-bar
        app
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>SongGPT</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </v-app>
</template>

<style scoped>

</style>