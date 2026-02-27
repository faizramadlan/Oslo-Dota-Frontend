import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HeroView from '../views/HeroView.vue'
import DetailView from '../views/DetailView.vue'
import MemeView from '../views/MemeView.vue'
import FreeView from '../views/FreeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/heroes',
      name: 'heroes',
      component: HeroView
    },
    {
      path: '/heroes/:heroname',
      name: 'detail',
      component: DetailView
    },
    {
      path: '/memes',
      name: 'memes',
      component: MemeView
    },
    {
      path: '/freebies',
      name: 'free-games',
      component: FreeView
    }
  ]
})

export default router
