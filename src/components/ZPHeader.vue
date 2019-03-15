<template>
    <div class="header-container">
      <div class="header-font">Zoom</div>
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
  background-color: #FFF;

  margin: 0 auto;
  font-size: 12px;
  height: 2.5rem;
  box-shadow: 0 3px 4px #9bceeb;

}
.header-right{
  float: right;
}
  .header-font{
    color: #9bceeb;
    font-weight: 900;
    font-size: 18px;
    padding: 10px;
    /*font-family: "Arial","Microsoft YaHei","黑体","宋体",sans-serif;;*/
    font-family: "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
  }
</style>
