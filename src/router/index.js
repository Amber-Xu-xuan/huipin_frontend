import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import JobsList from '@/views/JobsList'
import Title from '../views/Title'
import Login from '../components/Login'
import Usercenter from '../components/Usercenter'
import Image from '../views/Image'
import Detail from '../views/Detail'
// 引入资源请求插件
import VueResource from 'vue-resource'
// @是src
Vue.use(Router)
// 使用VueResource插件,ajax插件
Vue.use(VueResource)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/usercenter',
      name: 'usercenter',
      component: Usercenter
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/jobs',
      name: 'JobsList',
      component: JobsList,
      children: [
        {
          // 不能加斜杠，要不就是一级路由
          // 组件建议使用大写开头
          path: 'title',
          name: 'title',
          component: Title
        },
        {
          path: 'image',
          name: 'image',
          component: Image
        }
      ]
    }
  ]
})
