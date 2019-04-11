<template>
  <div class="landing-page">
    <ZPHeader></ZPHeader>
    <div class="main">
      <div class="container">
        <div class="zoom-title">
          <span></span>
        </div>
        <div class="slider-box">
          <form class="sem-search"><input name="" class="ipt-search" placeholder="搜索“职位”填写一份简历，涨薪59%">
            <button class="landing-btn" type="submit">搜索职位</button>
          </form>

        </div>

        <div class="register-box">
          <div class="sign-wrap">

            <!--注册-->
            <div class="sign-form sign-register" style="display:block;">
              <h3 class="title">一键注册</h3>
              <div class="tip-error"></div>
              <!--<form action="/registe/save.json" method="post" label-width="80px">-->
              <el-form ref="registerForm" :model="registerForm">
                <input type="hidden" name="pk" value="cpc_sem">
                <input type="hidden" name="act" value="0">
                <input type="hidden" name="purpose" value="0">
                <!--手机登录输入框-->

                <el-form-item
                  prop="rphone"
                >
                  <el-input placeholder="请输入手机号码" v-model="registerForm.rphone" class="input-with-select">
                    <el-select v-model="registerForm.selectPhonePrefix" slot="prepend" placeholder="请选择"
                               style="width: 100px">
                      <el-option label="+86" value="+86"></el-option>
                      <el-option label="+1" value="+1"></el-option>
                      <el-option label="+852" value="+852"></el-option>
                      <el-option label="+81" value="+81"></el-option>
                      <el-option label="+886" value="+886"></el-option>
                      <el-option label="+44" value="+44"></el-option>
                    </el-select>
                    <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
                  </el-input>
                </el-form-item>
                <!--密码输入框-->
                <el-form-item
                  prop="rpassword"
                >
                  <el-input
                    :type="passwordType"
                    prefix-icon="el-icon-edit-outline"
                    v-model="registerForm.rpassword"
                    id="rpassword"
                    name="rpassword"
                    show-password
                    auto-complete="on"
                    placeholder="请输入密码"
                    @keyup.enter.native="register"/>

                </el-form-item>
                <div class="landing-register-btn">
                  <el-button type="primary" @click="register()">注册</el-button>
                </div>


                <div class="agreement-tip">
                  <label>
                    <el-checkbox v-model="registerForm.checked">同意</el-checkbox>
                    <router-link to="/protocol">用户协议及隐私政策</router-link>
                    <div>
                      已有账号
                      <el-button type="text" @click="centerDialogVisible = true">直接登录</el-button>
                    </div>
                  </label>
                </div>
                <!--登录-弹出框-->
                <el-dialog
                  title="登录"
                  :visible.sync="centerDialogVisible"
                  width="40%"
                  center>

                  <el-row type="flex" justify="center">
                    <el-col :span="20" :xs="20" :sm="20" :md="12" :lg="12" :xl="12">
                      <!--不显示必填输入框旁的星号=hide-required-asterisk-->
                      <el-form class="login-form" show-message status-icon :model="loginInfoVo" :rules="rules"
                               ref="loginInfoVo"
                               hide-required-asterisk
                      >
                        <!-- prop="phone"绑定校验规则-->
                        <el-form-item prop="phone" class="el-form-item">
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
                          prop="cpassword"
                        >
                          <el-input
                            :type="passwordType"
                            prefix-icon="el-icon-edit-outline"
                            v-model="loginInfoVo.cpassword"
                            id="password"
                            name="password"
                            show-password
                            auto-complete="on"
                            placeholder="请输入密码"
                            @keyup.enter.native="login"/>

                        </el-form-item>

                        <el-form-item class="login-btn">

                        </el-form-item>
                      </el-form>

                    </el-col>

                  </el-row>


                  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click.native.prevent="login">登录</el-button>
                    <!--centerDialogVisible = false-->
  </span>
                </el-dialog>

              </el-form>
              <div class="btn-switch ewm-switch"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ZPHeader from './ZPHeader'

