import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AddEditMovieView from '@/views/AddEditMovieView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'

export const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/add', name: 'AddMovie', component: AddEditMovieView },
  { path: '/edit/:id', name: 'EditMovie', component: AddEditMovieView },
  { path: '/movie/:id', name: 'MovieDetail', component: MovieDetailView }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
