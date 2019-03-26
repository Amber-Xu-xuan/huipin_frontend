/**
 * @author amberXu
 * @date 2019/2/21
 * @Description: 职位列表页面
*/
<template>
  <div>
    <nav-header></nav-header>
    <!--头部幻灯片-->
    <section></section>
    <div class="slide-container">
    <el-carousel indicator-position="outside" :interval="5000" arrow="always">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    </div>
    <!--头部幻灯片-->
    <div>
      <span>
        <a href="javascript:void(0)" class="fillterby stopPop" @click="showFilterPop">按钮</a>
        <a href="javascript:void(0)" class="default cur"></a>
        <a href="javascript:void(0)" class="salary">薪资</a>
        <a href="javascript:void(0)" class="area">地区</a>
      </span>
    </div>
    <div class="filter" id="filter" v-bind:class="{'filterBy-show':filterBy}">
      <dl class="filter-salary"></dl>
      <dt>薪资待遇：</dt>
      <dd>        <a href="javascript:void(0)" v-bind:class="{'cur':salaryCheck == 'all'}">All</a>
        </dd>
      <dd v-for="(salary,index) in salaryFilter" :key="salary.startSalary" >
        <a href="javascript:void(0)" @click="setSalaryFilter(index)" v-bind:class="{'cur':salaryCheck==index}">{{salary.startSalary}}-{{salary.endSalary}}</a>
      </dd>
    </div>
    这是职位列表ID{{$route.params.jobsId}}
    <div>
    <!--要使用绝对地址-->
    <router-link to="/job/title">显示职位具体信息</router-link>
    </div>
    <!--显示职位的具体信息-->
    <div>
    <router-view></router-view>
    </div>
    <div>
    <router-link to="/detail?jobId=11">跳转到详情页面</router-link>
    <button @click="jump">button-跳转到详情页面</button>
    </div>
    <router-link :to="{name: 'detail',params:{cartId:123}}">跳转到详情页面</router-link>
    <div>

    </div>
    <!--显示职位的卡片-->
    <el-row>
      <el-col :span="24"><div class="grid-content bg-purple-dark"></div></el-col>
    </el-row>

    <div>
      <el-row class="jobs-container">
        <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="6" v-for="item in jobsList" :key="jobsList.jId" >
          <div class="grid-content bg-purple">
            <el-card class="box-card" shadow="hover" body-style="margin:'30px'">
              <div slot="header" class="clearfix">
                <span class="jName">{{item.jName}}</span>
                <el-button style="float: right; padding: 3px 0" type="text">投递简历</el-button>
              </div>
              <div v-for="o in 4" :key="o" class="text item">
                {{'列表内容 ' + o }}
              </div>
            </el-card>
        </div>
        </el-col>

      </el-row>
    </div>
    <!--显示职位的卡片-->
    <footer></footer>
 <!---->
  </div>
</template>

<script>

import './../assets/css/base.css'
import NavHeader from '@/components/ZPHeader'
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
      salaryCheck: 'all',
      filterBy: false,
      overLayFlag: false
    }
  },
  methods: {
    jump () {
      this.$router.push('/detail?jobId=22')
    },
    getJobsList () {
      this.$axios.get('candidate/jobs').then((result) => {
        var res = result.data
        this.jobsList = res.data
        console.log(this.jobsList)
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    showFilterPop () {
      this.filterBy = true
      this.overLayFlag = true
    },
    closePop () {
      this.filterBy = false
      this.overLayFlag = false
    },
    setSalaryFilter (index) {
      this.salaryCheck = index
      this.closePop()
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
.cur{
  transform: rotate3d(1, 1, 1, 45deg);
  color: #0d86ff;
}

  /*幻灯片的样式*/
.el-carousel__item{
  display: block;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
.slide-container{
  margin: 20px 30px;
  text-align: center;
}
  /*职位列表*/
  /*职位名称*/
.job-name {
  float: left;
}
  .jobs-container{
    margin: 20px 100px;
  }
</style>
