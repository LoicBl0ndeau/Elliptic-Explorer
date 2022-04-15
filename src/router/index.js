import { createRouter, createWebHistory } from 'vue-router'
import GraphView from '../views/GraphView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: GraphView
  },
<<<<<<< HEAD
=======
  {
    path: '/laura',
    name: 'laura',
    component: GraphViewTest
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
>>>>>>> parent of 07e0d0f (Menu About intégré au reste)
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
