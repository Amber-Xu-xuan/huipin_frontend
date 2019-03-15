<template>
  <div class="login-content">
    <ZPHeader></ZPHeader>
    <el-row type="flex" justify="center">
      <el-col :span="24" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <!--不显示必填输入框旁的星号=hide-required-asterisk-->
      <el-form class="login-form" show-message status-icon :model="loginInfoVo" :rules="rules" ref="loginInfoVo"
               hide-required-asterisk
               >
        <div class="font-style">登录</div>
        <!-- prop="phone"绑定校验规则-->
        <el-form-item label="账号：" prop="phone" lable-position="left" class="el-form-item">
          <el-input maxlength="12" type="text" v-model="loginInfoVo.phone" prefix-icon="el-icon-mobile-phone"
                    id="account"
                    placeholder="请输入您注册的账号（手机号码）"/>
        </el-form-item>
        <el-form-item label="密码:" prop="password" lable-position="left">
          <el-input type="password" prefix-icon="el-icon-edit-outline" v-model="loginInfoVo.password" id="password"
                    value="" placeholder="请输入密码" show-password="true"/>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button @click="login('loginInfoVo')" round type="primary">登录</el-button>
          <el-button @click="reset('loginInfoVo')" round type="primary">取消</el-button>
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
    name: 'login',
    components:{ZPHeader},
    data () {
      // 自定义的校验规则
      var checkCount = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'))
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          console.log(reg.test(value))
          if (reg.test(value)) {
            callback()
          } else {
            return callback(new Error('请输入正确的手机号'))
          }
        }
      }
      return {
        // model绑定的是表单数据对象
        loginInfoVo: {
          phone: '',
          password: ''
        },
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
    methods: {
      login () {
        this.$refs.loginInfoVo.validate((valid) => {
          if (valid) {
            // 验证成功后将数据转换成JSON格式传递到后端
            // alert('正在提交...')
            this.$message.info('正在加载中...')
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
            this.$router.push({
              name: 'Home',
              params: {
                username: this.loginForm.username
              }
            })
            // loginReq(this.loginInfoVo.phone, this.loginInfoVo.password)
          } else {
            //  验证失败
            console.log('验证失败,用户名或密码错误')
            this.$message.error('用户名或密码错误')
            return false
          }
        })
      },
      reset (loginInfoVo) {
        this.$refs[loginInfoVo].resetFields()
      }
      // register () {
      //   this.$router.push({path: '/register'})
      // }
    }
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

  .login-form {
    /*display: block;*/
    padding: 50px 20px;
    border-top: 10px solid #66b1ff;
    background: #FFF;
    /*margin: 0 auto;*/
    margin-top: 200px;
    /*margin-right: 100px;*/
    border-radius: 40px;
  }

</style>
