<script>
import router from "@/router/router";
import store from "@/store";

export default {
  data: () => ({
    drawer: false,
    fullName: ''
  }),

  methods: {
    getFullName(){
      if(!store.state.user){
        return ''
      }
      return store.state.user.fullName
    }
  },
  beforeCreate() {
    if (!store.state.isAuth) {
      router.push("/unauthorized")
      return
    }
    this.fullName = store.state.user.fullName
  },
}
</script>

<template>
  <v-app>
    <v-layout height="100%" width="100%">
      <v-app-bar
          app
          class="bg-deep-purple-darken-1"
      >
        <v-app-bar-nav-icon @click.stop="drawer = !drawer">
        </v-app-bar-nav-icon>

        <router-link
          class="text-decoration-none text-white"
          to="/">
          <v-toolbar-title>SongGPT</v-toolbar-title>
        </router-link>
        <v-spacer></v-spacer>
        <router-link to="/login/">
          <v-btn
          color="white"
          @click="$store.commit('logOut')" icon>
            <v-icon>mdi-logout</v-icon>
          </v-btn>
        </router-link>
      </v-app-bar>
      <v-navigation-drawer
          width="400"
          v-model="drawer"
          location="start"
          temporary
      >
        <v-container
            class="d-flex flex-column">
          <v-card
            prepend-icon="mdi-account"
            class="pa-2"
            v-bind:title='getFullName()'>
            <v-card-subtitle v-if="$store.state.isAuth">{{$store.state.user.email}}</v-card-subtitle>
          </v-card>
          <router-link to="/song/create">
            <v-btn
                class="mt-4 justify-start"
                width="100%"
                prepend-icon="mdi-playlist-plus"
                text="Create new song"
                variant="text"
                color="deep-purple-darken-1"></v-btn>
          </router-link>
          <router-link to="/">
            <v-btn
                prepend-icon="mdi-music-note"
                class="mt-4 mb-4 justify-start"
                width="100%"
                text="See my songs"
                variant="text"
                color="deep-purple-darken-1"></v-btn>
          </router-link>
          <v-divider></v-divider>
          <router-link to="/login/">
            <v-btn
                prepend-icon="mdi-logout"
                class="mt-4 mb-4 justify-start"
                width="100%"
                text="log out"
                variant="text"
                color="deep-purple-darken-1"
                @click="$store.commit('logOut')"></v-btn>
          </router-link>
        </v-container>
      </v-navigation-drawer>
      <v-container class="d-flex flex-column align-center justify-space-between">
        <v-main>
          <router-view>
          </router-view>
        </v-main>
      </v-container>
    </v-layout>
  </v-app>
</template>

<style scoped>
</style>