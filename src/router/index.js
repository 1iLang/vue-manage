import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home' //全局引用

Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'Main',
  redirect: '/home',
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
    },/* {
      path: '/other',
      name: 'other',
      component: () => import('../views/Other/page1'),
      children: [{
          path: '/page1',
          name: 'page1',
          component: () => import('../views/Other/page1')
        },
        {
          path: '/page2',
          name: 'page2',
          component: () => import('../views/Other/page2')
        }
      ]
    },*/ {
      path: '/page1',
      name: 'page1',
      component: () => import('../views/Other/page1')
    },{
      path: '/page2',
      name: 'page2',
      component: () => import('../views/Other/page2')
    }

  ]
}, ]
const router = new VueRouter({
  mode: 'history',
  routes
})


export default router