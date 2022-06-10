import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home' //全局引用

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Main',
  component: () => import('../views/Main'), //按需引入(懒加载)
  children: [{
      path: '/home',
      name: 'home',
      component: () => import('../views/Home')
    }, {
      path: '/mall',
      name: 'mall',
      component: () => import('../views/Mall')
    }, {
      path: '/user',
      name: 'user',
      component: () => import('../views/User')
    }

  ]
}, ]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router