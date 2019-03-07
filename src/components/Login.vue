<template>
  <div class="login-container">
    <ZPHeader></ZPHeader>
    <div class="login-content">
      <div class="login-title">登录</div>
      <div class="login-form login-box-inner">
        <form>
            <p>Sign in to continue</p>
            <div class="login-group">
              <label for="account">账号：</label><input type="text" v-model="loginInfoVo.phone" id="account" placeholder="请输入您注册的账号（手机号码）" name="phone" class="login-input"/>
            </div>
            <div class="login-group password-group" style="height: 69px;">
              <label>Password <a href="#" class="forgot-link">Forgot Password?</a></label>
              <input type="password" v-model="loginInfoVo.password" id="password" value="" placeholder="请输入密码" name="password" autocomplete="current-password" class="login-input"/>
            </div>
            <button class="login-btn login-btn" @click="login">
              Sign In
            </button>
            <div class="text-foot">
              Don't have an account? <a href="" class="register-link">Register</a>
            </div>
          </form>

        </form>
      </div>
    </div>
    <ZPFooter></ZPFooter>
  <!--<el-row type="flex" justify="center" class="login-container">-->
    <!--<el-col :span="12" :xs="24" :sm="12" :md="12">-->
      <!--<div class="login-content">-->
       <!---->
      <!--</div>-->
    <!--</el-col>-->
  <!--</el-row>-->
  </div>
</template>

<script>
import ZPHeader from './ZPHeader'
import ZPFooter from './ZPFooter'
export default {
  name: 'login',
  components: {ZPFooter, ZPHeader},
  data () {
    return {
      loginInfoVo: {
        phone: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    login () {
      this.$axios.post('/candidate/login', {
        phone: this.loginInfoVo.phone,
        password: this.loginInfoVo.password
      }).then(
        successResponse => {
          this.responseResult = JSON.stringify(successResponse.data)
          if (successResponse.data.code === 200) {
            // 当验证成功后跳转到用户中心
            this.$router.replace({path: '/usercenter'})
          }
        }
      )
    }
  }
}
</script>

<style scoped>
  .login-container{
    height: 100%;
    text-align: center;
    font-family: 'Segoe UI';
    font-size: 16px;
  }
  .login-content{
    height: 100%;
    position: relative;
    width: 360px;
    margin: 0 auto;
    background: aliceblue;
  }
.login-title{
  overflow: hidden;
  width: 100px;
  height: 100px;
  margin: 0 auto -50px auto;
  border-radius: 50%;
  -webkit-box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
  box-shadow: 0 4px 40px rgba(0, 0, 0, .07);
  padding: 10px;
  background-color: #fff;
  z-index: 1;
  position: relative;
}
  .login-form{
    width: 100%;
    position: absolute;
    left: 0;
  }

  .login-form:after{
    transform: translate(0, -92.6%) scale(.88);
    border-radius: 3px;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: -1;
    content: ' ';
  }
  .login-box-inner{
    background-color: #fff;
    -webkit-box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
    box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
    padding: 60px 25px 25px 25px;
    text-align: left;
    border-radius: 3px;
  }
</style>
