<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  html, body, #app{
    width: 100%;
    height: 100%;
    background: #f5f5f5;
    margin: 0;
    padding: 0;
    display: block;
  }
  .font-style{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    text-align: center;
    font-weight: 900;
    font-size: 2rem;
  }

  input, textarea, select, button {
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    margin: 0em;
    font: 400 13.3333px Arial;
  }

  /*用户中心设置外边距，此处的用户指的是招聘者和求职者、管理员*/
  .xxcenter-content{
    padding:20px;
  }

  /*修改nprogress的颜色*/
  /*#nprogress .bar {*/
    /*background: red !important; //自定义颜色*/
  /*}*/
</style>
