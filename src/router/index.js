import { createRouter, createWebHistory } from 'vue-router'
import GraphView from '../views/GraphView.vue'
import GraphViewTest from '../views/GraphViewTest.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: GraphView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
