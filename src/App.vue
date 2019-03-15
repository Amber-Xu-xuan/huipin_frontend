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
  }
  .font-style{
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    text-align: center;
    font-weight: 900;
    font-size: 2rem;
  }
</style>
