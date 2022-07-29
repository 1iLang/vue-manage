import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'//全局引用
//import { Button,Container,Main,Header,Aside } from 'element-ui'//按需引用
import 'element-ui/lib/theme-chalk/index.css'

import router from './router'
import store from './store'
import http from 'axios'
import './api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
