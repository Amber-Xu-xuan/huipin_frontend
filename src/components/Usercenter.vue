<template>
<!--<el-container>-->
  <!--<el-header class="yellow">header</el-header>-->
  <!--<el-container>-->
  <!--<el-aside class="red">aside</el-aside>-->
  <!--<el-main class="green">main</el-main>-->
  <!--</el-container>-->
<!--</el-container>-->
  <div>
    <ZPHeader></ZPHeader>
    <div>
      这是首页，嘻嘻嘻。
    </div>
    <ZPFooter></ZPFooter>
  </div>
</template>

<script>
import ZPHeader from './ZPHeader'
import ZPFooter from './ZPFooter'
export default {
  name: 'usercenter',
  components: {ZPHeader, ZPFooter}
}
</script>

<style scoped>
.red{
  background: red;
  height: 100%;
}
.green{
  background: green;
  height: 100%;
}
  .yellow{
    background: yellow;
    height: 100%;
  }
</style>
