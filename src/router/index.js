import Vue from 'vue'
import Router from 'vue-router'
import JobsList from '../views/JobsList'
// 求职者
// 修改简历
import EditResume from '../views/resume/EditResume'
// 登录
import Login from '../components/Login'
//求职者中心
import CandidateCenter from '../views/candidate/CandidateCenter'

// 编辑自我描述
import EditSelfDescription from '../views/resume/EditSelfDescription'
// 编辑基本信息
import EditCandidateBaseInfo from '../views/resume/EditCandidateBaseInfo'
// 管理教育经历
// import ManageEducation from '../views/resume/ManageEducation'
// 管理项目经历
import ManageProjectExperience from '../views/resume/ManageProjectExperience'
// 管理社交主页
import ManageSocialHomepage from '../views/resume/ManageSocialHomepage'
// 投递箱：过简历的公司
import DiliveryResumeEnterprise from '../views/deliveryBox/DiliveryResumeEnterprise'
// 收藏夹
import CollectEnterprise from '../views/candidate/CollectEnterprise'
// 上传头像
import UploadAvatar from '../views/upload/UploadAvatar'
// 简历

//工作经历
// ManageWorkExperience
import ManageWorkExperience from '../views/resume/ManageWorkExperience'
// 修改密码
import  EditPassword from '../views/EditPassword'
//求职者修改状态
import SetStatus from '../views/candidate/SetStatus'

// 求职者登录
import LandingPage from '../components/LandingPage'
// 用户协议
import UserAgreement from '../components/UserAgreement'
//注册组件
import EnterpriseRegister from '../components/EnterpriseRegister'

//管理员
// 管理员中心
import Admin from '../views/manager/Admin'
// 管理员登录
import AdminLogin from '../views/manager/AdminLogin'
//企业认证
import EnterpriseCertification from '../views/manager/EnterpriseCertification'
//统计企业数据
import StatisticsEnterprise from '../views/manager/StatisticsEnterprise'
//统计个人数据
import StatisticsCandidate from '../views/manager/StatisticCandidate'


// 企业用户中心
import EnterpriseCenter from '../views/enterprise/EnterpriseCenter';
// 企业用户中心管理职位
import EnterpriseJobManage from '../views/enterprise/job/EnterpriseJobManage'
// 游客模式：企业招聘信息，点击公司名称之后显示的企业招聘信息
import EnterpriseJobMessage from '../views/enterprise/EnterpriseJobMessage'
//企业用户中心，管理求职者模块
import EnterpriseCandidateManage from '../views/enterprise/EnterpriseCandidateManage'
//修改企业信息
import EditEnterpriseInfo  from '../views/enterprise/EditEnterpriseInfo'
//上传企业信息
import UploadEnterpriseCertification from '../views/enterprise/UploadEnterpriseCertification'
//企业账号状态，是否通过验证，管理员的反馈信息，审核信息哪里不合格
import EnterpriseStatus from '../views/enterprise/EnterpriseStatus'

