<template>

  <div class="xxcenter-content">
    <el-row :gutter="5" class="enterprise-row-margin">
      <!--:offset="index > 0 ? 2 : 0"-->
      <el-col :span="12" v-for="(jobPosition, index) in jobPositionList" :key="jobPosition.index">
        <el-card>
          <!--<img :src="jobPosition.img" class="image">-->
          <div style="padding: 1px;" class="job-card">
            <div slot="header" class="clearfix">
            <div class="jName">{{jobPosition.jName}}</div>
            <span style="color: #fc703e;">{{jobPosition.salary}}</span>
            <span class="eName" style="text-decoration: none;color: #414a60;float: right">{{jobPosition.eName}}</span>
            </div>
            <div style="color: #9fa3b0; font-size: 12px;margin: 15px 5px;">
              <span>{{jobPosition.jType}}</span>
              <span style="float: right;">{{jobPosition.workAddress}}</span>
            </div>
            <div class="bottom clearfix">
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
//导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export default {
  name: 'DiliveryResumeEnterprise',
  mounted() {
    this.getDiliveryResumeJobPosition()
  },
  data(){
    return {
      jobPositionList: [
    ]
    }
  },
  methods: {
    getDiliveryResumeJobPosition(){
      this.listLoading = true
      // this.loginPhone =  this.$route.params.loginPhone
      NProgress.start();
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      this.$axios.post('candidate/getJobPositionByDiliveryResume',
        {
          phone: loginCandidatePhone
        }
      ).then((res) => {
        if (res.data.code === 200) {
          this.jobPositionList = res.data.data
          this.listLoading = false
        } else {
          this.$message.error(res.data.message + '请重新登录')
        }
        NProgress.done();
      })
    }
  }
}
</script>

<style scoped>
.jName{
  font-size: 16px;
  color: #00c2b3;
  font-weight: 400;
  max-width: 170px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
}
</style>
