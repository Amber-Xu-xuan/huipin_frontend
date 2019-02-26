/**
 * @author amberXu
 * @date 2019/2/21
 * @Description: 职位列表页面
*/
<template>
  <div>
    <nav-header></nav-header>
    <div class="filter" id="filter">
      <dl class="filter-salary"></dl>
      <dt>薪资待遇：</dt>
      <dd>        <a href="javascript:void(0)" v-bind:class="{'cur':salaryCheck == 'all'}">All</a>
        </dd>
      <dd v-for="salary in salaryFilter" :key="salary.startSalary" @click="salaryCheck=index">
        <a href="javascript:void(0)" v-bind:class="{'cur':salaryCheck==index}">{{salary.startSalary}}-{{salary.endSalary}}</a>
      </dd>
    </div>
    <div>
      <ul>
        <li v-for="job in jobsList" :key="job.jId">
          哈哈哈
          <p><span>职位：{{job.jName}}</span></p>
          <p><span>薪资：{{job.salary}}</span></p>
          <p><span>地区：{{job.jarea}}</span></p>

        </li>

      </ul>
    </div>
    <div>

    </div>
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
import NavHeader from '@/components/Header'
export default {
  name: 'JobsList',
  data () {
    return {
      jobsList: [],
      salaryFilter: [
        {
          startSalary: '1000.00',
          endSalary: '3000.00'
        },
        {
          startSalary: '3000.00',
          endSalary: '5000.00'
        },
        {
          startSalary: '5000.00',
          endSalary: '8000.00'
        },
        {
          startSalary: '8000.00',
          endSalary: '10000.00'
        },
        {
          startSalary: '>10000.00'
        }
      ],
      salaryCheck: 'all'
    }
  },
  methods: {
    // jump () {
    //   this.$router.push('/detail?jobId=22')
    // }
    getJobsList () {
      this.axios.get('/job').then((result) => {
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
a{
  text-decoration: none;
  color: #3c3c3c;
}
</style>
