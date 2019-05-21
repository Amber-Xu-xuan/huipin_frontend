<template>
    <div class="header-container header-font">
      <!--<div class="header-font">Zoom</div>-->
        <div class="inner">
          <h1 class="logo"><span>汇聘</span></h1>
          <div class="nav">
          <ul>
            <li class="cur"><a href="/jobslist">首页</a></li>
            <li class=""><a href="/jobslist">求职</a></li>
            <!--https://www.zhipin.com/
            https://www.zhipin.com/job_detail/
            https://news.zhipin.com/-->
          </ul>
        </div>
          <div class="user-nav">
                <el-dropdown trigger="click" v-if="this.showLoginInfo === 1" >
                    <span class="el-dropdown-link header-login">
                      <!--显示头像-->
                      登录
              </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item><a  href="/login">招聘者登录</a></el-dropdown-item>
                    <el-dropdown-item><a  href="/landing">求职者登录</a></el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
            <!--个人用户登录-->
            <el-dropdown trigger="click" v-else-if="this.showLoginInfo === 2">
                    <span class="el-dropdown-link header-login label-text">
                      <!--显示头像-->
                      {{this.loginCandidate.cusername}} 欢迎您
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a  href="/CandidateCenter">个人中心</a></el-dropdown-item>
                <el-dropdown-item><a  href="www.baidu.com">帮助</a></el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!--企业用户-->
            <el-dropdown trigger="click" v-else>
                    <span class="el-dropdown-link header-login label-text">
                      <!--显示头像-->
                      {{this.loginEnterprise.eName}} 欢迎贵公司
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><a  href="/EnterpriseCenter">企业中心</a></el-dropdown-item>
                <el-dropdown-item><a  href="www.baidu.com">帮助</a></el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      <!--<span class="header-right">返回</span>-->
    </div>
</template>

<script>
export default {
  name: 'ZPHeader',
  data(){
    return{
      showLoginInfo: 1, // 1:未登录 2：个人用户已登录 3. 企业用户已登录
      loginCandidate: { cusername: ''},
      loginEnterprise: {}
    }
  },
  methods: {
    logout() {
      var _this = this

      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      }).then(() => {
        // sessionStorage.removeItem('user')
        localStorage.clear()
        this.isLogin()
      }).catch((error) => {
        alert(error)
      })
    },
  //  判断是否登录状态
    isLogin() {
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      var loginCandidate = JSON.parse(localStorage.getItem('loginCandidate'))

      var loginEnterprisePhone = localStorage.getItem('loginEnterprisePhone')
      var loginEnterprise = JSON.parse(localStorage.getItem('loginEnterprise'))

      if (loginCandidate !== null && loginCandidate !== "") {
        this.loginCandidate = loginCandidate
        this.showLoginInfo = 2
      }else if (loginEnterprise !== null && loginEnterprise !== "") {
        this.loginEnterprise = loginEnterprise
        this.showLoginInfo = 3

      }else{
        this.showLoginInfo = 1
      }
    }
  },
  mounted() {
    this.isLogin()
  }
}
</script>
<style scoped>
.header-container{
  width: 100%;
  /*background-color: #FFF;*/

  margin: 0 auto;
  font-size: 15px;
  height: 2.5rem;
  box-shadow: 0 2px 5px #9bceeb;

  background: #202329;
  /*box-shadow: 0 1px 8px rgba(0,0,0,.06);*/
  position: relative;
  z-index: 1005;

}
.inner {
  max-width: 1170px;
  margin: 0 auto;
  width: 1000px;
}
  /*logo*/
.logo {
  float: left;
  margin: 0 2rem;
}
/*头部的超链接*/
.header-container a {
  color: #fff;
}
.header-container a:hover {
  color: #9bceeb;
}
.nav li a:hover, .user-nav li a:hover {
  color: #9bceeb;
}
.logo a {
  display: block;
  width: 110px;
  height: 36px;
  background-size: 105px 19px;
}
a {
  text-decoration: none;
  color: #414a60;
}


  /*nav*/
.nav{
  font-size: 0;
  float: left;
  margin-left: 15px;
  height: 49px;
  line-height: 49px;
}
  .header-font{
    color: #9bceeb;
    font-weight: 900;
    font-size: 18px;
    padding: 10px;
    /*font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;;*/
    font-family: "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
  }
  /*当元素被选中时*/
::selection {
  color: #fff;
  background: #00d7c6;
}
li, ol, ul {
  list-style: none;
}
.nav li, .user-nav li {
  display: inline-block;
  vertical-align: center;
  text-align: center;
  font-size: 14px;
  margin: 0 7px;
}
/*显示用户跳转链接*/
.user-nav {
  font-size: 0;
  float: right;
  margin-right: 15px;
  line-height: 60px;
}
/*用户信息*/
.header-login {
  cursor: pointer;
  color: #fff;
}
  /*用户名字*/
.label-text {
  overflow: hidden;
  text-overflow: ellipsis;
  vertical-align: middle;
  max-width: 130px;
  font-size: 12px;
  color: #8fbceb;
}
</style>
