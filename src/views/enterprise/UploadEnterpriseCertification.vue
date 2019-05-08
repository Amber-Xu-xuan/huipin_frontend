<template>
  <div class="xxcenter-content">
    <el-form :model="businessInformation" :rules="rules" ref="businessInformation" label-width="100px" class="register-form">
      <el-form-item label="公司名称" prop="emName"  >
        <el-input v-model="businessInformation.eName"></el-input>
      </el-form-item>

      <el-form-item label="法人代表" prop="legalRepresentative"  >
        <el-input v-model="businessInformation.legalRepresentative"></el-input>
      </el-form-item>

      <el-form-item label="注册资本" prop="registeredCapital"  >
        <el-input  type="textarea" v-model="businessInformation.registeredCapital"></el-input>
      </el-form-item>

      <el-form-item label="成立时间" prop="establishmentTime">

          <el-date-picker type="date" placeholder="选择日期" v-model="businessInformation.establishmentTime"
                          style="width: 100%;"></el-date-picker>
      </el-form-item>


      <el-form-item label="企业类型" prop="enterprisesType"  >
        <el-input v-model="businessInformation.enterprisesType"></el-input>
      </el-form-item>

      <el-form-item label="经营状态" prop="managementState"  >
        <el-input v-model="businessInformation.managementState"></el-input>
      </el-form-item>
      <el-form-item label="统一信用代码" prop="unifiedCreditCode"  >
        <el-input v-model="businessInformation.unifiedCreditCode"></el-input>
      </el-form-item>
      <el-form-item label="天眼查网址" prop="tianYanCha"  >
        <el-input v-model="businessInformation.tianYanCha"></el-input>
      </el-form-item>

      <el-form-item label="注册地址" prop="registeredAddress"  >
        <v-distpicker :province="registeredAddress.province" :city="registeredAddress.city" :area="registeredAddress.area" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
      </el-form-item>
      <!--经营范围-->
      <el-form-item label="经营范围" prop="businessScope">
        <el-input type="textarea" rows="4" v-model="businessInformation.businessScope"
                  placeholder="计算机、网络、通信质统软请显选敌、研究，通信设万，计算机及配请显销售。（品业体法下主相择经营项带，选支经营活动；体法个经批准显项带，经严关导还批准石体批准显内容选支经营活动；紧得从事本亚民业克策禁式和限制仍项带显经营活动。）"></el-input>
      </el-form-item>
      <el-form-item label="天眼查网址" prop="tianYanCha"  >
        <el-input v-model="businessInformation.tianYanCha"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('businessInformation')">修改</el-button>
        <el-button @click="resetForm('businessInformation')">重置</el-button>
      </el-form-item>
    </el-form>

  </div>

</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  name: 'UploadEnterpriseCertification',
  components: { VDistpicker },
  data () {
    // 自定义的校验规则
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    var checkEmail = (ruler, value, callbacks) =>{
      const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if(emailReg.test(value)){
        callbacks()
      }else{
        return callbacks(new Error('请输入正确的邮箱地址'))
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.businessInformation.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return{
      loading: '',
      registeredAddress: { province: '', city: '', area: '' },
      businessInformation: {
        emName: '',
        emphone: '',
        emintroduce: '',
        email: '',
        pass: '',
        checkPass:'',
        registerFinancing: '', // 融资情况
        registerCompanyScale: '', // 公司规模
        emstablishmentDate: '', // 创立日期
        businessScope:'', //经营类型
        emFinancing: '',
        registeredAddress: '',
      },
      rules: {
        emName: [
          { required: true, message: '请输入您的公司名称', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //当地址下拉框变化时获取地址值
    onChangeProvince(data) {
      this. registeredAddress.province= data.value
    },
    onChangeCity(data) {
      this. registeredAddress.city = data.value
    },
    onChangeArea(data){
      this. registeredAddress.area= data.value
    },
    submitForm(formName) {
      console.log(this.businessInformation.emstablishmentDate.toLocaleDateString())
      this.$refs.businessInformation.validate((valid) => {
        if (valid) {
          // 验证成功后将数据转换成JSON格式传递到后端
          this.loading = true
          this.$message.info("正在提交数据")

          // 通过axios的post方法将表单数据传递给后端接口
          this.$axios.post('/registerEnterprise',{
            enterprise: {
              eName: this.businessInformation.emName,
              ephone: this.businessInformation.emphone,
              epassword: this.businessInformation.emName,
              ecreateTime: new Date().toLocaleDateString(),
              status: "注册"
            },
            enterpriseMessage:{
              emName: this.businessInformation.emName,
              emphone: this.businessInformation.emphone,
              emstablishmentDate: this.businessInformation.emstablishmentDate.toLocaleDateString(),
              emintroduce: this.businessInformation.emintroduce, //公司简介
              registerFinancing: this.businessInformation.registerFinancing, // 融资情况
              emScaleList: this.businessInformation.registerCompanyScale, // 公司规模
              ememail: this.businessInformation.email,
              businessScope: this.businessInformation.businessScope, //经营类型
              emaddress: this.businessInformation. registeredAddress.province + this.businessInformation. registeredAddress.city+this.businessInformation. registeredAddress.area,
              emFinancing: this.businessInformation.emFinancing,
            }
          }).then(
            result => {
              this.responseResult = JSON.stringify(result.data)
              this.loading = false
              console.log( this.responseResult)
              if (result.data.code === 200) {
                // 当验证成功后跳转到用户中心
                this.$router.replace({path: '/login'})
                this.$message.success('注册成功！！')
              }else{
                this.$message.error(result.data.message + '请重新输入')
              }
            }
          ).catch(function (error) {
            console.log(error)
            // this.loading = false
          })

        }else {
          this.$message.error('验证失败，请重新检查您输入的信息')
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs.businessInformation.resetFields();
    },
    //  页面挂载时加载公司信息
    getEnterpriseMessage(){
      var loginEnterprise = JSON.parse(localStorage.getItem('loginEnterprise'))
      console.log(loginEnterprise.eName)
      this.$axios.get('/getEnterpriseByEName', {
          params:{
            eName: loginEnterprise.eName
          }
        }
      ).then((result) => {
        var res = result.data
        this.businessInformation = res.data[0]
        console.log(res.data[0])
      })
        .catch(function (error) {
          console.log(error)
        })
    }
  },
  mounted () {
    this.getEnterpriseMessage()
  }
}
</script>

<style scoped>

</style>
