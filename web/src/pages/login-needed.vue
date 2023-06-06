<script setup>

</script>

<template>
  <v-app class="bg-surface-variant">
    <v-container style="height: 100vh;" class="d-flex align-center justify-center">
      <v-card
          class="mx-auto text-h5"
          max-width="400"
          title="You are not authorized"
          prepend-icon="mdi-account-alert">
        <v-card-text>
          <p class="font-weight-thin" id="card-text">
            Please sign in or create account if you doesn't have
          </p>
        </v-card-text>
        <v-card-actions>
          <v-container
              class="d-flex justify-end">
            <router-link to="/login">
              <v-btn
                  variant="text"
                  class="mr-6"
                  color="deep-purple-darken-1">
                Log In
              </v-btn>
            </router-link>
            <router-link to="/register">
              <v-btn
                  variant="text"
                  color="deep-purple-darken-1">
                Sign Up
              </v-btn>
            </router-link>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<style scoped>
#card-text {
  font-size: 15px;
}
</style>