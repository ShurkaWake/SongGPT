<script>
import axios from "axios";

export default {
  data: () => ({
    songList: [],
    vuePage: "/song/",
    pages: 1,
    size: 6,
    currentPage: 1,
    dialog: false,
    error: '',
  }),

  methods: {
    async fetchSongs(){
      try {
        const response = await axios.get(`https://song-gpt-nm46.onrender.com/song/`, {
          params: {
            page: this.currentPage,
            size: this.size
          }
        })

        this.songList = response.data.list;
        this.pages = response.data.pages;
      } catch (e) {
        this.error = e.response.data.message
        this.dialog = true
        return false
      }
    }
  },

  mounted() {
    this.fetchSongs()
  }
}
</script>

<template>
<v-label
  v-if="songList === undefined || songList.length === 0"
  text="There is no songs. Try to create new one"
  class="text-h5"></v-label>

<v-container>
  <v-row>
    <v-col
        v-for="song in songList"
        :key="song._id"
        cols="6"
    >
      <router-link class="text-decoration-none" :to="{path:vuePage+song._id}">
        <v-card
          height="212"
          class="pa-2 text-decoration-none"
          prepend-icon="mdi-music-note"
          v-bind:title=song.theme>
          <v-card-text class="overflow-hidden">
          <span v-html="song.text.replaceAll('\n', '<br>')">
          </span>
          </v-card-text>
        </v-card>
      </router-link>
    </v-col>
  </v-row>
</v-container>
<v-pagination
:length="pages"
v-model="currentPage"
class="mt-6"
@update:model-value="fetchSongs"></v-pagination>

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

</style>