<template>
<el-container>
  <el-header class="yellow">header</el-header>
  <el-container>
  <el-aside class="red">aside</el-aside>
  <el-main class="green">main</el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  name: 'usercenter'
}
</script>

<style scoped>
.red{
  background: red;
}
.green{
  background: green;
}
  .yellow{
    background: yellow;
  }
</style>
