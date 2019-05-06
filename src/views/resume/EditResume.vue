<template>
  <!--在线编辑简历-->
    <div class="xxcenter-content">

      <el-form :model="resume" :rules="rules" ref="resume" label-width="100px" class="register-form">

        <el-form-item label="学校名称" prop="school" required>
          <el-input v-model="resume.school"></el-input>
        </el-form-item>

        <!--学历:博士、硕士、本科、大专、中专、高中、初中、小学-->
        <el-form-item label="学历" prop="education">
            <el-select v-model="educationBackground" placeholder="学历">
              <el-option
                v-for="(education,index) in educationList"
                :key="index"
                :label="education.education"
                :value="education.education"
              >
              </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所学专业" prop="major" required>
          <el-input v-model="resume.major"></el-input>
        </el-form-item>

        <el-form-item label="经验" prop="experience">
          <el-select v-model="experience" placeholder="经验">
            <el-option
              v-for="(experience,index) in experienceList"
              :key="index"
              :label="experience.experience"
              :value="experience.experience"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="手机号码" prop="phone" required>
          <el-input v-model="resume.phone"></el-input>
        </el-form-item>



        <el-form-item label="开始就读时间" required>
            <el-form-item prop="studyingTime">
              <el-date-picker type="date" placeholder="选择日期" v-model="resume.studyingTime"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
        </el-form-item>

        <el-form-item label="毕业时间" required>
          <el-form-item prop="graduationTime">
            <el-date-picker type="date" placeholder="选择日期" v-model="resume.graduationTime"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-form-item>

        <el-form-item label="个人简介" prop="introduce">
          <el-input type="textarea" v-model="resume.introduce"></el-input>
        </el-form-item>



        <el-form-item label="是否是实习过" prop="isStudent">
          <el-switch v-model="resume.internship"></el-switch>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="resetForm('resume')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  name: 'EditResume',
  components: { VDistpicker },
  data() {
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
    return {
      education: '',
      experience: "",
      educationList : [
        {
          education: '不限'
        },
        {
          education: '初中及以下'
        },
        {
          education: '中专/中技'
        },
        {
          education: '高中'
        },
        {
          education: '大专'
        },
        {
          education: '本科'
        },
        {
          education: '硕士'
        },
        {
          education: '博士'
        }
      ],
      experienceList : [
        {
          experience: '不限'
        },
        {
          experience: '应届生'
        },
        {
          experience: '1年以内'
        },
        {
          experience: '1-3年'
        },
        {
          experience: '3-5年'
        },
        {
          experience: '5-10年'
        },
        {
          experience: '10年以上'
        }
      ],
      resume: {
        rname: '',
        introduce: "",
        hobby: "",
        phone: '',
        email: '',
        pass: '',
        checkPass:'',
        isStudent: false,
        residenceAddress: '',
        birthda: '',
        select: { province: '', city: '', area: '' },
      },
      rules: {
        rname: [
          { required: true, message: '请输入您的真实姓名', trigger: 'blur' }
        ],
        residenceAddress: [
          { required: true, message: '请选择您的户口所在地', trigger: 'change' }
        ],
        birthday: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        pass: [
          { required: true, message: '请输入您的密码', trigger: 'blur' }
        ],
        checkPass: [
          { required: true, message: '请再一次输入您的密码', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入您的电话号码', trigger: 'blur' },
          {validator: checkPhone, trigger: 'blur'},
        ],
        email: [
          {validator: checkEmail, trigger:'blur'},
          { required: true, message: '请输入您的邮箱地址', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请选择您的性别', trigger: 'blur' }
        ]
      }
    }
  },
  methods : {

  }
}
</script>

<style scoped>

</style>
