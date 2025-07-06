import { createRouter, createWebHistory } from 'vue-router'
import Recipes from '@/router/Recipes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    ...Recipes,
  ],
})

export default router
