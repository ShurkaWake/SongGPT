<script>
import store from "@/store";
import router from "@/router/router";
import axios from "axios";

export default {
  data: () => ({
    min: 50,
    max: 2048,
    slider: 256,
    dialog: false,
    valid: false,
    loading: false,
    timeout: null,
    error: '',
    theme: '',
    themeRules: [
      value => {
        if (value) return true

        return 'Theme is required.'
      },
    ],
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

      await router.push(`/`)
    },

    async requestApi() {
      try {
        const response = await axios.post('https://song-gpt-nm46.onrender.com/song/', {
          theme: this.theme,
          songLength: this.slider
        })
        return response.data
      } catch (e) {
        this.error = e.response.data.message
        this.dialog = true
        return false
      }
    }
  },
  mounted() {
    if (!store.state.isAuth) {
      router.push("/unauthorized")
    }
  }
}
</script>

<template>
  <v-container style="height: 100%;" class="d-flex align-center justify-center">
    <v-card class="pa-4" width="400">
      <v-form
          fast-fail
          v-model="valid"
          id="login-form"
          validate-on="input"
          @submit.prevent
      >
        <h1 id="form-title">Create new song</h1>
        <v-textarea
            v-model="theme"
            :rules="themeRules"
            color="deep-purple-darken-1"
            label="Theme"
            required>
        </v-textarea>
        <v-label class="ml-2 mt-4">
          Maximum words in song
        </v-label>
        <v-slider
            color="deep-purple-darken-1"
            v-model="slider"
            class="align-center"
            :max="max"
            :min="min"
            :step="1"
            hide-details
        >
          <template v-slot:append>
            <v-text-field
                v-model="slider"
                hide-details
                single-line
                density="compact"
                type="number"
                style="width: 100px"
            ></v-text-field>
          </template>
        </v-slider>
        <v-container class="d-flex justify-center">
          <v-btn
              :loading="loading"
              @click="submit"
              color="deep-purple-darken-1"
              type="submit"
              text="Create">
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
        <v-btn color="primary" block @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
#form-title {
  width: inherit;
  padding: 8px;
  text-align: center;
}
</style>