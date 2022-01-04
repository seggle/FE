import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Class from '../views/Class.vue'
import ClassManager from '../views/ClassManager.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/class',
    name: 'Class',
    component: Class
  },
  {
    path: '/class-manager',
    name: 'ClassManager',
    component: ClassManager
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
