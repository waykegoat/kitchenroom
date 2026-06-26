import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue')
  },
  {
    path: '/examples',
    name: 'examples',
    component: () => import('@/pages/ExamplesPage.vue')
  },
  {
    path: '/constructor',
    name: 'constructor',
    component: () => import('@/pages/ConstructorPage.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue')
  }
]

export const appRouter = createRouter({
  history: createWebHistory('/kitchenroom/'),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})
