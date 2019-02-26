<template>
  <div>
    显示职位的具体信息
    <span>{{$route.query.jobId}}</span>
    <a href="javascript:;" class="btn btn-primary" @click="get">Get</a>
    <a href="javascript:;" class="btn btn-primary" @click="post">Post
    </a>
    <a href="javascript:;" class="btn btn-primary" @click="jsonp">JsonP</a>
    <span>{{message}}</span>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Detail',
  data () {
    return {
      account: '',
      message: ''
    }
  },
  mounted: function () {
    // 全局拦截request
    axios.interceptors.request.use(function (config) {
      console.log('request init')
      return config
    })
    axios.interceptors.response.use(function (response) {
      console.log('response init')
      return response
    })
  },
  methods: {
    get () {
      axios.get('../package.json', {
        params: {
          userId: '101'
        },
        headers: {
          Token: 'abc'
        }
      }).then(res => {
        this.message = res.data
      }).catch(function (error) {
        console.log('error init' + error)
      })
    },
    post () {
      this.$http.post('package.json', {
        params: {
          userId: '101'
        },
        headers: {
          Token: 'abc'
        }
      }).then(res => {
        this.message = res.data
      })
    },
    jsonp () {
      this.$http.jsonp('package.json', {
      }).then(res => {
        this.message = res.data
      })
    },
    http: function () {
      // this.$http({
      //   url: 'package.json',
      //   params: {
      //     userId: '001'
      //   },
      //   headers: {
      //     token: '123'
      //   },
      //   timeout: 5,
      //   before: function () {
      //     console.log('before init')
      //   }
      // }).then(res => {
      //   this.message = res.data
      // })
      axios({
        url: '../package.json',
        method: 'get',
        data: {
          userId: '101'
        },
        headers: {
          token: 'http-test'
        }
      }).then(res => {
        this.message = res.data
      })
    }
  }
}
</script>
<style scoped>
</style>
