import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    beforeEnter (to, from, next) {
      next('/todos')
    }
  },
  {
    path: '/todos',
    name: 'Task List',
    component: () => import(/* webpackChunkName: "about" */ '../views/TaskList.vue')
  },
  {
    path: '/todos/:id',
    name: 'Task',
    props: true,
    component: () => import(/* webpackChunkName: "about" */ '../views/Task.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
