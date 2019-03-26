import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import JobsList from '@/views/JobsList'
import Title from '../views/Title'
import Login from '../components/Login'
import Usercenter from '../components/Usercenter'
import UploadAvatar from '../views/upload/UploadAvatar'
import Detail from '../views/Detail'
import LandingPage from '../components/LandingPage'
//注册组件
import Register from '../components/Register'
// 引入资源请求插件
import VueResource from 'vue-resource'

// 引入vuex
import Vuex from 'vuex';
Vue.use(Vuex);
// @是src
Vue.use(Router)
// 使用VueResource插件,ajax插件
Vue.use(VueResource)


// const state={//要设置的全局访问的state对象
//   showFooter: true,
//   changableNum:0
//   //要设置的初始属性值
// };
// // Vuex的使用
// const store = new Vuex.Store({
//   state
// });
//

export default new Router({
  mode: 'history',
  // 点击路由后的现实样式
  linkActiveClass: 'myactive',
  routes: [
    {
      path: '/',
      // name: 'landing',
      // component: LandingPage
      name: 'login',
      component: Login
    },
    {
      path: '/usercenter',
      name: 'usercenter',
      meta: {
        roles: ['admin', 'editor'], //设置该路由进入的权限，支持多个权限叠加
        title: '用户中心', //设置该路由在侧边栏和面包屑中展示的名字
        icon: 'user', //设置该路由的图标
        noCache: true, //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        breadcrumb: false // 如果设置为false，则不会在breadcrumb面包屑中显示
      },
      component: Usercenter
    },
    {
      path: '/landing',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/uploadAvatar',
      name: 'uploadAvatar',
      component: UploadAvatar
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/jobslist',
      name: 'JobsList',
      component: JobsList,
      children: [
        {
          // 不能加斜杠，要不就是一级路由
          // 组件建议使用大写开头
          path: 'title',
          name: 'title',
          component: Title
        }
      ]
    }
  ]
})
