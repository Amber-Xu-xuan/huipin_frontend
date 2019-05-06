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
import qs from 'qs'
// 引用axios，并设置基础URL为后端服务api地址
axios.defaults.baseURL = 'http://localhost:8082/zp'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// 引入font-awesome
import 'font-awesome/css/font-awesome.min.css'
// 将API方法绑定到全局l
Vue.prototype.$axios = axios
Vue.prototype.qs = qs
Vue.config.productionTip = false
// 设置携带cookie,这样设置每次session就是一致的了，解决登录验证
axios.defaults.withCredentials = true
//开启debug
Vue.config.debug = true;

// 懒加载
Vue.use(VueLazyLoad, {
  loading: '/static/loading-svg/loading.svg'
})
Vue.use(VueRouter)

Vue.use(ElementUI, {locale})
//在store.js文件中使用vuex集中式状态管理
import store from './store.js'

/* eslint-disable no-new */
new Vue({el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
  // render:h=>h(App)
})
// .$mount('#app')
// 时间整理过滤器getYMD
Vue.filter('getYMD', function(input) {
  return input.split(' ')[0];
})
