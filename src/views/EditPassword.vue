<template>
  <div class="xxcenter-content">
  <el-form :model="submitForm" status-icon :rules="rules2" ref="submitForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="密码" prop="pass">
      <el-input type="password" v-model="submitForm.pass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPass">
      <el-input type="password" v-model="submitForm.checkPass" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" :loading="editLoading" @click="submit('submitForm')">提交</el-button>
      <el-button @click="reset('submitForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script>
//导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default {
  name: 'EditPassword',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.submitForm.checkPass !== '') {
          this.$refs.submitForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.submitForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      editLoading:false,
      submitForm: {
        pass: '',
        checkPass: '',
        age: ''
      },
      rules2: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    }
    },
  mounted(){
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            NProgress.start();
            var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
            var loginEnterprisePhone = localStorage.getItem('loginEnterprisePhone')

            if (this.$route.path === "/adminCenter/editPassword"){
              var loginAdminPhone = localStorage.getItem('loginAdminPhone')
              this.$axios.post("/manager/updatePassword", {
                mphone: loginAdminPhone,
                mpassword: this.submitForm.pass,
              }).then((res) => {
                if (res.data.code === 200) {
                  this.editLoading = false
                  NProgress.done();
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  this.$refs[formName].resetFields()
                }else {
                  this.$message.error(res.data.message + '请重新修改')
                }
              })
            }else if (loginCandidatePhone === null && loginCandidatePhone === "" && loginEnterprisePhone === null && loginEnterprisePhone === ""){
              this.$message.error("请先登录您的账号")
            }else if (loginCandidatePhone !== null && loginCandidatePhone !== "") {
              this.$axios.post("/candidate/updatePassword", {
                phone: loginCandidatePhone,
                cpassword: this.submitForm.pass,
              }).then((res) => {
                if (res.data.code === 200) {
                  this.editLoading = false
                  NProgress.done();
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  this.$refs[formName].resetFields()
                }else {
                  this.$message.error(res.data.message + '请重新修改')
                }

              })
            }else if(loginEnterprisePhone !== null && loginEnterprisePhone !== ""){
              this.$axios.post("/enterprise/updatePassword", {
                ephone: loginEnterprisePhone,
                epassword: this.submitForm.pass,
              }).then((res) => {
                if (res.data.code === 200) {
                  this.editLoading = false
                  NProgress.done();
                  this.$message({
                    message: '修改成功',
                    type: 'success'
                  })
                  this.$refs[formName].resetFields()
                } else {
                  this.$message.error(res.data.message + '请重新修改')
                }
              })
            }
          })
        } else {
          this.$message.error('请检查您输入数据，重新修改')
        }
      });
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    }
  },
}
</script>

<style scoped>

</style>
