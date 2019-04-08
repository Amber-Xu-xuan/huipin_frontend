/**
* @author amberXu
* @date 2019/2/21
* @Description: 职位列表页面
*/
<template>
  <div>
    <nav-header></nav-header>
    <div class="jobs-container">
      <!--头部幻灯片-->
      <!--<section></section>   -->
      <div class="slide-container">
        <el-carousel autoplay indicator-position="outside" :interval="5000" arrow="hover" class="slide-content" :height="imgHeight">
          <el-carousel-item v-for="(item,index) in itemImg" :key="index" name="index"  ref="imgHeight">
            <el-row>
              <el-col :span="24">
                <img :src="item.img" class="banner"/>
              </el-col>
            </el-row>

          </el-carousel-item>
        </el-carousel>
      </div>
      <!--头部幻灯片-结束-->
      <!--筛选条件-->
      <div class="filter-container" id="filter" v-bind:class="{'filterBy-show':filterBy}">
        <!--<dl class="filter-salary"></dl>-->
        <!--<dt>薪资待遇：</dt>-->
        <!--<dd><a href="javascript:void(0)" v-bind:class="{'cur':salaryCheck == 'all'}">All</a>-->
        <!--</dd>-->
        <!--<dd v-for="(salary,index) in filterCondition" :key="salary.startSalary">-->
        <!--<a href="javascript:void(0)" @click="setSalaryFilter(index)" v-bind:class="{'cur':salaryCheck==index}">{{salary.startSalary}}-{{salary.endSalary}}</a>-->
        <!--</dd>-->
        <span class="filter-select">已选中:</span>
        <span v-for='(item,index) in condition' class='active'>{{item.name}}|</span>
        <!--<div class='nav' v-for='(items,index) in category'>-->
          <!--<div class='mutil-query-title' v-if='items.name' :key="items.id">{{items.name}}-->
            <!--<span style='margin-left: 20px;' @click='allIn(index)'>全选</span>|<span @click='removeFilter(index)'>清空</span></div>-->
          <!--<ol v-if='items.items.length'>-->
            <!--<li v-for='(item,key) in items.items'>-->
              <!--&lt;!&ndash;<span :class="{'active':item.active}" @click='handle(index,key)' :key='item.id'>{{item.name}}</span>&ndash;&gt;-->
            <!--</li>-->
          <!--</ol>-->
        <!--</div>-->

        <el-select v-model="filterSalary" filterable placeholder="薪资要求" class="filter">
          <el-option
            v-for="(salary,index) in filterCondition.salaryList"
            :key="index"
            :label="salary.salary"
            :value="salary.salary">
          </el-option>
        </el-select>

        <el-select v-model="filterExperience" filterable placeholder="工作经验"  class="filter">
          <el-option
            v-for="(experience,index) in filterCondition.experienceList"
            :key="index"
            :value="experience.experience">
          </el-option>
        </el-select>

        <el-select v-model="filterEducation" filterable placeholder="学历要求"  class="filter">
          <el-option
            v-for="(education,index) in filterCondition.educationList"
            :key="index"
            :value="education.education">
          </el-option>
        </el-select>

        <el-select v-model="filterFinancing" filterable placeholder="融资情况"  class="filter">
          <el-option
            v-for="(financing,index) in filterCondition.financingList"
            :key="index"
            :value="financing.financing">
          </el-option>
        </el-select>

        <el-select v-model="filterCompanyScale" filterable placeholder="公司规模"  class="filter">
          <el-option
            v-for="(companyScale,index) in filterCondition.companyScaleList"
            :key="index"
            :value="companyScale.companyScale">
          </el-option>
        </el-select>

        <span><el-button type="primary" plain @click.prevent="removeFilter">搜索</el-button></span>
        <span><el-button type="primary" plain @click.prevent="removeFilter">清空</el-button></span>

      </div>
      <!--筛选条件-结束-->
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

      <!--显示职位的卡片-->
      <div>
        <el-row class="jobs-content">
          <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="6" v-for="item in jobsList" :key="item.jId">
            <div class="grid-content">
              <el-card class="box-card" shadow="hover" body-style="margin:'30px'">
                <div slot="header" class="clearfix">
                  <span class="jName">{{item.jName}}</span>
                  <span class="salary">{{item.salary}}</span>
                  <span class="card-text-margin">
                    <a
                      v-bind:href="href"
                      v-bind:class="{ active: isActive }"
                      v-on:click="go(item.emname)"
                    > {{item.emname}}</a>
                  </span>
                  <el-button style="float: right; padding: 3px 0" type="text">投递简历</el-button>
                </div>
                <div class="card-text item">
                  {{item.jarea}}|{{item.education}}|{{item.experienceDuration}} <span class="card-text-margin">{{item.businessScope}}|{{item.enterpriceStatus}}|{{item.emnum}}</span>
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
      //幻灯片轮播图
      imgHeight: '480px',
      itemImg: [
        {
          img:"../static/slides/slide-1.jpg"
        },
        {
          img:"../static/slides/slide-2.jpg"
        },
        {
          img:"../static/slides/slide-3.jpg"
        },
        {
          img:"../static/slides/slide-4.jpg"
        }
      ],
      filterCondition:
        {
          salaryList: [
            {
              salary: '不限'
            },
            {
              salary: '1k-3k'
            },
            {
              salary: '3k-5k'
            },
            {
              salary: '5k-8k'
            },
            {
              salary: '8k-10k'
            },
            {
              salary: '>10k'
            }
            ],
          experienceList : [
            {
              experience: '不限'
            },
            {
              experience: '应届生'
            },
            {
              experience: '1年以内'
            },
            {
              experience: '1-3年'
            },
            {
              experience: '3-5年'
            },
            {
              experience: '5-10年'
            },
            {
              experience: '10年以上'
            }
          ],
          educationList : [
            {
              education: '不限'
            },
            {
              education: '初中及以下'
            },
            {
              education: '中专/中技'
            },
            {
              education: '高中'
            },
            {
              education: '大专'
            },
            {
              education: '本科'
            },
            {
              education: '硕士'
            },
            {
              education: '博士'
            }
          ],
          financingList : [
            {
              financing: '不限'
            },
            {
              financing: '未融资'
            },
            {
              financing: '天使轮'
            },
            {
              financing: 'A轮'
            },
            {
              financing: 'A轮'
            },
            {
              financing: 'C轮'
            },
            {
              financing: 'D轮及以上'
            },
            {
              financing: '已上市'
            },
            {
              financing: '不需要融资'
            }
          ],
          companyScaleList: [
            {
              companyScale: '不限'
            },
            {
              companyScale: '0-20人'
            },
            {
              companyScale: '20-99人'
            },
            {
              companyScale: '100-499人'
            },
            {
              companyScale: '500-999人'
            },
            {
              companyScale: '500-999人'
            },
            {
              companyScale: '1000-9999人'
            },
            {
              companyScale: '10000人以上'
            }
          ]
        },
      salaryCheck: 'all',
      filterBy: false,
      overLayFlag: false,
      //是否激活对应路由
      isActive: '',
      href: '', //对应路由
      // 过滤条件
      filterSalary: '',
      filterExperience: '',
      filterEducation: '',
      filterFinancing: '', // 融资情况
      filterCompanyScale: '', // 公司规模
      condition: [], //  已选中的条件
      category: [
        {
          name: '地区',
          active: false
        },
        {
          name: '工作经验',
          active: false
        }
      ]
    }
  },
  methods: {
    jump () {
      this.$router.push('/detail?jobId=22')
    },
    getJobsList () {
      this.$axios.get('candidate/enterprise_job').then((result) => {
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
    },
    go(emname) {
      alert(emname)
      // 跳转到对应的公司详情页面
      this.$router.push({
        path: '/enterprise/jobmessage',
        params: {
          enname: emname
        }
      })
    },
    // 全选
    allIn(index){

    },
  //  清空
    removeFilter() {
      this.filterSalary = null
      this.filterExperience = null
      this.filterEducation = null
      this.filterFinancing = null
      this.filterCompanyScale = null
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
  .jobs-container {
    min-width: 1000px;
    margin: 20px 100px;
  }

  a {
    text-decoration: none;
    color: #3c3c3c;
  }

  /*幻灯片的样式*/
  .el-carousel__item {
    display: block;
  }

  .slide-content img{
    height-width: 100%;
    width: 80%;
  }


  .slide-container {
    margin: 20px 30px;
    text-align: center;
  }

  /*筛选条件的样式*/
  .filter-container {
    background: #fff;
    margin: 10px 0;
    padding: 20px;
  }
  .filter-container .filter-select{
    margin: 10px;
  }
  /*多选框*/
  .filter{
    width: 8rem;
  }

  /*职位列表*/
  /*职位名称*/
  .job-name {
    float: left;
  }
  /*筛选条件之间的margin等格式的调整*/
  .el-select{
    margin-right: 10px;
  }
  /*筛选条件的content中的按钮的格式*/
  .el-button--primary.is-plain {
    margin-right: 5px;
  }

  /*职位信息和公司信息之间的margin*/
  .card-text-margin {
    margin-left: 2.5rem;
  }

  .card-text {
    font-size: 10px;
    color: #b7b3c3;
  }

  .salary {
    color: #ff2126;
  }
</style>
