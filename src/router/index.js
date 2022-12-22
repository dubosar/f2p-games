import Vue from 'vue'
import VueRouter from 'vue-router'
import Games from '../views/Games.vue'
import GameDetails from '../views/GameDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'games',
    component: Games
  },
  {
    path: '/games/:id',
    name: 'GameDetails',
    component: GameDetails
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