export default {
  name: 'LandingPage',
  components: {ZPHeader},
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
      phone: '',

      centerDialogVisible: false,
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      // model绑定的是表单数据对象
      loginInfoVo: {
        phone: '',
        cpassword: ''
      },
      registerForm: {
        rphone: '',
        rpassword: '',
        selectPhonePrefix: '',
        checked: ''
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
        cpassword: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    // 是否显示密码
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    login () {
      this.$refs.loginInfoVo.validate((valid) => {
        if (valid) {
          // 验证成功后将数据转换成JSON格式传递到后端
          // alert('正在提交...')
          this.loading = true
          this.$message.info('正在登录中...')
          //  /candidate 后端api：/candidate/login
          this.$axios.post('/candidate/login',
           {
            phone: this.loginInfoVo.phone,
            password: this.loginInfoVo.cpassword
          }, {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(
            successResponse => {
              this.responseResult = JSON.stringify(successResponse.data)
              this.loading = false
              console.log(this.responseResult)
              if (successResponse.data.code === 200) {
                // 当验证成功后跳转到用户中心
                this.$router.replace({path: '/usercenter'})
                this.$message.success('成功登录！！')
              } else {
                this.$message.error(successResponse.data.message + '请重新输入')
              }
            }
          ).catch(function (error) {
              console.log(error)
              // this.loading = false
            }
          )
          //前端测试
          // this.$router.push({
          //   path: 'usercenter',
          //   // params: {
          //   //   phone: this.loginloginInfoVoForm.phone
          //   // }
          // })
          // loginReq(this.loginInfoVo.phone, this.loginInfoVo.password)
        } else {
          //  验证失败
          console.log('验证失败,用户名或密码错误')
          this.$message.error('用户名或密码错误')
          return false
        }
        this.loading = false
      })
    },
    //  注册
    register (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!需迭代')
        } else if (this.registerForm.checked) {
          this.$message.error('请先阅读')
        } else {
          this.$message.error('注册失败，请重新检查您输入的信息')
          return false
        }
      })
    },
  }
}
</script>

<style scoped>
  .main {
    position: relative;
    background-image: -webkit-linear-gradient(top, #3e72d2 0, #77bdd1 100%);
    background-image: linear-gradient(top, #3e72d2 0, #77bdd1 100%);
    width: 100%;
    height: 668px;
    background-size: cover;
    /*overflow: hidden;*/
  }

  .container {
    width: 1000px;
    height: 620px;
    /*margin: 48px auto 0;*/
    margin: 0 auto;
  }

  /*应用的标语*/
  .zoom-title {
    width: 264px;
    height: 42px;
  }

  /*轮播幻灯片+搜索输入框*/
  .slider-box {
    float: left;
  }

  /*轮播图下的搜索输入框表单*/
  .slider-box .sem-search {
    height: 40px;
    padding: 2px;
    background-color: #53cac3;
    font-size: 0;
  }

  /*输入框*/
  .slider-box .sem-search .ipt-search {
    display: inline-block;
    width: 452px;
    height: 40px;
    border: none;
    padding-left: 19px;
    line-height: 40px;
    font-size: 15px;
    vertical-align: middle;
  }

  /*搜索按钮*/
  .slider-box .landing-btn {
    display: inline-block;
    width: 96px;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
    text-align: center;
    vertical-align: middle;
  }

  .landing-btn {
    display: block;
    border: none;
    background-color: #0cc1ca;
    color: #fff;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  .landing-btn button {
    /*消除button的默认样式 */
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    /*自定义边框 */
    outline: none;
    /*消除默认点击蓝色边框效果*/
  }

  /*将列表元素的样式设置为none*/
  li, ol, ul {
    list-style: none;
  }

  .landing-content .job-item {
    float: left;
    margin: 0 6px 6px 0;
    background-color: #fff;
    font-size: 14px;
    color: #3a4256;
    opacity: .8;
  }

  /*注册面板*/
  .register-box {
    width: 400px;
    height: 426px;
    float: right;
  }

  .sign-wrap {
    position: static;
    width: 410px;
    margin: 0;
  }

  .sign-form {
    border-radius: 0;
    width: 324px;
    height: 383px;
    padding: 35px 43px 0;
    display: block;
  }

  .sign-form {
    position: relative;
    width: 324px;
    padding: 35px 43px 0;
    background: #fff;
    border-radius: 8px;
    box-shadow: 1px 2px 15px rgba(0, 0, 0, .3);
    display: none;
  }

  /*注册框的标题*/
  .title {
    font-weight: 400;
    font-size: 26px;
    line-height: 32px;
    color: #5dd5c8;
    position: relative;
    text-align: center;
  }

  /*显示错误信息*/
  .tip-error {
    margin-bottom: -35px;
  }

  .sign-form .tip-error {
    text-align: center;
    color: #fc6c38;
    height: 29px;
    line-height: 18px;
    padding-top: 7px;
  }

  /*登录框的表单的边距*/
  .sign-form form {
    padding-top: 5px;
  }

  .sign-register form {
    padding-top: 0;
  }

  .sign-form form {
    padding-top: 22px;
  }

  /*手机号码输入框中的下拉框*/
  .el-select .el-input {
    width: 130px;
  }

  .sign-form .dropdown-select .text-select {
    display: inline-block;
    font-style: normal;
    cursor: pointer;
    width: 37px;
    padding: 7px 25px 7px 0;
    border: 0;
    text-align: right;
  }

  a {
    text-decoration: none;
  }

  /*注册按钮*/
  .landing-register-btn {
    text-align: center;
    margin: auto 0;
    margin-top: 20px;
  }

  /*同意协议checkbox*/
  .el-checkbox {
    margin: 0;
  }

  /*将注册框内的同意协议和直接登录文本设置居中*/
  .agreement-tip {
    text-align: center;
    margin-top: 10px;
  }
</style>
