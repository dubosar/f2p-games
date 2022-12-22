<template>
  <v-hover v-slot="{ hover }">
    <v-card
        class="my-3 card"
        :class="{ 'on-hover': hover }"
        :elevation="hover ? 12 : 2"
        @click="handleGameClick(game.id)"
    >
      <v-img height="250" :src="game.thumbnail"></v-img>

      <v-card-title>{{ game.title }}</v-card-title>

      <v-card-text>
        <div>{{ game.genre }}</div>
        <div>{{ game.platform }}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            :color="isInFavourites ? 'orange' : 'primary'"
            text
            @click.stop="toggleFavourite"
        >
          Toggle status
          <v-icon right dark>
            {{ isInFavourites ? 'mdi-star' : 'mdi-star-outline' }}

          </v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  name: "GameCard",
  props: {
    game: {
      type: Object,
      required: true,
    }
  },
  computed: {
    isInFavourites() {
      return this.$store.state.favourites.includes(this.game.id)
    }
  },
  methods: {
    handleGameClick() {
      this.$router.push(`games/${this.game.id}`)
    },
    toggleFavourite() {
      this.$store.commit('toggleFavourites', this.game.id )
    }
  }
}
</script>

<style scoped>
  .card{
    cursor: pointer;
  }
</style>
