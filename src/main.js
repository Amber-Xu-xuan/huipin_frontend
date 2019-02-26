// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 导入Element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 进行多语言设置，以英文为例
import locale from 'element-ui/lib/locale/lang/en'
// 引入jQuery
// import $ from 'jquery'

Vue.config.productionTip = false
Vue.use(ElementUI, {locale})

/* eslint-disable no-new */
new Vue({el: '#app',
  router,
  components: { App },
  template: '<App/>'
  // render:h=>h(App)
})
// .$mount('#app')
