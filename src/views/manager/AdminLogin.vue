<template style="background: #3a4256; display: block;">
  <div class="login-content">
    <el-row type="flex" justify="center">
      <el-col :span="24" :xs="16" :sm="12" :md="12" :lg="12" :xl="12">
        <!--不显示必填输入框旁的星号=hide-required-asterisk-->
        <el-form class="login-form" show-message status-icon :model="loginInfoVo" :rules="rules" ref="loginInfoVo"
                 hide-required-asterisk
        >
          <div class="font-style">管理员登录</div>
          <!-- prop="phone"绑定校验规则-->
          <el-form-item label="账号：" prop="phone" lable-position="left" class="el-form-item">
            <el-input maxlength="12"
                      type="text"
                      v-model="loginInfoVo.phone"
                      prefix-icon="el-icon-mobile-phone"
                      name="phone"
                      id="account"
                      auto-complete="on"
                      placeholder="请输入您注册的账号（手机号码）"/>
          </el-form-item>
          <el-form-item
            label="密码:"
            prop="password"
            lable-position="left">
            <el-input
              :type="passwordType"
              prefix-icon="el-icon-edit-outline"
              v-model="loginInfoVo.password"
              id="password"
              name="password"
              show-password
              auto-complete="on"
              placeholder="请输入密码"
              @keyup.enter.native="login"/>
            <!--<span class="show-pwd" @click="showPwd">-->
            <!--<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />-->
            <!--</span>-->
          </el-form-item>

          <el-form-item class="login-btn">
            <el-button style="width:100%;margin-bottom:30px;background:#154f65;" :loading="loading" @click.native.prevent="login" round>登录</el-button>
            <!--<el-button @click="reset('loginInfoVo')" round type="primary">取消</el-button>-->

          </el-form-item>
          </el-form>

      </el-col>

    </el-row>

  </div>
</template>

<script>
// 引入接口
import ZPHeader from '@/components/ZPHeader'
export default {
  name: 'AdminLogin',
  components:{ZPHeader},
  data () {
    // 自定义的校验规则
    var checkCount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        // console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    return {
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      // model绑定的是表单数据对象
      loginInfoVo: {
        phone: '',
        password: ''
      },
      // 从后端返回的结果
      responseResult: [],
      //  表单校验规则
      rules: {
        phone: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {validator: checkCount, trigger: 'blur'},
          {min: 8, max: 11, message: '长度在8到11个数字', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  // 监听，当路由发生变化的时候执行
  // watch: {
  //   $route: {
  //     handler: function(route) {
  //       this.redirect = route.query && route.query.redirect
  //     },
  //     immediate: true
  //   }
  // },
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    // 是否显示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    login () {
      // 后端整合
      this.$refs.loginInfoVo.validate((valid) => {
        if (valid) {
          //     // 验证成功后将数据转换成JSON格式传递到后端
          //     // alert('正在提交...')
          this.loading = true
          this.$message.info('正在登录中...')
              this.$axios.post('/manager/login',{
                phone: this.loginInfoVo.phone,
                password: this.loginInfoVo.password
              }).then(
                successResponse => {
                  this.responseResult = JSON.stringify(successResponse.data)
                  this.loading = false
                  console.log( this.responseResult)
                  if (successResponse.data.code === 200) {
                    // 当验证成功后跳转
                    localStorage.setItem('loginAdminPhone',this.loginInfoVo.phone)
                    //将登陆信息保存
                    localStorage.setItem('loginAdmin',JSON.stringify(successResponse.data.data))
                    this.$router.replace({path: '/adminCenter'})
                    this.$message.success('成功登录！！')
                  }else{
                    this.$message.error(successResponse.data.message + '请重新输入')
                  }
                }
              ).catch(function (error) {
                console.log(error)
                // this.loading = false
              })

          // 前端测试时-mock数据
          // this.$router.push({
          //   path: '/enterprise_center',
          //   params: {
          //     phone: this.loginInfoVo.phone
          //   }
          // })
        } else {
          //  验证失败
          console.log('验证失败,用户名或密码错误')
          this.$message.error('用户名或密码错误')
          return false
        }
        this.loading = false
      })
    },
    reset (loginInfoVo) {
      this.$refs[loginInfoVo].resetFields()
    }
    // register () {
    //   this.$router.push({path: '/register'})
    // }
  },
}
</script>

<style scoped>

  .login-content {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-content: center;
    width: 100%;
    margin: 0 auto;
  }
  .login-content[data-v-5e7dea94] {
    width: 100%;
    height: 100%;
    background-image: url('/static/bg.jpg');

  }

  .login-form {
    /*display: block;*/
    padding: 50px 20px;
    border-top: 10px solid #154f65;
    background: #FFF;
    /*margin: 0 auto;*/
    margin-top: 50px;
    /*margin-right: 100px;*/
    border-radius: 40px;
  }
  .register-link{
    color: #ffffff;
    text-decoration: none;
    text-align: center;
    margin: 0 auto;
  }
  a:hover{
    color: #66b1ff;
  }

  /*显示密码图标*/
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;
    user-select: none;
  }
</style>
