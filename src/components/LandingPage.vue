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
              <h3 class="title">一键注册BOSS直聘</h3>
              <div class="tip-error"></div>
              <form action="/registe/save.json" method="post"><input type="hidden" name="pk" value="cpc_sem">
                <input type="hidden" name="act" value="0">
                <input type="hidden" name="purpose" value="0">
                <div class="form-row row-select">
                                <span class="dropdown-select">
                                    <i class="icon-select-arrow"></i>
                                    <em class="text-select">+86</em>
                                    <input type="hidden" name="regionCode" value="+86">
                                </span>
                  <span class="ipt-wrap">
                                    <i class="icon-sign-phone"></i>
                                    <input type="tel" class="ipt ipt-phone required" placeholder="手机号" name="phone">
                                </span>
                  <div class="dropdown-menu">

                    <ul>
                      <li data-val="+86"><span class="num">+86</span>中国大陆</li>
                      <li data-val="+1"><span class="num">+1</span>美国</li>
                      <li data-val="+852"><span class="num">+852</span>香港</li>
                      <li data-val="+81"><span class="num">+81</span>日本</li>
                      <li data-val="+886"><span class="num">+886</span>台湾</li>
                      <li data-val="+44"><span class="num">+44</span>英国</li>
                      <li data-val="+82"><span class="num">+82</span>韩国</li>
                      <li data-val="+33"><span class="num">+33</span>法国</li>
                      <li data-val="+7"><span class="num">+7</span>俄罗斯</li>
                      <li data-val="+39"><span class="num">+39</span>意大利</li>
                      <li data-val="+65"><span class="num">+65</span>新加坡</li>
                      <li data-val="+63"><span class="num">+63</span>菲律宾</li>
                      <li data-val="+60"><span class="num">+60</span>马来西亚</li>
                      <li data-val="+64"><span class="num">+64</span>新西兰</li>
                      <li data-val="+34"><span class="num">+34</span>西班牙</li>
                      <li data-val="+95"><span class="num">+95</span>缅甸</li>
                      <li data-val="+230"><span class="num">+230</span>毛里求斯</li>
                      <li data-val="+263"><span class="num">+263</span>津巴布韦</li>
                      <li data-val="+20"><span class="num">+20</span>埃及</li>
                      <li data-val="+92"><span class="num">+92</span>巴基斯坦</li>
                      <li data-val="+880"><span class="num">+880</span>孟加拉国</li>
                    </ul>
                  </div>
                </div>
                <div class="form-btn">
                  <button type="submit" class="btn">注册</button>
                </div>
                <div class="text-tip">
                  <div class="agreement-tip"><label><input type="checkbox" checked="checked">同意BOSS直聘 <a
                    href="https://www.zhipin.com/register/protocol/introduce" target="_blank">用户协议及隐私政策</a></label>
                  </div>
                  已有账号 <a href="javascript:;" class="show-pop-sign">直接登录</a></div>
              </form>
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
  components: {ZPHeader}
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
    margin-bottom: 33px;
  }

  /*轮播幻灯片*/
  .slider-box {
    float: left;
  }

  .slider-box {
    position: relative;
    /*overflow: hidden;*/
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
  .slider-box .landing-btn{
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
    background-color: #53cac3;
    color: #fff;
    text-align: center;
    -webkit-appearance: none;
    -moz-appearance: none;
  }

  button {
    /*消除button的默认样式 */
    margin: 0;
    padding: 0;
    border: 1px solid transparent;
    /*自定义边框 */
    outline: none;
    /*消除默认点击蓝色边框效果*/
  }
  /*显示各个公司的LOGO*/
  .landing-job-box {
    position: relative;
    width: 572px;
    height: 367px;
    margin-top: 8px;
  }

  /*公司logo显示框-左边tab*/
  .job-tab-box {
    float: left;
    width: 90px;
    z-index: 9;
    opacity: .8;
  }
  /*公司logo显示框-左边tab的超链接*/
  .job-tab-box li {
    height: 61px;
    line-height: 61px;
    color: #fff;
    background: rgba(52,91,158,.1);
    text-align: center;
    letter-spacing: 1px;
    cursor: pointer;
  }
  /*公司logo显示框-右边显示内容*/
  .landing-content {
    float: right;
    width: 474px;
  }
  /*将列表元素的样式设置为none*/
  li, ol, ul {
    list-style: none;
  }
  /*点击屏幕上的图标，弹出内容*/
  .pop-layer {
    position: absolute;
    left: 98px;
    top: 52px;
    width: 386px;
    height: 246px;
    padding: 30px;
    background-color: #fff;
    color: #414a60;
  }
  /*图标框*/
  .landing-job-item.cur {
    display: block;
  }
  .semwrap7 .landing-job-item {
    display: none;
    width: 480px;
    margin-right: -6px;
  }

  .item-1 {
    width: 114px;
    height: 58px;
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
    box-shadow: 1px 2px 15px rgba(0,0,0,.3);
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

  /*注册表单中的手机号码输入框*/
  .semwrap .sign-form .form-row {
    margin-top: 25px;
  }
  .sign-form .row-select {
    position: relative;
    z-index: 10;
  }
  .sign-form .form-row {
    margin-top: 26px;
  }
  /*手机号码输入框中的下拉框*/
  .sign-form .dropdown-select {
    position: absolute;
    top: 1px;
    left: 28px;
    height: 40px;
    z-index: 1;
    background: 0 0;
  }
  /*向下的图标*/
  .sign-form .dropdown-select .icon-select-arrow {
    right: 5px;
    top: 12px;
  }
  .dropdown-select .icon-select-arrow {
    position: absolute;
    right: 15px;
    top: 14px;
    cursor: pointer;
  }
  .icon-arrow-down, .icon-select-arrow {
    width: 16px;
    height: 16px;
    background-position: 2px -54px;
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
  em {
    font-style: normal;
  }
  /*下拉框样式*/
  .sign-form .dropdown-menu {
    z-index: 10;
    left: 0;
  }
  .dropdown-menu {
    display: none;
    position: relative;
    height: 0;
    margin-right: 2px;
  }
  /*点击下拉框*/
  .dropdown-menu-open {
    display: block;
    z-index: 1;
  }
</style>
