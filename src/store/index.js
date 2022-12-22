import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    games: [],
    pickedGame: {},
    favourites: JSON.parse(localStorage.getItem("favItems")) || [],
  },
  mutations: {
    updateGameList (state, payload) {
      state.games = payload
    },
    pickAGame (state, payload) {
      state.pickedGame = payload
    },
    toggleFavourites (state, payload) {
      if (state.favourites.includes(payload)) {
        state.favourites = state.favourites.filter(item => item !== payload)
      } else {
        state.favourites = [...state.favourites, payload]
      }
      localStorage.setItem('favItems', JSON.stringify(state.favourites))
    }
  },
  actions: {
    fetchGamesList ({ commit }) {
      axios.defaults.headers['X-RapidAPI-Key'] = '25c865a01fmsh776602e7ae5d399p1b00d5jsn8da229bcb041';
      axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games')
        .then((resp) => commit('updateGameList', resp.data))
    },
    fetchSpecificGame ({ commit }, params) {
      axios.defaults.headers['X-RapidAPI-Key'] = '25c865a01fmsh776602e7ae5d399p1b00d5jsn8da229bcb041';
      axios.get('https://free-to-play-games-database.p.rapidapi.com/api/game', { params })
        .then((resp) => commit('pickAGame', resp.data))
    },
  },
})
