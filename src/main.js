import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/base.css'
import './assets/js/iconfont'
import './assets/js/flexible'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import toast from './components/common/toast'

import { formatTime } from './common/util'

Vue.use(ElementUI)
// 安装插件
Vue.use(toast)

Vue.config.productionTip = false;

Vue.filter('format', date => {
  return formatTime(date)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
