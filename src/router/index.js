import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import JobsList from '@/views/JobsList'
import Title from '../views/Title'
// 修改简历
import EditResume from '../views/resume/EditResume'
// 登录
import Login from '../components/Login'
// 个人中心
import Usercenter from '../components/Usercenter'
// 上传头像
import UploadAvatar from '../views/upload/UploadAvatar'
// 简历
//上传简历
import UploadResume from '../views/resume/UploadResume'
// 下载简历 DownloadResume
import DownloadResume from '../views/resume/DownloadResume'
// 修改密码
import  EditPassword from '../views/EditPassword'
import Detail from '../views/Detail'
// 当第一次进入本网站
import LandingPage from '../components/LandingPage'
// 用户协议
import UserAgreement from '../components/UserAgreement'
//注册组件
import Register from '../components/Register'
// 引入资源请求插件
import VueResource from 'vue-resource'

// 引入地址选择器组件
// import VDistpicker from 'v-distpicker'
// Vue.component('v-distpicker', VDistpicker)

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
  scrollBehavior: () => ({
    y: 0
  }),
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
      name: '用户中心',
      iconCls: 'el-icon-user',
      component: Usercenter,
      meta: {
        roles: ['admin', 'editor'], //设置该路由进入的权限，支持多个权限叠加
        title: '用户中心', //设置该路由在侧边栏和面包屑中展示的名字
        icon: 'user', //设置该路由的图标
        noCache: false, //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        breadcrumb: false, // 如果设置为false，则不会在breadcrumb面包屑中显示
        index: {index:'/usercenter'}
      },
      children: [
        {
          path: 'editResume',
          name: '在线编辑简历',
          component: EditResume,
          meta: {
            title: '在线编辑简历'
          },
          hidden: true
        },
        {
          path: 'uploadResume',
          name: '上传简历',
          component: UploadResume,
          meta: {
            title: '上传简历'
          },
          hidden: true
        },
        {
          path: 'downloadResume',
          name: '下载简历',
          component: DownloadResume,
          meta: {
            title: '下载简历'
          },
          hidden: true
        },
        {
          path: 'editPassword',
          name: '修改密码',
          component: EditPassword,
          meta: {
            title: '修改密码'
          },
          hidden: true
        }
      ]
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
      path: '/protocol',
      name: '用户协议',
      component: UserAgreement
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
          component: Title,
          hidden: true
        }
      ]
    }
  ]
})
