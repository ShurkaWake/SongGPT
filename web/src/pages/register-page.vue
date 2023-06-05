<script>
import axios from "axios";
import router from "@/router/router";

export default {
  data: () => ({
    show1: false,
    show2: false,
    dialog: false,
    valid: false,
    loading: false,
    timeout: null,
    error: '',
    isError: false,
    fullName: '',
    fullNameRules: [
      value => {
        if (value) return true

        return 'Full name is required.'
      },
    ],
    email: '',
    emailRules: [
      value => {
        if (value) return true

        return 'E-mail is required.'
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
        if (value?.length > 5) return true

        return 'Password must be at least 6 characters.'
      },
    ],
    repeatPassword: '',
    repeatPasswordRules: [
      value => {
        if (value) return true

        return 'Password is required.'
      },
      value => {
        if (value?.length > 5) return true

        return 'Password must be at least 6 characters.'
      },
    ]
  }),
  methods: {
    moveToLogin() {
      router.push('/login')
    },

    matchingPasswords() {
      if (this.password === undefined || this.repeatPassword === undefined) {
        return 'Passwords must be the same'
      }
      return this.password === this.repeatPassword ? true : "Passwords must be the same";
    },

    async submit() {
      this.loading = true
      if (!this.valid) {
        this.loading = false;
        return;
      }
      await this.requestApi()
      this.loading = false
    },

    async requestApi() {
      try {
        const response = await axios.post('https://song-gpt-nm46.onrender.com/register/', {
          fullName: this.fullName,
          email: this.email,
          password: this.password
        })
        this.error = response.data.message
        this.isError = false
        this.dialog = true
      } catch (e) {
        this.error = e.response.data.message
        this.isError = true
        this.dialog = true
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
            validate-on="blur"
            @submit.prevent
        >
          <h1 id="form-title">Registration</h1>
          <v-text-field
              v-model="fullName"
              color="deep-purple-darken-1"
              label="Full Name"
              :rules="fullNameRules"
              required>
          </v-text-field>
          <v-text-field
              v-model="email"
              :rules="emailRules"
              color="deep-purple-darken-1"
              label="Email"
              required>
          </v-text-field>
          <v-text-field
              v-model="password"
              color="deep-purple-darken-1"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              label="Password"
              @click:append="show1 = !show1">
          </v-text-field>
          <v-text-field
              v-model="repeatPassword"
              color="deep-purple-darken-1"
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="repeatPasswordRules.concat(matchingPasswords)"
              :type="show2 ? 'text' : 'password'"
              label="Repeat password"
              @click:append="show2 = !show2">
          </v-text-field>
          <v-container
              class="d-flex justify-end">
            <v-btn
                :loading="loading"
                @click="submit"
                color="deep-purple-darken-1"
                type="submit"
                text="Register">
            </v-btn>
          </v-container>
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
          <v-btn v-if="isError" color="primary" block @click="dialog = false">Close</v-btn>
          <v-btn v-if="!isError" color="primary" block @click="moveToLogin">Close</v-btn>
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