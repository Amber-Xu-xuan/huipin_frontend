<template>
  <div>
    <div>
      <el-row class="container">
        <el-col :span="24" class="header">
          <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
            {{collapsed?'':sysName}}
          </el-col>
          <el-col :span="10">
            <div class="tools" @click.prevent="collapse">
              <i class="fa fa-align-justify"></i>
            </div>
          </el-col>
          <el-col :span="4" class="admininfo">
            <el-dropdown trigger="hover">
                    <span class="el-dropdown-link admininfo-inner">
                      <!--显示头像-->
                      <img :src="this.sysAdminAvatar"/>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>管理员中心</el-dropdown-item>
                <el-dropdown-item>设置</el-dropdown-item>
                <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-col>

        <el-col :span="24" class="main">
          <aside>
            <el-menu  class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="collapsed" unique-opened router>
              <el-submenu index="candidate">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">应聘者</span>
                </template>
                <el-menu-item-group>
                  <!--<el-menu-item index="adminManageCandidateResume">管理应聘者简历信息</el-menu-item>-->
                  <!--<el-menu-item index="adminManageCandidateCount">管理应聘者</el-menu-item>-->
                  <el-menu-item index="/adminCenter/statisticsCandidate">统计应聘者数据</el-menu-item>
                </el-menu-item-group>

              </el-submenu>

              <el-submenu index="enterprise">
                <template slot="title">
                  <i class="el-icon-s-shop"></i>
                  <span slot="title">招聘企业管理</span>
                </template>
                <el-menu-item-group>
                  <!--<el-menu-item index="">管理应聘者信息</el-menu-item>-->
                  <el-menu-item index="/adminCenter/enterpriseCertification">企业审核认证</el-menu-item>
                  <el-menu-item index="/adminCenter/statisticsEnterprise">统计招聘企业数据</el-menu-item>
                </el-menu-item-group>

              </el-submenu>

              <el-menu-item index="editPassword">
                <i class="el-icon-menu"></i>
                <span slot="title">修改密码</span>
              </el-menu-item>
              <!--disabled-->
              <!--<el-menu-item index="">-->
                <!--<i class="el-icon-document"></i>-->
                <!--<span slot="title">修改手机号码</span>-->
              <!--</el-menu-item>-->
            </el-menu>
          </aside>
          <!--侧边栏-结束-->
          <section class="content-container">
            <div class="grid-content bg-purple-light">
              <el-col :span="24" class="breadcrumb-container">
                <strong class="title">{{$route.name}}</strong>
                <!--面包屑-->
                <el-breadcrumb separator="/" class="breadcrumb-inner">
                  <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                    {{ item.name }}
                  </el-breadcrumb-item>
                </el-breadcrumb>
                <!---->
              </el-col>
              <el-col :span="24" class="content-wrapper">
                <transition name="fade" mode="out-in">
                  <!--显示对应路由下的页面-->
                  <router-view></router-view>
                </transition>
              </el-col>
            </div>
          </section>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Admin',
  // components: {ZPHeader, ZPFooter},
  data () {
    return {
      sysName: '管理员中心',
      activeUrl: '1',
      collapsed: false,
      sysAdminName: '',
      sysAdminAvatar: '../static/avatar2.jpg',
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    },
    handleOpen () {
      //console.log('handleopen');
    },
    handleClose () {

    },
    handleclose () {
      //console.log('handleclose');
    },
    handleselect: function (a, b) {
    },
    //退出登录
    logout: function () {
      var _this = this
      this.$confirm('确认退出吗?', '提示', {
        //type: 'warning'
      }).then(() => {
        sessionStorage.removeItem('admin')
        _this.$router.push('/admin')
      }).catch(() => {

      })
    },
    //折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    showMenu (i, status) {
      this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
    }
  },
  mounted () {
    var admin = sessionStorage.getItem('admin')
    if (admin) {
      admin = JSON.parse(admin)
      // this.sysAdminName = admin.name || ''
      // this.sysAdminAvatar = admin.avatar || ''
      //  前端测试的时候的模拟数据
      this.sysAdminAvatar = '../static/avatar2.png'
    }
  }
}
</script>

<style scoped lang="scss">
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      /*background: rgb(28, 28, 28);*/
      background: -webkit-linear-gradient(#5c5b61, #292829); /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(#5c5b61, #292829); /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(#5c5b61, #292829); /* Firefox 3.6 - 15 */
      background: linear-gradient(#5c5b61, #292829); /* 标准的语法 */
      color: #fff;
      .admininfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .admininfo-inner {
          cursor: pointer;
          color: #fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
        //width:230px;
        height: 60px;
        font-size: 22px;
        padding-left: 20px;
        padding-right: 20px;
        border-right: 1px solid rgba(238, 241, 146, 0.3);
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color: #fff;
        }
      }
      .logo-width {
        width: 230px;
      }
      .logo-collapse-width {
        width: 65px;
      }
      .tools {
        padding: 0px 23px;
        width: 14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        flex: 0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        .el-menu {
          height: 100%;
        }
        .collapsed {
          width: 60px;
          .item {
            position: relative;
          }
          .submenu {
            position: absolute;
            top: 0px;
            left: 60px;
            z-index: 99999;
            height: auto;
            display: none;
          }

        }
      }
      .menu-collapsed {
        flex: 0 0 60px;
        width: 60px;
      }
      .menu-expanded {
        flex: 0 0 230px;
        width: 230px;
      }
      .content-container {
        // background: #f1f2f7;
        flex: 1;
        // position: absolute;
        // right: 0px;
        // top: 0px;
        // bottom: 0px;
        // left: 230px;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
          //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
  /*超链接样式*/
  a {
    text-decoration: none;
    font-size: 14px;
    color: #303133;
  }
</style>
