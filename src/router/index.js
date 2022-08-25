import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoggedinView from '../views/LoggedinView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: LoggedinView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.API_URL),
  routes
})

export default router
