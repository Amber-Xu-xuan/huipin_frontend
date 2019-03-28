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
              <!--<form action="/registe/save.json" method="post">-->
              <el-form ref="form" :model="form" label-width="80px">
                <input type="hidden" name="pk" value="cpc_sem">
                <input type="hidden" name="act" value="0">
                <input type="hidden" name="purpose" value="0">
                <!--手机登录输入框-->
                <div>
                  <el-input placeholder="请输入内容" v-model="phone" class="input-with-select">
                    <el-select v-model="selectPhone" slot="prepend" placeholder="请选择" style="width: 100px">
                      <el-option label="+86" value="+86"></el-option>
                      <el-option label="+1" value="+1"></el-option>
                      <el-option label="+852" value="+852"></el-option>
                      <el-option label="+81" value="+81"></el-option>
                      <el-option label="+886" value="+886"></el-option>
                      <el-option label="+44" value="+44"></el-option>
                    </el-select>
                    <!--<el-button slot="append" icon="el-icon-search"></el-button>-->
                  </el-input>
                </div>
                <div class="landing-register-btn">
                  <el-button type="primary" @click="onSubmit">注册</el-button>
                </div>


                <div class="agreement-tip">
                  <label>
                    <el-checkbox v-model="checked">同意</el-checkbox>
                    <router-link to="/protocol">用户协议及隐私政策</router-link>
                    已有账号
                    <el-button type="text" @click="centerDialogVisible = true">直接登录</el-button>
                  </label>
                </div>

                <el-dialog
                  title="登录"
                  :visible.sync="centerDialogVisible"
                  width="40%"
                  center>
                  <span>手机：</span>
                  <el-input placeholder="请输入内容" v-model="phone" class="input-with-select"/>
                  <span slot="footer" class="dialog-footer">
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="centerDialogVisible = false">登录</el-button>
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
    return {
      phone: '',
      selectPhone: '',
      centerDialogVisible: false
    }
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
    margin-bottom: -25px;
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

  .dropdown-menu {
    display: none;
    position: relative;
    height: 0;
    margin-right: 2px;
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
</style>
