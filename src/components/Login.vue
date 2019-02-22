<template>
  <el-row type="flex" justify="center">
    <el-col :span="12" :xs="24" :sm="12" :md="12">
      <div class="">
        <form>
          <label for="account">账号：</label><input type="text" v-model="account" id="account" placeholder="请输入您注册的账号（手机号码）"/>
          <div>
            <label for="password">密码:</label><input type="password" v-model="password" id="password" value=""/>
          </div>
          <button @click="login">登录</button>
          <button @onClick="exit" type="reset">取消</button>
          <span>输入的账号：</span>{{account}}
        </form>
      </div>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log(this.data.account)
      this.$router.push('/usercenter?userId=22')
    },
    exit () {
      //
    }
  }
}
</script>

<style scoped>

</style>
