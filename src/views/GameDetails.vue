<template>
  <div>
    <v-btn to="/">Go back</v-btn>

    <h2>{{ game.title }}</h2>
    <v-row>
      <v-col>
        <v-img :src="game.thumbnail"></v-img>

        <v-row class="my-3">
          <v-col v-for="screen in game.screenshots" :key="screen.id" class="d-flex child-flex" cols="4">
            <v-img :src="screen.image" aspect-ratio="1" class="grey lighten-2"></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <div class="subtitle-2">Developer: {{ game.developer }}</div>
        <div class="subtitle-2">Publisher: {{ game.publisher }}</div>
        <div class="subtitle-2">Genre: {{ game.genre }}</div>
        <div class="subtitle-2">Platform: {{ game.platform }}</div>
        <div class="subtitle-2">Release date: {{ game.release_date }}</div>

        <div class="subtitle-1 mt-3">
          <h4>Description</h4>
          {{ game.description }}
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import {mapActions} from "vuex";

export default {
  name: "GameDetails",
  created() {
    this.fetchData()
  },
  computed: {
    game() {
      return this.$store.state.pickedGame
    }
  },
  methods: {
    ...mapActions(['fetchSpecificGame']),
    fetchData() {
      this.fetchSpecificGame({ id: this.$route.params.id })
    }
  }
}
</script>

<style scoped>

</style>
