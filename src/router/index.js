import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/china',
    name: 'china',
    component: () => import(/* webpackChunkName: "china" */ '../views/Map/china.vue')
  },
  {
    path: '/province',
    name: 'province',
    component: () => import(/* webpackChunkName: "province" */ '../views/Map/province.vue')
  },
  {
    path: '/city',
    name: 'city',
    component: () => import(/* webpackChunkName: "city" */ '../views/Map/city.vue')
  },
  {
    path: '/imgCheck',
    name: 'imgCheck',
    component: () => import(/* webpackChunkName: "imgCheck" */ '../views/imgCheck/index.vue')
  },
  {
    path: '/desensitizeInput',
    name: 'desensitizeInput',
    component: () => import(/* webpackChunkName: "desensitizeInput" */ '../views/desensitizeInput/index.vue')
  },
  {
    path: '/ruleTable',
    name: 'ruleTable',
    component: () => import('../views/ruleTable/Index.vue')
  }, {
    path: '/drager',
    name: 'drager',
    component: () => import('../views/drager/Index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
