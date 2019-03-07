// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 懒加载
import VueLazyLoad from 'vue-lazyload'
// 导入Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 进行多语言设置，以英文为例
import locale from 'element-ui/lib/locale/lang/en'
// 引入jQuery
// import $ from 'jquery'

// 引入axios
// import axios from 'axios'
// 引用axios，并设置基础URL为后端服务api地址
var axios = require('axios')
axios.defaults.baseURL = 'https://localhost:8443/api'
// 将API方法绑定到全局
Vue.prototype.axios = axios
// Vue.prototype.qs = Qs
Vue.config.productionTip = false
// QS是axios库中带的，不需要我们再npm安装一个
// import Qs from 'qs'
// 懒加载
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading.svg'
})

Vue.use(ElementUI, {locale})

/* eslint-disable no-new */
new Vue({el: '#app',
  router,
  components: { App },
  template: '<App/>'
  // render:h=>h(App)
})
// .$mount('#app')
