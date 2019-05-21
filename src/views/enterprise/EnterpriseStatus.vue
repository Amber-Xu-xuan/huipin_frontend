<template>
    <!--账号状态管理-->
  <section class="xxcenter-content">
    账号状态：<span class="statut-font-style">{{businessInformation.isVerification}}</span>
</section>

</template>

<script>
export default {
  name: 'EnterpriseStatus',
  //  页面挂载时
  mounted () {
    this.getBusinessInformation()
  },
  data(){
    return {
      businessInformation: {
        isVerification: ''
      }
    }
  },
  methods: {
    getBusinessInformation(){
      var loginEnterprise = JSON.parse(localStorage.getItem('loginEnterprise'))
      console.log(loginEnterprise)
      if (loginEnterprise === null) {
        this.$message.error("请先登录您的账号或完善您的信息")
        // alert("请先登录您的账号或完善您的信息")
      }else{
        this.$axios.get('enterprise/getBusinessInformationByEName', {
            params:{
              eName: loginEnterprise.eName
            }
          }
        ).then((result) => {
          if(result.data.code === 200){
              this.businessInformation = result.data.data
          }else{
            this.$message.error(result.data.message)
          }
          console.log(result.data)
        })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
  }
}
</script>

<style scoped>
.statut-font-style{
  font-size: 10px;
  color: #b7b3c3;
}
</style>
