<template>
  <div class="register-content">
    <myHeader></myHeader>
    <el-form :model="registerForm" :rules="rules" ref="registerForm" label-width="100px" class="register-form">
      <div class="register-font">注册</div>

      <el-form-item label="公司名称" prop="emName" required>
        <el-input v-model="registerForm.emName"></el-input>
      </el-form-item>

      <el-form-item label="手机号码" prop="emphone" required>
        <el-input v-model="registerForm.emphone"></el-input>
      </el-form-item>


      <el-form-item label="电子邮件" prop="email" required>
        <el-input v-model="registerForm.email"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="pass" required>
        <el-input type="password" v-model="registerForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" required>
        <el-input type="password" v-model="registerForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="公司所在地" prop="residenceAddress" required>
        <!--<el-select v-model="registerForm.residenceAddress" placeholder="请选择活动区域" value="">-->
          <!--<el-option label="陕西" value="陕西"></el-option>-->
          <!--<el-option label="山东" value="山东"></el-option>-->
          <!--<el-option label="福建" value="福建"></el-option>-->
        <!--</el-select>-->
          <v-distpicker :province="registerForm.residenceAddress.province" :city="registerForm.residenceAddress.city" :area="registerForm.residenceAddress.area"></v-distpicker>
      </el-form-item>
      <el-form-item label="创办日期" required>
        <el-col :span="11">
          <el-form-item prop="emstablishmentDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.emstablishmentDate"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <!--<el-col class="line" :span="2">-</el-col>-->
        <!--<el-col :span="11">-->
          <!--<el-form-item prop="date2">-->
            <!--<el-time-picker type="fixed-time" placeholder="选择时间" v-model="registerForm.date2"-->
                            <!--style="width: 100%;"></el-time-picker>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      </el-form-item>
      <el-form-item label="融资情况">

        <el-select v-model="registerForm.registerFinancing" placeholder="融资情况"  class="register">
          <el-option
            v-for="(financing,index) in registerForm.registerCondition.financingList"
            :key="index"
            :value="financing.financing">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="公司规模">
        <el-select v-model="registerForm.registerCompanyScale"  placeholder="公司规模"  class="register">
          <el-option
            v-for="(companyScale,index) in registerForm.registerCondition.companyScaleList"
            :key="index"
            :value="companyScale.companyScale">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="性别" prop="gender" required>
        <el-radio-group v-model="registerForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">立即创建</el-button>
        <el-button @click="resetForm('registerForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
  import myHeader from '@/components/ZPHeader'
  export default {
    name: 'EnterpriseRegister',
    components: {myHeader,VDistpicker},
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
      return {
        registerForm: {
          emName: '',
          emphone: '',
          email: '',
          pass: '',
          checkPass:'',
          registerFinancing: '', // 融资情况
          registerCompanyScale: '', // 公司规模
          emstablishmentDate: '', // 创立日期
          residenceAddress: { province: '', city: '', area: '' },
          registerCondition:
            {
              financingList : [
                {
                  financing: '不限'
                },
                {
                  financing: '未融资'
                },
                {
                  financing: '天使轮'
                },
                {
                  financing: 'A轮'
                },
                {
                  financing: 'A轮'
                },
                {
                  financing: 'C轮'
                },
                {
                  financing: 'D轮及以上'
                },
                {
                  financing: '已上市'
                },
                {
                  financing: '不需要融资'
                }
              ],
              companyScaleList: [
                {
                  companyScale: '不限'
                },
                {
                  companyScale: '0-20人'
                },
                {
                  companyScale: '20-99人'
                },
                {
                  companyScale: '100-499人'
                },
                {
                  companyScale: '500-999人'
                },
                {
                  companyScale: '500-999人'
                },
                {
                  companyScale: '1000-9999人'
                },
                {
                  companyScale: '10000人以上'
                }
              ]
            },
        },
        rules: {
          emName: [
            { required: true, message: '请输入您的公司名称', trigger: 'blur' }
          ],
          residenceAddress: [
            { required: true, message: '请选择您的公司地址', trigger: 'change' }
          ],
          emstablishmentDate: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' },
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          pass: [
            { required: true, message: '请输入您的密码', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请再一次输入您的密码', trigger: 'blur' }
          ],
          emphone:[
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
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            this.$message.error('验证失败，请重新检查您输入的信息')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  .register-form{
    margin: 100px;
    background: #FFF;
    padding: 50px;
    box-shadow: 3px 0 10px 5px #9bceeb;
    border-radius: 20px;
  }
  .register-font{
    font-size: 30px;
    font-weight: 900;
    display: flex;
    justify-content: center;
    margin: 20px 0;
    color: #999;
  }
</style>
