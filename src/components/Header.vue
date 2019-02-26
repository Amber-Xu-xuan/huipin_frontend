<template>
    <div class="header">
      <span><i class="" ></i></span>
      <a href="#">首页</a>
      <a href="#">招聘会</a>
      <a href="#">帮助</a>
    </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
.header{
  background-color: #5bb0ff;
  height: 2.5rem;
}
a{
  text-decoration: none;
  color: #fff;
  font-size: 16px;
  float: right;
  margin: 5px;
}
</style>
