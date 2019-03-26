// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 项目的JS入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入vuerouter
import VueRouter from 'vue-router'
// 懒加载
import VueLazyLoad from 'vue-lazyload'
// 导入Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 进行多语言设置，以英文为例
import locale from 'element-ui/lib/locale/lang/en'

// 引入mock数据，前端测试数据
require('././mock')

// 引入jQuery
// import $ from 'jquery'
// 引入Vuex

// 引入axios
import axios from 'axios'
// 使用qs模块来处理参数
import Qs from 'qs'
// 引用axios，并设置基础URL为后端服务api地址
axios.default.baseURL = 'http://localhost:8081'

// 引入font-awesome
import 'font-awesome/css/font-awesome.min.css'
// 将API方法绑定到全局l
Vue.prototype.$axios = axios
Vue.prototype.qs = Qs
Vue.config.productionTip = false
// 设置携带cookie
// axios.defaults.withCredentials =true;

// 懒加载
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading.svg'
})
Vue.use(VueRouter)

Vue.use(ElementUI, {locale})

/* eslint-disable no-new */
new Vue({el: '#app',
  router,
  // store,//使用store
  components: { App },
  template: '<App/>'
  // render:h=>h(App)
})
// .$mount('#app')
// 时间整理过滤器getYMD
Vue.filter('getYMD', function(input) {
  return input.split(' ')[0];
})
