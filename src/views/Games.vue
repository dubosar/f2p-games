<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Games</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-text-field
          class="ml-3"
          style="max-width: 200px"
          :value="searchValue"
          label="Search by name"
          solo
          hide-details
          dense
          @input="search"
          @click:clear="() => this.searchValue = ''"
          clearable
      />

      <v-select
          class="ml-3"
          style="max-width: 200px"
          :items="platforms"
          :value="pickedPlatform"
          label="Filter by platform"
          solo
          hide-details
          dense
          @change="pickPlatform"
      />

      <v-switch
          class="ml-3"
          :input-value="onlyFavourites"
          label="Show favourites"
          color="warning"
          hide-details
          dense
          @change="toggleFav"
      />
    </v-app-bar>

    <v-row v-if="games.length">
      <v-col v-for="game in games" :key="game.id">
        <GameCard :game="game" />
      </v-col>
    </v-row>
  </div>
</template>

<script>

import GameCard from "@/components/GameCard.vue";
import { mapActions } from 'vuex'

export default {
  name: 'Games',
  components: { GameCard },
  data: () => ({
    searchValue: '',
    pickedPlatform: 'All',
    onlyFavourites: false,

    platforms: ['All', 'PC (Windows)', 'Web Browser'],
  }),
  created() {
    this.fetchData()
  },
  computed: {
    games() {
      if (this.onlyFavourites) {
        return this.$store.state.games.filter((game) => this.$store.state.favourites.includes(game.id))
      }

      if (this.searchValue) {
        return this.$store.state.games.filter((game) => {
          return game.title.toLowerCase().includes(this.searchValue.toLowerCase())
        })
      }

      if (this.pickedPlatform) {
        if (this.pickedPlatform === 'All') {
          return this.$store.state.games
        } else {
          return this.$store.state.games.filter((game) => game.platform === this.pickedPlatform)
        }
      }



      return this.$store.state.games
    },
  },
  methods: {
    ...mapActions(['fetchGamesList']),
    fetchData() {
      this.fetchGamesList()
    },

    search(val) {
      this.pickedPlatform = 'All'
      this.onlyFavourites = false
      this.searchValue = val
    },
    pickPlatform(val) {
      this.searchValue = ''
      this.onlyFavourites = false
      this.pickedPlatform = val
    },
    toggleFav(val) {
      this.searchValue = ''
      this.pickedPlatform = 'All'
      this.onlyFavourites = val
    },
  }
}
</script>
