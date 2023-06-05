<script>
import router from "@/router/router";
import axios from "axios";

export default {
  data: () => ({
    songTheme: '',
    songText: '',
    loadingUpdate: false,
    loadingDelete: false,
    error: '',
    dialog: false,
  }),

  methods: {
    async fetchSong() {
      const song_id = this.$route.params.id;
      try {
        const response = await axios.get(`https://song-gpt-nm46.onrender.com/song/${song_id}`)
        this.songTheme = response.data.theme;
        this.songText = response.data.text;
      } catch (e) {
        this.error = e.response.data.message
        this.dialog = true
        return false
      }
    },

    async update() {
      this.loadingUpdate = true
      const results = await this.updateApi()
      this.loadingUpdate = false

      if (!results) {
        return
      }

      await router.push(`/song/${this.$route.params.id}`)
    },

    async updateApi() {
      try {
        const response = await axios.put(`https://song-gpt-nm46.onrender.com/song/${this.$route.params.id}`, {
          text: this.songText
        })
        return response.data
      } catch (e) {
        this.error = e.response.data.message
        this.dialog = true
        return false
      }
    },

    async deleteSong() {
      this.loadingDelete = true
      const results = await this.deleteApi()
      this.loadingDelete = false

      if (!results) {
        return
      }

      await router.push(`/`)
    },
    async deleteApi() {
      try {
        await axios.delete(`https://song-gpt-nm46.onrender.com/song/${this.$route.params.id}`)
        return true
      } catch (e) {
        this.error = e.response.data.message
        this.dialog = true
        return false
      }
    },
  },

  mounted() {
    this.fetchSong()
  }
}
</script>

<template>
  <v-container style="height: 100%;" class="d-flex  align-center justify-center">
    <v-card class="pa-4" width="600">
      <v-container class="d-flex flex-column">
        <v-label
            class="mt-2 mb-2 text-h6"
            id="theme-label"
            aria-multiline="true"
        >
          Theme:
        </v-label>

        <v-textarea
            v-model="songTheme"
            rows="2"
            color="deep-purple-darken-1"
            :readonly="true"
            class="mt-2 mb-2"
        ></v-textarea>

        <v-label
            class="mt-2 mb-2 text-h6"
        >
          Song lyrics:
        </v-label>
        <v-textarea
            v-model="songText"
            color="deep-purple-darken-1"
            class="mt-2 mb-2"
        ></v-textarea>
        <v-container
            class="d-flex justify-end">
          <v-btn
              class="mr-6"
              :loading="loadingDelete"
              @click="deleteSong"
              color="red-darken-1"
              variant="text"
              text="Delete">
          </v-btn>
          <v-btn
              :loading="loadingUpdate"
              @click="update"
              color="deep-purple-darken-1"
              type="submit"
              text="Update">
          </v-btn>
        </v-container>
      </v-container>
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
        <router-link to="/">
          <v-btn color="primary" block @click="dialog = false">Close</v-btn>
        </router-link>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
#theme-label {
  display: block !important;
}
</style>