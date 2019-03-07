<template>
  <div>
    <ZPHeader></ZPHeader>
    <form>
      <label for="account">账号：</label><input type="text" v-model="loginInfoVo.phone" id="account" placeholder="请输入您注册的账号（手机号码）"/>
      <div>
        <label for="password">密码:</label><input type="password" v-model="loginInfoVo.password" id="password" value="" placeholder="请输入密码"/>
      </div>
      <button @click="login">登录</button>
      <button type="reset">取消</button>
    </form>
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
  .login-container {
    /*transition: property duration timing-function delay;*/
    /*transition-property: all;*/
    /*transition-timing-function: linear;*/
    /*transition-duration: 2s;*/
    /*transition-delay: 1000ms;*/
    background: #59a0ff;
  }
.login-content{
  width: 100%;
  height: 100%;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto;

  padding: 65px 55px 54px 55px;
}
</style>
