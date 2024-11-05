import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import LocalMovies from '../views/LocalMovies.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/movie/:id',
    name: 'Movie-Detail',
    component: MovieDetail
  },
  {
    path: '/movie/save',
    name: 'Save-Movie',
    component: LocalMovies
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
