/**
 * @author amberXu
 * @date 2019/2/21
 * @Description: 职位列表页面
*/
<template>
  <div>这是职位列表ID{{$route.params.jobsId}}
    <div>
      <!--要使用绝对地址-->
      <router-link to="/job/title">显示职位具体信息</router-link>
    </div>
    <!--显示职位的具体信息-->
    <div>
      <router-view></router-view>
    </div>
    <div>
      <router-link to="/detail?jobId=11">跳转到详情页面</router-link>
      <button @click="jump">button-跳转到详情页面</button>
    </div>
    <router-link :to="{name: 'detail',params:{cartId:123}}">跳转到详情页面</router-link>
  </div>
</template>

<script>
export default {
  name: 'JobsList',
  methods: {
    jump () {
      this.$router.push('/detail?jobId=22')
    }
  }
}
</script>

<style scoped>

</style>
