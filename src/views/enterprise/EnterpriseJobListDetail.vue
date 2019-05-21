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
              <el-button style="float: right; padding: 3px 0" type="text" @click="SendingResume(item.jName,item.eName)">投递简历</el-button>
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
        // console.log(this.enterpriseList)
      })
        .catch(function (error) {
          // console.log(error)
          alert(error)
        })
    },
    SendingResume(jName,eName){
      // console.log(jName,eName)
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      var loginCandidate = JSON.parse(localStorage.getItem('loginCandidate'))
      if (loginCandidatePhone === null || loginCandidatePhone === ""){
        this.$message.error("请先登录您的个人账号")
      }else{
        // console.log(loginCandidate)
        this.$confirm('确认将您的简历投递到该公司吗？', '提示', {}).then(() => {
          NProgress.start();
          // let para = Object.assign({}, this.addJobForm)
          // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
          // addUser(para).
          // console.log(this.addJobForm.jName)
          this.$axios.post('candidate/sendingResume', {

            jName:jName,
            eName: eName,
            phone: loginCandidatePhone,
            date: new Date().toLocaleDateString(),
            status: "已投递"
          })
            .then((result) => {
              NProgress.done();

              this.responseResult = JSON.stringify(result.data)
              this.loading = false
              // console.log(this.responseResult)
              if (result.data.code === 200) {
                this.$message({
                  message: '简历投递成功',
                  type: 'success'
                })
              } else {
                this.$message.error(result.data.message + '请重新投递')
              }

            })

        })
      }
    }
  },
  //  页面挂载时
  mounted () {
    this.getJobsList()
  }
}
</script>

<style scoped>

</style>
