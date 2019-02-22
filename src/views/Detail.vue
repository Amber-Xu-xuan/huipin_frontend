<template>
  <div>
    显示职位的具体信息
    <span>{{$route.query.jobId}}</span>
    <a href="javascript:;" class="btn btn-primary" v-on:click="get">Get</a>
    <a href="javascript:;" class="btn btn-primary">Post
    </a>
    <a href="javascript:;" class="btn btn-primary">JsonP</a>
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data () {
    return {
      account: '',
      message: ''
    }
  },
  methods: {
    get () {
      this.$http.get('package.json', {
        params: {
          userId: '101'
        },
        headers: {
          Token: 'abc'
        }
      }).then(res => {
        this.data.message = res.data
      })
    }
  }
}
</script>
<style scoped>
</style>
