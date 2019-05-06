<template>
  <div class="xxcenter-content">
    <el-form :model="workExperience" :rules="rules" ref="workExperience" label-width="100px" class="register-form">

      <el-form-item label="公司名称" prop="ename" required>
        <el-input v-model="workExperience.ename"></el-input>
      </el-form-item>

      <el-form-item label="所属部门" prop="subordinate_departments" required>
        <el-input v-model="workExperience.subordinate_departments"></el-input>
      </el-form-item>


      <el-form-item label="职位名称" prop="jname" required>
        <el-input v-model="workExperience.jname"></el-input>
      </el-form-item>

      <el-form-item label="职位类型" prop="jobType" required>
        <el-input  v-model="workExperience.jobType" ></el-input>
      </el-form-item>
      <el-form-item label="在职时间" required>

          <el-form-item prop="workDate">
            <el-date-picker type="date" placeholder="开始时间" v-model="workExperience.workStartDate"
                            ></el-date-picker>至
            <el-date-picker type="date" placeholder="结束时间" v-model="workExperience.workEndDate"
                            ></el-date-picker>
          </el-form-item>

      </el-form-item>

      <el-form-item label="技能" prop="skill">
        <el-input type="textarea" v-model="workExperience.skill"></el-input>
      </el-form-item>

      <el-form-item label="工作内容" prop="workContent">
        <el-input type="textarea" v-model="workExperience.workContent" placeholder="例如：
1、主要负责新员工入职培训；
2、分析制定员工每个月个人销售业绩；
3、帮助员工提高每日客单价，整体店面管理等工作；
"></el-input>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" @click="submitForm('workExperience')">提交</el-button>
        <el-button @click="resetForm('workExperience')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'AddWorkExperience',
  data () {
    // 自定义的校验规则
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
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
    return{
      workExperience: {
        ename: '',
        jname: '',
        jobType: '',
        subordinate_departments: '', //所属部门
        workStartDate: '',
        workEndDate: '',
        workContent: '',
        skill: ''
      },
      //校验规则
      rules: {
        name: [
          { required: true, message: '请输入岗位i名称', trigger: 'blur' }
        ],
        workStartDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        workEndDate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        ename:[
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          {validator: checkPhone, trigger: 'blur'},
        ]
      }
    }
  }
}
</script>

<style scoped>
</style>
