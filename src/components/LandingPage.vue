<template>
  <div class="landing-page">
    <ZPHeader></ZPHeader>
    <div class="main">
      <div class="container">
        <div class="zoom-title">
          <span></span>
        </div>
        <h2 style="color: #fff;margin: 0;">热门职位</h2>
        <div class="slider-box">
          <!--<form class="sem-search"><input name="" class="ipt-search" placeholder="搜索“职位”填写一份简历，涨薪59%">-->
          <!--<button class="landing-btn" type="submit">搜索职位</button>-->
          <!--</form>-->
          <el-row :gutter="5" class="enterprise-row-margin">
            <!--:offset="index > 0 ? 2 : 0"-->
            <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12" v-for="item in hotJobPosition" :key="item.jId">
              <div class="grid-content">
                <el-card class="box-card" shadow="hover" body-style="margin:'10px'">
                  <img :src="img" class="image" style="width: 80%;">

                  <div class="card-text item">
                    <div slot="header" class="clearfix">
                      <span class="jName" style="margin-left: 10px;">{{item.jName}}</span>
                      <span class="salary" style=" color: #ff2126; font-size: 10px;">{{item.salary}}</span>
                      <span class="card-text-margin">
                    <router-link
                      :to="{path:'enterprise/introduce',query:{eName:item.eName}}" style="width: 20px; text-overflow: ellipsis"
                    > {{item.eName}}</router-link>
                  </span>

                    </div>
                    <!--{{item.workAddress.substring(0,2)}}<span class="space"></span>-->
                    <!--|<span class="space"></span>{{item.education}}<span class="space"></span>-->
                    <!--|<span class="space"></span>{{item.experienceDuration}}-->
                    <!--<span class="card-text-margin"><span class="space"></span>-->
                    <!--<span class="space"></span>{{item.enterpriseMessage.emFinancing}}<span class="space"></span>-->
                    <!--|<span class="space"></span>{{item.enterpriseMessage.emScaleList}}</span>-->
                  </div>
                </el-card>
              </div>
            </el-col>
                <!--<img :src="enterprise.img" class="image">-->
                <!--<div style="padding: 1px;">-->

                <!--</div>-->

          </el-row>
          <!--显示职位的卡片-->

        </div>
        <!--<div class="clearfix"></div>-->
        <div class="login-container">

          <div class="sign-wrap">

            <!--登录-->
            <div class="sign-form sign-register" style="display:block;">
              <h3 class="title">一键登录</h3>
              <div class="tip-error"></div>
              <!--<form action="/registe/save.json" method="post" label-width="80px">-->
              <el-form ref="loginForm" :model="loginForm" :rules="rules">
                <!--手机登录输入框-->

                <el-form-item
                  prop="phone"
                >
                  <el-input prefix-icon="el-icon-edit-outline"
                            placeholder="请输入手机号码"
                            v-model="loginForm.phone"
                            maxlength="12"
                            type="text"
                            auto-complete
                            class="input-with-select">
                  </el-input>
                </el-form-item>
                <!--密码输入框-->
                <el-form-item
                  prop="cpassword"
                >
                  <el-input
                    :type="passwordType"
                    prefix-icon="el-icon-edit-outline"
                    v-model="loginForm.cpassword"
                    id="cpassword"
                    name="cpassword"
                    show-password
                    auto-complete="on"
                    placeholder="请输入密码"
                    @keyup.enter.native="register"/>

                </el-form-item>
                <div class="landing-login-btn">
                  <el-button type="primary" @click="login()" round>登录</el-button>
                  <el-button @click="reset('loginForm')" round type="primary">取消</el-button>
                </div>
                <div class="bottom-tip-box">
                  <label>

                    <div>
                      如果您没有账号，
                      <el-button type="text" @click="centerDialogVisible = true">请进行注册</el-button>
                    </div>
                  </label>
                </div>


                <!--注册-弹出框-->
                <el-dialog
                  title="注册"
                  :visible.sync="centerDialogVisible"
                  width="80%"
                  center>

                  <el-row>
                    <el-col :span="24" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                      <!--不显示必填输入框旁的星号=hide-required-asterisk-->
                      <el-form show-message status-icon :model="registerForm" :rules="registerRules"
                                    ref="registerForm"
                      >
                        <!-- prop="phone"绑定校验规则-->
                        <el-form-item prop="rphone" class="el-form-item" label="账号"  autocomplete>
                          <el-input maxlength="12"
                                    type="text"
                                    v-model="registerForm.rphone"
                                    prefix-icon="el-icon-mobile-phone"
                                    name="rPhone"
                                    id="account"
                                    auto-complete="on"
                                    placeholder="请输入您注册的账号（手机号码）"/>
                        </el-form-item>
                        <el-form-item
                          prop="rpassword" label="密码"
                        >
                          <el-input
                            :type="passwordType"
                            prefix-icon="el-icon-edit-outline"
                            v-model="registerForm.rpassword"
                            name="rPassword"
                            show-password
                            auto-complete="on"
                            placeholder="请输入密码"
                            @keyup.enter.native="register"/>

                        </el-form-item>


                        <el-form-item label="确认密码" prop="checkPass" required>
                          <el-input type="password" show-password v-model="registerForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>

                        <el-form-item label="真实姓名" prop="crname" required autocomplete>
                          <el-input v-model="registerForm.crname"></el-input>
                        </el-form-item>

                        <el-form-item label="用户名" prop="cusername" required autocomplete>
                          <el-input v-model="registerForm.cusername"></el-input>
                        </el-form-item>

                        <!--<el-form-item label="个人简介" prop="introduce" required>-->
                          <!--<el-input type="textarea"-->
                                    <!--autosize-->
                                    <!--v-model="registerForm.introduce"-->
                                    <!--placeholder=""-->
                          <!--&gt;</el-input>-->
                        <!--</el-form-item>-->

                        <el-form-item label="出生日期" required prop="birthday">
                          <el-date-picker
                            type="date"
                            placeholder="选择日期"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd"
                            v-model="registerForm.birthday"
                            style="width: 100%;"
                          ></el-date-picker>

                        </el-form-item>

                        <el-form-item label="户口所在地" prop="residenceAddress">
                          <v-distpicker :province="residenceAddress.province" :city="residenceAddress.city" :area="residenceAddress.area" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
                        </el-form-item>

                        <el-form-item label="电子邮件" prop="email" required>
                          <el-input v-model="registerForm.email"></el-input>
                        </el-form-item>

                        <el-form-item label="性别">
                          <el-radio-group v-model="registerForm.sex">
                            <el-radio class="radio" label="男">男</el-radio>
                            <el-radio class="radio" label="女">女</el-radio>
                          </el-radio-group>
                        </el-form-item>

                        <el-form-item label="爱好" prop="hobby">
                          <el-input type="textarea" autosize v-model="registerForm.hobby"></el-input>
                        </el-form-item>

                        <!--用户协议-->
                        <div class="bottom-tip-box">
                          <label>
                            <el-checkbox v-model="registerForm.checked">同意</el-checkbox>
                            <router-link to="/protocol">用户协议及隐私政策</router-link>

                          </label>
                        </div>

                      </el-form>
                    </el-col>

                  </el-row>


                  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click.native.prevent="register">注册</el-button>
                    <!--centerDialogVisible = false-->
  </span>
                </el-dialog>

              </el-form>
              <div class="btn-switch ewm-switch"></div>
            </div>
          </div>
          <!--注册-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ZPHeader from './ZPHeader'
