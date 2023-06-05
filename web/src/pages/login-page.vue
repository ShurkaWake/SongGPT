<script>
import axios from "axios";
import store from "@/store/index"
import router from "@/router/router";

export default {
  data: () => ({
    show: false,
    dialog: false,
    valid: false,
    loading: false,
    timeout: null,
    error: '',
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
      if (!this.valid) {
        this.loading = false;
        return;
      }
      const results = await this.requestApi()
      this.loading = false

      if (!results) {
        return
      }

      store.commit('setJwtToken', results.accessToken, results.user)
      await router.push("/")
    },

    async requestApi() {
      try {
        const response = await axios.post('https://song-gpt-nm46.onrender.com/login/', {
          email: this.email,
          password: this.password
        })
        return response.data
      } catch (e) {
        this.error = e.response.data.message
        this.dialog = true
        return false
      }
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
            v-model="valid"
            id="login-form"
            validate-on="input"
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

    <v-dialog
        v-model="dialog"
        width="auto">
      <v-card>
        <v-card-text>
          {{ error }}
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<style scoped>
#form-title {
  width: inherit;
  padding: 8px;
  text-align: center;
}
</style>