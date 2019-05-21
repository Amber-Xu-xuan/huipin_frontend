<template>
  <!--求职者收藏过的企业-->
  <!--在企业表中添加一个收藏数字段，当有用户点击收藏时，将企业表的一个主键记录到收藏表中，并将企业表中的收藏数字段+1
  比较企业之前的收藏数，选出前五个企业为热门企业-->
  <div class="xxcenter-content">
    <el-row :gutter="12" class="enterprise-row-margin">
      <!--:offset="index > 0 ? 2 : 0"-->
      <el-col :span="12" v-for="(jobPosition, index) in jobPositionList" :key="jobPosition.index">
        <el-card style="margin: 10px;">
          <!--<img :src="jobPosition.img" class="image">-->
          <div style="padding: 1px;" class="job-card">
            <div slot="header" class="clearfix">
              <div class="jName">{{jobPosition.jName}}</div>
              <span style="color: #fc703e;">{{jobPosition.salary}}</span>
              <span class="eName" style="text-decoration: none;color: #414a60;float: right">{{jobPosition.eName}}
              </span>
            </div>
            <div style="color: #9fa3b0; font-size: 12px;margin: 15px 5px;">
              <span>{{jobPosition.jType}}</span>
              <span style="float: right;">{{jobPosition.workAddress}}</span>
            </div>
            <span @click="CancelCollectJob(jobPosition.jpId, jobPosition.jName, jobPosition.eName)"
                  style="float: right;cursor: pointer;">
                    <el-icon class="el-icon-star-off" style="color: #ffc107"></el-icon>
              <span style="font-size: 10px;color: #5c5b61;">取消收藏</span>
              </span>
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
  name: 'CollectEnterprise',
  mounted () {
    this.getCollectJobPositionByPhone()
  },
  data () {
    return {
      jobPositionList: []
    }
  },
  methods: {
    CancelCollectJob(jpId, jName, eName) {
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      this.$confirm('确认取消收藏该公司吗？', '提示', {}).then(() => {
        NProgress.start()
        this.$axios.post('/candidate/deleteCollection', {
          cphone: loginCandidatePhone,
          jpId: jpId,
          jName: jName,
          eName: eName
        }).then((res) => {
          this.editLoading = false
          NProgress.done()

          if (res.data.code === 200) {
            this.$message({
              message: '成功取消收藏',
              type: 'success'
            })
            this.getCollectJobPositionByPhone()
          } else {
            this.$message.error(res.data.message)
          }
        }).catch((error) => {
          alert(error)
        })
      })
    },
    getCollectJobPositionByPhone () {
      this.listLoading = true
      NProgress.start()
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      this.$axios.post('candidate/getCollectJobPositionByPhone',
        {
          cphone: loginCandidatePhone
        }
      ).then((res) => {
        if (res.data.code === 200) {
          this.jobPositionList = res.data.data
          this.listLoading = false
        } else {
          this.$message.error(res.data.message + '请重新登录')
        }
        NProgress.done()
      })
    }
  }
}
</script>

<style scoped>
  .jName {
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

