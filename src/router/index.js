import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/cost-statistics',
      name: 'CostStatistics',
      component: () => import('../views/cost-statistics/index.vue')
    },
    {
      path: '/user-info',
      name: 'UserInfo',
      component: () => import('../views/user-info/index.vue')
    },
    {
      path: '/login-register',
      name: 'LoginRegister',
      component: () => import('../views/login/index.vue')
    },
    {
      path: '/detail/:id',
      component: () => import('../views/bill-detail/index.vue')
    }
  ]
})

export default router
