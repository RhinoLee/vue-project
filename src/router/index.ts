import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'advertise' } },
    {
      path: '/interview',
      name: 'interview',
      component: () => import('@/views/interview/Interview.vue'),
      children: []
    },
    {
      path: '/advertise',
      name: 'advertise',
      component: () => import('@/views/advertise/AdComponent.vue'),
      children: []
    }
  ]
})

export default router
