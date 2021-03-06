import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引用 svg 图标组件
import './svg-icons'

// 公共样式
import './assets/css/cube.css';
import './assets/css/page.css';
import * as api from './api/index'

Vue.use(ElementUI)

Vue.prototype.$api = api    // 数据请求方法
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
