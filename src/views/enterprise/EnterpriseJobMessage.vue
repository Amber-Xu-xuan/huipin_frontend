<template>
  <!--显示公司信息和招聘职位-->
  <div>
    <nav-header></nav-header>

    <!--显示公司简略信息-->
    <div class="enterprise-message-content">
      <!--头像-->
      <div class="clearfix"></div>
      <div class="enterprise-message">
        <img :src="this.enterpriseMessage.emheadImage" class="company-headImage"/>
        <span> <h1 class="emname">{{this.enterpriseMessage.emName}}</h1>
        <p>{{this.enterpriseMessage.emFinancing}}<em class="dolt"></em>{{this.enterpriseMessage.emScaleList}}
          <em class="dolt"></em>{{this.enterpriseMessage.businessScope}}</p>
       </span>
        <!--关于公司的评论小标签-->
        <!--<div class="tag-container">-->
        <!--<div class="tag-more" style="opacity: 1;">-->
        <!--<div class="tag-all job-tags" v-for="(item,index) in this.enterpriseMessage.commentList" :key="index"><span>哈哈哈哈哈{{item.commentContent}}</span>-->
        <!--</div>-->
        <!--</div>-->
        <!--</div>-->

      </div>


    </div>

    <div>
      <!--显示公司简略信息-->
      <!--菜单栏-开始-->
      <!--<el-menu-->
        <!--:default-active="activeIndex"-->
        <!--class="el-menu-demo"-->
        <!--mode="horizontal"-->
        <!--@select="handleSelect"-->
        <!--background-color="#545c64"-->
        <!--text-color="#fff"-->
        <!--router-->
        <!--active-text-color="#ffd04b">-->
        <!--&lt;!&ndash;<el-menu-item index="/enterprise/introduce" :class="{'isActive': !active}">公司简介</el-menu-item>&ndash;&gt;-->
        <!--<el-menu-item index="/enterprise/jobmessage" :class="{'isActive': !active}">招聘职位</el-menu-item>-->
      <!--</el-menu>-->

      <!--菜单栏结束-->
    </div>
    <router-view class="view"></router-view>


  </div>
</template>

<script>
import NavHeader from '@/components/ZPHeader'

export default {
  name: 'EnterpriseMessage',
  components: {
    NavHeader
  },
  data () {
    return {
      JobList: [],
      // 默认选中“公司简介”页面
      activeIndex: '/enterprise/introduce',
      //薪资字体绑定的样式
      salaryFont: 'salary-font',
      eName:'',
      active: true,
      enterpriseMessage: {}
    }
  },
  methods: {
    // getJobsList () {
      // this.$axios.get('candidate/enterprise_job').then((result) => {
      //   var res = result.data
      //   this.JobList = res.data
      //   console.log(this.JobList)
      // })
      //   .catch(function (error) {
      //     console.log(error)
      //   })
    // },
    getEnterpriseMessage () {
      this.eName = this.$route.query.eName
      // console.log("company::" + this.eName)
      this.$axios.get('/getEnterpriseByEName', {
        params:{
          eName: this.eName
        }
        }
      ).then((result) => {
        var res = result.data
        this.enterpriseMessage = res.data[0]
        // console.log(this.enterpriseMessage)
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  },
//  页面挂载时
  mounted () {
    // this.getJobsList()
    this.getEnterpriseMessage()
  }
}
</script>

<style scoped>
  .job-container {
    margin-left: 100px;
    margin-top: 60px;
  }

  .clearfix {
    clear: both;
  }

  /*将工资范围文字显示成红色*/
  .salary-font {
    margin-left: 10px;
    color: #f00;
  }

  .emname {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
  }

  /*菜单栏左侧设置padding*/
  .el-menu-demo {
    padding-left: 100px;
  }

  /*子路由的视图的margin*/
  .view {
    margin: 10px 100px;
  }

  /*公司信息缩略图*/
  .enterprise-message-content {
    margin: 0;
    /*display: block;*/
    /*height: 200px;*/
    background: #444c5f;
  }

  .enterprise-tip h1 {
    background: #444c5f;
    padding: 0;
    margin: 0;

  }

  .enterprise-message {
    display: flex;
    flex-wrap: wrap;
    max-width: 700px;
    margin: 0 100px;
  }

  .enterprise-message img {
    width: 103px;
    height: 103px;
    border-radius: 13px;
    margin-left: 100px;
    margin-right: 25px;
    float: left;
  }

  .enterprise-message:after {
    content: '';
    display: block;
    overflow: hidden;
    visibility: hidden;
    clear: both;
  }

  /*.enterprise-message-detaile{*/
  /*display: inline-flex;*/
  /*flex-wrap: wrap;*/
  /*max-width: 700px;*/
  /*margin :0 100px;*/
  /*}*/

  /*公司缩略信息*/

  /*间隔信息的点*/
  .dolt {
    display: inline-block;
    vertical-align: middle;
    width: 2px;
    height: 2px;
    margin: 0 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, .7);
  }

  p {
    line-height: 20px;
    color: rgba(255, 255, 255, .7);
    /*margin-bottom: 15px;*/
    padding: 0;
    margin: 0;
  }

  .tag-container .job-tags, .detail-box .job-tags, .tag-container .job-tags {
    display: inline-block;
    height: 36px;
    overflow: hidden;
  }

  .tag-container {
    margin-top: 20px;
    margin-left: 100px;
  }

  /*公司标签*/
  .job-tags span, .tag-container .tag-more .link-more {
    display: inline-block;
    padding: 0 12px;
    margin-right: 15px;
    margin-bottom: 10px;
    border: 1px solid #9bceeb;
    color: #9bceeb;
    height: 23px;
    line-height: 23px;
    border-radius: 13px;
    margin-top: 0;
  }
  /*公司头像*/
  .company-headImage{
    margin: 20px 10px;
  }
</style>
