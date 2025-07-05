import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/Home.vue'),
    },
    {
      path: '/autostart',
      name: 'Autostart',
      component: () => import('../views/plugins/Autostart.vue'),
    },
    {
      path: '/barcodeScanner',
      name: 'BarcodeScanner',
      component: () => import('../views/plugins/BarcodeScanner.vue'),
    },
  ],
})

export default router
