import  Vue from 'vue';
// 引入vuex
import Vuex from 'vuex';
Vue.use(Vuex);

const store = new Vuex.Store(
  {
    debug: true,
    state: { //唯一数据源，我理解为声明全局变量
      loginCandidatePhone: ''
    },
    getters: {//针对state数据的过滤，
      // doneTodos: state => {
      //   return state.loginCandidatePhone.filter(loginCandidatePhone => loginCandidatePhone)
      // }

    },
    mutations: { //逻辑处理，但Mutation 必须是同步函数
      // 变更状态
      updateLoginCandidate(state,message){
        state.loginCandidatePhone = message
      }
    },
    actions: {//Action 类似于 mutation,Action 提交的是 mutation，而不是直接变更状态;Action 可以包含任意异步操作.
      setIncrement (context) {
        context.commit('updateLoginCandidate')
      }
    }
  })

export default store;