import VDistpicker from 'v-distpicker'

export default {
  name: 'LandingPage',
  components: {ZPHeader,VDistpicker},
  //  页面挂载时
  mounted () {
    this.getHotJobPosition()
    this.img='../static/job.jpg'
  },
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
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.registerForm.rpassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    var checkEmail = (ruler, value, callbacks) =>{
      const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if(emailReg.test(value)){
        callbacks()
      }else{
        return callbacks(new Error('请输入正确的邮箱地址'))
      }
    }
    return {
      img:'',
      phone: '',
      //广告显示的公司
      // enterpriseList: [
      //   {
      //     name: '阿里巴巴',
      //     img: 'https://img.bosszhipin.com/beijin/mcs/bar/20180906/5fd9804307c9e266559d8c4c911d228fbe1bd4a3bd2a63f070bdbdada9aad826.png?x-oss-process=image/resize,w_120,limit_0'
      //   }, {
      //     name: '百度',
      //     img: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20190228/a83fc908c1bcb5510b35da79ebc74a9286b6a9e98aa8f150dd17e2f5328c5178.jpg?x-oss-process=image/resize,w_120,limit_0'
      //   },
      //   {
      //     name: '腾讯',
      //     img: 'https://img.bosszhipin.com/beijin/mcs/bar/brand/109.jpg?x-oss-process=image/resize,w_120,limit_0'
      //   },
      //   {
      //     name: '京东数字科技',
      //     img: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20181203/edd5783606744772f3d55fda265b5fc7cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_120,limit_0'
      //   },
      //   {
      //     name: '小米',
      //     img: 'https://img.bosszhipin.com/beijin/mcs/bar/brand/84270.jpg?x-oss-process=image/resize,w_120,limit_0'
      //   }, {
      //     name: 'OPPO',
      //     img: 'https://img.bosszhipin.com/beijin/logo/0181f814e6ac2d0d826b403e8235c8f9be1bd4a3bd2a63f070bdbdada9aad826.jpg?x-oss-process=image/resize,w_120,limit_0'
      //   }
      // ],

      // 热门职位
      hotJobPosition: [

      ],
      //是否显示注册弹出框
      centerDialogVisible: false,
      passwordType: 'password',
      loading: false,
      redirect: undefined,
      loginCandidate: [],
      // model绑定的是表单数据对象
      loginForm: {
        phone: '',
        cpassword: ''
      },
      residenceAddress: {province:'',city:'',area:''},
      //注册信息
      registerForm: {
        rphone: '',
        rpassword: '',
        checked: false,
        cusername: '',
        cname:'',
        birthday: '',
        crname: '', //真实姓名
        introduce: '', //自我介绍
        sex: '',
        // residenceAddress: {province:'',city:'',area:''},
        hobby: '',
        email: ''
      },
      // 从后端返回的结果
      responseResult: [],
      //  表单校验规则;用prop
      rules: {
        phone: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {validator: checkCount, trigger: 'blur'},
          {min: 8, max: 11, message: '长度在8到11个数字', trigger: 'blur'}
        ],
        cpassword: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
      },
      registerRules: {
        rphone: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {validator: checkCount, trigger: 'blur'},
          {min: 8, max: 11, message: '长度在8到11个数字', trigger: 'blur'}
        ],
        crname: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ],
        rpassword: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        birthday: [
          {required: true, message: '请选择生日', trigger: 'blur'}
        ],
        // residenceAddress: [
        //   {required: true, message: '请选择户口所在地', trigger: 'blur'}
        // ],
        checkPass: [
          {required: true, message: '请再次输入您的密码',trigger: 'blur'},
          {validator: validatePass2,trigger: 'blur'}
        ],
        introduce: [
          { required: true, message: '请输入个人简介', trigger: 'blur' }
        ],
        email: [
          {validator: checkEmail, trigger:'blur'},
          { required: true, message: '请输入您的邮箱地址', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择您的性别', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //当地址下拉框变化时获取地址值
    onChangeProvince(data) {
      this.residenceAddress.province= data.value
    },
    onChangeCity(data) {
      this.residenceAddress.city = data.value
    },
    onChangeArea(data){
      this.residenceAddress.area= data.value
    },
    // 是否显示密码
    showPwd () {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    getHotJobPosition(){
      this.$axios.post('/selectHotJobPosition').then(
        result => {
          this.responseResult = JSON.stringify(result.data)
          if (result.data.code === 200) {
            this.hotJobPosition = result.data.data
            console.log(result.data.data)
          } else {
            this.$message.error(result.data.message + '请刷新页面')
          }
        }
      ).catch(function (error) {
          alert(error + '，请刷新页面')
          // this.loading = false
        }
      )
    },
    login () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          // 验证成功后将数据转换成JSON格式传递到后端
          // alert('正在提交...')
          this.loading = true
          this.$message.info('正在登录中...')
          //  /candidate 后端api：/candidate/login
          //通过修改axios的默认urlbase进行请求的转发，然后再后端添加配置设置允许跨域的域名等内容
          // console.log(this.$axios.defaults.baseURL)
          // console.log(this.loginForm.phone, this.loginForm.cpassword)
          this.$axios.post('/candidate/login',
            {
              phone: this.loginForm.phone,
              password: this.loginForm.cpassword
            }
            ).then(
            result => {
              this.responseResult = JSON.stringify(result.data)
              this.loading = false
              // console.log("hhhhhh" + this.responseResult)
              if (result.data.code === 200) {
                // 当验证成功后跳转到用户中心
                localStorage.setItem('loginCandidatePhone',this.loginForm.phone)
                //将登陆信息保存
                localStorage.setItem('loginCandidate',JSON.stringify(result.data.data))

                this.$router.replace({path: '/candidateCenter'})
                this.$message.success('成功登录！！')
                //通过vuex集中管理登录的求职者信息
                // this.$store.commit('updateLoginCandidate',result.data.data)

                //存在localStorage中
                // window.localStorage.setItem("candidate",result.data.data)

                // this.$store.state.loginCandidate
                // console.log("这是已经登陆的求职者信息" + result.data.data)
              } else {
                this.$message.error(result.data.message + '请重新输入')
              }
            }
          ).catch(function (error) {
              alert(error + '登录失败，请重新登陆')
              // this.loading = false
            }
          )

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
    register () {
      this.$refs.registerForm.validate((valid) => {
        // console.log("验证" + valid)
        if (valid) {
          // console.log('请先阅读用户协议' + this.registerForm.checked)
          if (!this.registerForm.checked) {
            this.$message.error('请先阅读用户协议')
          } else {
// console.log("hhhhh" + this.residenceAddress.province+this.residenceAddress.city + this.residenceAddress.area)

            this.$axios.post('/registerCandidate',
              {
                  candidate:{
                    phone: this.registerForm.rphone,
                    cpassword: this.registerForm.rpassword,
                    cusername: this.registerForm.cusername,
                    ccreateTime: new Date().toLocaleDateString(),
                    findJobTime: '',
                    status: '注册，正在找工作'
                },
                candidateMessage: {
                    birthday: this.registerForm.birthday,
                    crname:  this.registerForm.crname,
                    introduce:  this.registerForm.introduce,
                    phone:  this.registerForm.rphone,
                    sex:  this.registerForm.sex,
                    residenceAddress: this.residenceAddress.province+this.residenceAddress.city + this.residenceAddress.area ,
                    nowAddress:  '',
                    hobby:  this.registerForm.hobby,
                    email:  this.registerForm.email
                }
              }).then(
              result => {
                this.responseResult = JSON.stringify(result.data)
                this.loading = false
                // console.log("1111"+this.responseResult)
                if (result.data.code === 200) {
                  // 当验证成功后跳转到用户中心
                  this.centerDialogVisible = false
                  this.$message.success('成功注册！！')
                } else {
                  this.$message.error(result.data.message + '请重新输入')
                }
              }
            ).catch(function (error) {
                // console.log(error)
                this.$message.error('注册失败，请重新注册')
                // this.loading = false
              }
            )
          }

          }
        else {
          // alert('注册失败，请重新检查您输入的信息')
          this.$message.error('注册失败，请重新检查您输入的信息')
        }
      })
    },
  }
}
</script>

<style scoped>
  .landing-page{
    max-width: 1800px;
  }
  .main {
    background-image: -webkit-linear-gradient(top, #3e72d2 0, #77bdd1 100%);
    background-image: linear-gradient(top, #3e72d2 0, #77bdd1 100%);
    width: 100%;
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

  /*广告-container；列距*/
  .el-col {
    margin-bottom: 5px;
  }

  /*轮播幻灯片+搜索输入框*/
  .slider-box {
    float: left;
    width: 500px;
    text-align: center;
    /*margin-left: 10rem;*/
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

  /*广告图片content*/
  image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  /*注册面板*/
  .login-container {
    width: 400px;
    height: 426px;
    float: right;
    /*margin-right: 10rem;*/
    /*margin-top: 3rem;*/
  }

  .sign-wrap {
    position: static;
    width: 410px;
    margin-top: 50px;
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
  .landing-login-btn {
    text-align: center;
    margin: auto 0;
    margin-top: 20px;
  }

  /*将注册框内的同意协议和直接登录文本设置居中*/
  .bottom-tip-box {
    text-align: center;
    margin-top: 10px;
  }

  .enterprise-row-margin {
    margin: 20px;
  }
  /*职位卡片的padding*/
  .el-card__body {
    padding: 5px!important;
  }

  .card-text{
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 30px;
    text-align: center;
  }
</style>
