import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/system/Login'
import Home from '../views/Home'
import Index from '../views/system/index'

Vue.use(VueRouter)
const routes = [{
    path: '/',
    redirect: '/Login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [{
        path: '/Home',
        meta: {
          title: '首页'
        },
        component: Index
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router