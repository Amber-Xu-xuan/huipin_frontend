<template>
    <div class="header-container">
      <!--<div class="header-font">Zoom</div>-->
        <div class="inner">
          <h1 class="logo"><a href="/login" ka="header-home-logo"><span>汇聘</span></a></h1>
          <div class="nav">
            <ul>
              <li class="cur"><a ka="header-home" href="https://www.zhipin.com/">首页</a></li>
              <li class=""><a ka="header-job" href="https://www.zhipin.com/job_detail/">求职</a></li>
              <li class=""><a ka="header-article" href="https://news.zhipin.com/">新闻</a></li>
            </ul>
          </div>
        </div>
      <!--<span class="header-right">返回</span>-->
    </div>
</template>

<script>
export default {
  name: 'ZPHeader'
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
  margin: 0;
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
.nav, .user-nav {
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
  vertical-align: top;
  text-align: center;
  font-size: 14px;
  margin: 0 7px;
}
</style>