// 游客模式：企业用户信息，点击公司名称之后显示的企业详细信息
import EnterpriseIntroduce from  '../views/enterprise/EnterpriseIntroduce'
//首页，企业招聘职位的card
import EnterpriseJobListDetail from '../views/enterprise/EnterpriseJobListDetail'
// 引入资源请求插件
import VueResource from 'vue-resource'



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
      name: '首页',
      component: JobsList
    },
    // 求职者
    {
      path: '/candidateCenter',
      name: '用户中心',
      iconCls: 'el-icon-user',
      component: CandidateCenter,
      // meta: {
      //   roles: ['admin', 'editor'], //设置该路由进入的权限，支持多个权限叠加
      //   title: '用户中心', //设置该路由在侧边栏和面包屑中展示的名字
      //   icon: 'user', //设置该路由的图标
      //   noCache: false, //如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
      //   breadcrumb: false, // 如果设置为false，则不会在breadcrumb面包屑中显示
      //   index: {index:'/usercenter'}
      // },
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
          path: 'editPassword',
          name: '修改密码',
          component: EditPassword,
          meta: {
            title: '修改密码'
          },
          hidden: true
        },
        {
          path: 'setStatus',
          name: '修改状态',
          component: SetStatus,
          meta: {
            title: '修改状态'
          },
          hidden: true
        },
        {
          path: 'selfDescription',
          name: '编辑自我描述',
          component: EditSelfDescription,
          meta: {
            title: '编辑自我描述'
          },
          hidden: true
        },
        {
          path: 'candidateBaseInfo',
          name: '编辑基本信息',
          component: EditCandidateBaseInfo,
          meta: {
            title: '编辑基本信息'
          },
          hidden: true
        },
        {
          path: 'education',
          name: '管理教育经历',
          component: EditResume,
          meta: {
            title: '管理教育经历'
          },
          hidden: true
        },
        {
          path: 'workExperience',
          name: '管理工作经历',
          component: ManageWorkExperience,
          meta: {
            title: '管理工作经历'
          },
          hidden: true
        },
        {
          path: 'project',
          name: '管理项目经历',
          component: ManageProjectExperience,
          meta: {
            title: '管理项目经历'
          },
          hidden: true
        },
        {
          path: 'socialHomepage',
          name: '管理社交主页',
          component: ManageSocialHomepage,
          meta: {
            title: '管理社交主页'
          },
          hidden: true
        },
        {
          path: 'dilivery',
          name: '投递过',
          component: DiliveryResumeEnterprise,
          meta: {
            title: '投递过'
          },
          hidden: true
        },
        {
          path: 'collect',
          name: '收藏夹',
          component: CollectEnterprise,
          meta: {
            title: '收藏夹'
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
      path: '/enterpriseRegister',
      name: '注册企业用户',
      component: EnterpriseRegister
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
      path: '/admin',
      name: '管理员登录',
      component: AdminLogin,
    },
    {
      path: '/adminCenter',
      name: '管理员中心',
      component: Admin,
      children: [
        // 对注册的企业进行认证
        {
          path: 'enterpriseCertification',
          name: '企业认证',
          component: EnterpriseCertification,
          hidden: true
        },
        {
          //  统计注册企业页面
          path: 'statisticsEnterprise',
          name: '统计企业用户',
          component: StatisticsEnterprise,
          hidden: true
        },{
          //统计注册应聘者
          path: 'statisticsCandidate',
          name: '统计应聘用户',
          component: StatisticsCandidate,
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
        },
      ]
    },
    {
      path: '/enterprise',
      name: 'enterprise',
      component: EnterpriseJobMessage,
      children: [
        //公司信息介绍
        {
          path: 'introduce',
          name: 'introduce',
          component: EnterpriseIntroduce,
          hidden: true
        },
        // 职位信息
        {
          path: 'jobmessage',
          name: 'jobmessage',
          component: EnterpriseJobListDetail,
          hidden: true
        }
      ]
    },
    {
      path: '/enterpriseCenter',
      name: '企业用户中心',
      component: EnterpriseCenter,
      children: [
        // 管理招聘职位
        {
          path: 'jobManage',
          name: '管理职位',
          component: EnterpriseJobManage,
          hidden: true
        },
        //管理求职者
        {
          path: 'candidateManage',
          name: '管理求职者',
          component: EnterpriseCandidateManage,
          hidden: true
        },
        //修改密码
        {
          path: 'editPassword',
          name: '修改密码',
          component: EditPassword,
          hidden: true
        },
        //修改企业信息
        {
          path:'editEnterpriseInfo',
          name:'修改企业信息',
          component:EditEnterpriseInfo
        },
        //上传企业认证信息
        {
          path:'uploadEnterpriseCertification',
          name:'企业认证',
          component:UploadEnterpriseCertification
        },
        //查看企业最新的验证状态
        {
          path:'EnterpriseStatus',
          name:'账号状态管理',
          component:EnterpriseStatus
        }
        ]
    },
    {
      path: '/enterprise',
      name: '招聘企业信息',
      component: EnterpriseJobMessage,
      children: [
        // 首页点击公司名称，职位信息
        {
          path: 'jobmessage',
          name: 'jobmessage',
          component: EnterpriseJobListDetail,
          hidden: true
        },
        //公司信息介绍
        {
          path: 'introduce',
          name: 'introduce',
          component: EnterpriseIntroduce,
          hidden: true
        }
      ]
    },
    {
      path: '/jobslist',
      name: 'JobsList',
      component: JobsList,
    }
  ]
})
