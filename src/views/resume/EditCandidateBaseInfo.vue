<template>
  <!--修改企业信息  -->
  <div class="xxcenter-content">
    <el-form :model="candidateBaseInfo" :rules="rules" ref="candidateBaseInfo" label-width="100px" class="register-form">

      <el-form-item label="姓名" prop="crname">
        <el-input v-model="candidateBaseInfo.crname"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone"  >
        <el-input v-model="candidateBaseInfo.phone"></el-input>
      </el-form-item>


      <el-form-item label="电子邮件" prop="email"  >
        <el-input v-model="candidateBaseInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="现居城市" prop="nowAddress"  >
        <v-distpicker
          :province="nowAddress.province"
          :city="nowAddress.city"
          :area="nowAddress.area"
          @province="onChangeProvince"
          @city="onChangeCity"
          @area="onChangeArea"
        ></v-distpicker>
        <span style="font-size: 10px; color: #ccc;">{{candidateBaseInfo.nowAddress}}</span>
      </el-form-item>
      <el-form-item prop="birthday" label="出生日期"  >
        <el-date-picker type="date" placeholder="选择日期" v-model="candidateBaseInfo.birthday"
                        style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item label="性别" prop="sex"  >
        <el-radio-group v-model="candidateBaseInfo.sex">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="是否是学生" prop="isStudent"  >
        <el-radio-group v-model="candidateBaseInfo.isStudent">
          <el-radio label="是" value="true"></el-radio>
          <el-radio label="否" value="false"></el-radio>
        </el-radio-group>
      </el-form-item>


      <el-form-item>
        <el-button type="primary" :loading="loading" @click="submitForm('candidateBaseInfo')">修改</el-button>
        <el-button @click="resetForm('candidateBaseInfo')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'

export default {
  name: 'EditCandidateBaseInfo',
  components: {VDistpicker},
  data () {
    //验证邮箱
    var checkEmail = (ruler, value, callbacks) =>{
      const emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if(emailReg.test(value)){
        callbacks()
      }else{
        return callbacks(new Error('请输入正确的邮箱地址'))
      }
    }
    var checkCount = (rule, value, callback) => {
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
    return {
      loading: false,
      nowAddress: {province: '', city: '',area: ''},
      candidateBaseInfo: {
        crname: '',
        phone: '',
        email: '',
        isStudent: false,
        birthday: '',
        sex: '',
      },
      //  表单校验规则;用prop
      rules: {
        phone: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {validator: checkCount, trigger: 'blur'},
          {min: 8, max: 11, message: '长度在8到11个数字', trigger: 'blur'}
        ],
        crname: [
          {required: true, message: '请输入真实姓名', trigger: 'blur'}
        ],
        birthday: [
          {required: true, message: '请选择生日', trigger: 'blur'}
        ],
        isStudent: [
          {required: true, message: '请选择户口所在地', trigger: 'blur'}
        ],
        email: [
          {validator: checkEmail, trigger:'blur'},
          { required: true, message: '请输入您的邮箱地址', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择您的性别', trigger: 'blur' }
        ],
        nowAddress: [
          { required: true, message: '请选择您的现居城市', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    //当地址下拉框变化时获取地址值
    onChangeProvince(data) {
      this.nowAddress.province= data.value
    },
    onChangeCity(data) {
      this.nowAddress.city = data.value
    },
    onChangeArea(data){
      this.nowAddress.area= data.value
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 验证成功后将数据转换成JSON格式传递到后端
          this.loading = true
          this.$message.info('正在提交数据')
          // 通过axios的post方法将表单数据传递给后端接口
          this.$axios.post('candidate/editCandidateBaseInfo', {
              crname: this.candidateBaseInfo.crname,
              phone: this.candidateBaseInfo.phone,
              email: this.candidateBaseInfo.email,
              isStudent: this.candidateBaseInfo.isStudent,
              nowAddress: this.nowAddress.province + this.nowAddress.city + this.nowAddress.area,
              birthday: this.candidateBaseInfo.birthday,
              sex: this.candidateBaseInfo.sex
          }).then(
            result => {
              this.responseResult = JSON.stringify(result.data)
              this.loading = false
              if (result.data.code === 200) {
                // 当验证成功后跳转到用户中心
                this.$message.success(result.data.message)
                this.loading = false
              } else {
                this.$message.error(result.data.message + '请重新输入')
                this.loading = false
              }
            }
          ).catch(function (error) {
            alert(error)
          })
        } else {
          this.$message.error('验证失败，请重新检查您输入的信息')
        }
      })
    },
    resetForm (formName) {
      this.$refs.candidateBaseInfo.resetFields()
    },
    //  页面挂载时
    getCandidateMessage () {
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      if (loginCandidatePhone === null){
        alert("请重新登录您的个人账号")
      }
      this.$axios.post('/candidate/getCandidateMessageByPhone', {
          phone:loginCandidatePhone
        }
      ).then((result) => {
        this.candidateBaseInfo = result.data.data[0]
      })
        .catch(function (error) {
          alert(error)
        })
    }
  },
  mounted () {
    this.getCandidateMessage()
  }
}
</script>

<style scoped>

</style>

