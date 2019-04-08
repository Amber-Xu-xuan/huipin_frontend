<template>
  <!--显示职位的卡片-->
  <div class="job-container">
    <el-row class="enterprise-content">
      <el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="13" v-for="item in enterpriseList" :key="item.jId">
        <div class="grid-content bg-purple">
          <el-card class="box-card" shadow="hover" body-style="margin:'30px'">
            <div slot="header" class="clearfix">
              <span class="jName">{{item.jName}}</span>
              <span class="salary" :class="salaryFont">{{item.salary}}</span>
              <!--<span class="card-text-margin">{{item.emname}}</span>-->
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
</template>

<script>
export default {
  name: 'EnterpriseJobListDetail',
  data () {
    return {
      enterpriseList: [],
      // 默认选中“公司简介”页面
      activeIndex: '/enterprise/introduce',
      //薪资字体绑定的样式
      salaryFont: 'salary-font',
      active: true,
      enterpriseMessageList: {}
    }
  },
  methods: {
    getJobsList () {
      this.$axios.get('candidate/enterprise_job').then((result) => {
        var res = result.data
        this.enterpriseList = res.data
        console.log(this.enterpriseList)
      })
        .catch(function (error) {
          console.log(error)
        })
    },
  },
  //  页面挂载时
  mounted () {
    this.getJobsList()
  }
}
</script>

<style scoped>

</style>
