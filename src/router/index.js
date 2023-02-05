import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('../views/Data.vue')
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../views/User.vue')
    }
  ]
})

export default router
