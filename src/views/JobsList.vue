/**
 * @author amberXu
 * @date 2019/2/21
 * @Description: 职位列表页面
*/
<template>
  <div>
    <nav-header></nav-header>
    <header></header>
    <div></div>
    <div></div>
    <footer></footer>
    <!--这是职位列表ID{{$route.params.jobsId}}-->
    <!--<div>-->
      <!--&lt;!&ndash;要使用绝对地址&ndash;&gt;-->
      <!--<router-link to="/job/title">显示职位具体信息</router-link>-->
    <!--</div>-->
    <!--&lt;!&ndash;显示职位的具体信息&ndash;&gt;-->
    <!--<div>-->
      <!--<router-view></router-view>-->
    <!--</div>-->
    <!--<div>-->
      <!--<router-link to="/detail?jobId=11">跳转到详情页面</router-link>-->
      <!--<button @click="jump">button-跳转到详情页面</button>-->
    <!--</div>-->
    <!--<router-link :to="{name: 'detail',params:{cartId:123}}">跳转到详情页面</router-link>-->
 <!---->
  </div>
</template>

<script>

import './../assets/css/base.css'
import axios from 'axios'
import NavHeader from '@/components/Header'
export default {
  name: 'JobsList',
  data () {
    return {
      jobsList: []
    }
  },
  methods: {
    // jump () {
    //   this.$router.push('/detail?jobId=22')
    // }
    getJobsList () {
      axios.get('/job').then((result) => {
        var res = result.data
        this.jobsList = res.result
      })
    }
  },
  components: {
    NavHeader
  },
  mounted () {
    this.getJobsList()
  }
}
</script>

<style scoped>

</style>
