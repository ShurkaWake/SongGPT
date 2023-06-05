<script>
import axios from "axios";

export default {
  data: () => ({
    show: false,
    valid: false,
    loading: false,
    timeout: null,
    email: '',
    emailRules: [
      value => {
        if (value) return true

        return 'E-mail is requred.'
      },
      value => {
        if (/.+@.+\..+/.test(value)) return true

        return 'E-mail must be valid.'
      },
    ],
    password: '',
    passwordRules: [
      value => {
        if (value) return true

        return 'Password is required.'
      },
      value => {
        if (value?.length > 6) return true

        return 'Password must be at least 10 characters.'
      },
    ]
  }),
  methods: {
    async submit() {
      this.loading = true
      const results = await this.requestApi()
      this.loading = false
      console.log(results)
    },

    async requestApi() {
      const response = await axios.post('https://song-gpt-nm46.onrender.com/login/', {
        email: this.email,
        password: this.password
      })
      console.log(response)
    }
  }
}
</script>

<template>
  <v-app class="bg-surface-variant">
    <v-container style="height: 100vh;" class="d-flex align-center justify-center">
      <v-card class="pa-4" width="400">
        <v-form
            fast-fail
            id="login-form"
            validate-on="submit"
            @submit.prevent
        >
          <h1 id="form-title">Log In</h1>
          <v-text-field
              v-model="email"
              :rules="emailRules"
              color="teal-darken-3"
              label="Email"
              required>
          </v-text-field>
          <v-text-field
              v-model="password"
              color="teal-darken-3"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show ? 'text' : 'password'"
              label="Password"
              @click:append="show = !show">
          </v-text-field>
          <v-btn
              :loading="loading"
              @click="submit"
              type="submit"
              text="Log In">
          </v-btn>
        </v-form>
      </v-card>

    </v-container>
  </v-app>
</template>

<style scoped>
#form-title {
  width: inherit;
  padding: 8px;
  text-align: center;
}
</style>