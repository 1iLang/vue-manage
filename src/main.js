import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'//全局引用
//import { Button,Container,Main,Header,Aside } from 'element-ui'//按需引用
import 'element-ui/lib/theme-chalk/index.css'

import store from './store'
import router from './router'
import http from 'axios'
import './api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

router.beforeEach((to,from,next) => {
  let token = window.sessionStorage.token
  if(token){ 
    if(to.name === 'login') next({ path: '/' })
    next()
  }else{
    if(to.name === 'login') next()
    else next({ name: 'login' })
  }
})

const menuData = window.sessionStorage.token ? JSON.parse(window.sessionStorage.token).menuData : false

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit('addRoutes',{data:menuData,router})
  }
}).$mount('#app')
