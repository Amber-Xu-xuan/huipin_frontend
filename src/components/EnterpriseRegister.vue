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

      <el-form-item label="公司简介" prop="emintroduce" required>
        <el-input  type="textarea" autosize v-model="registerForm.emintroduce"></el-input>
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
          <v-distpicker :province="registerForm.residenceAddress.province" :city="registerForm.residenceAddress.city" :area="registerForm.residenceAddress.area" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>
      </el-form-item>
      <el-form-item label="创立日期" required>
        <el-col :span="11">
          <el-form-item prop="emstablishmentDate">
            <el-date-picker type="date" placeholder="选择日期" v-model="registerForm.emstablishmentDate"
                            style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="融资情况">

        <el-select v-model="registerForm.emFinancing" placeholder="融资情况"  class="register">
          <el-option
            v-for="(financing,index) in registerForm.registerCondition.financingList"
            :key="index"
            :value="financing.financing">
          </el-option>
        </el-select>
      </el-form-item>

      <!--businessScope-->
      <el-form-item label="经营类型">

        <el-select v-model="registerForm.businessScope" placeholder="经营类型"  class="register">
          <el-option
            v-for="(businessScope,index) in registerForm.registerCondition.businessScope"
            :key="index"
            :value="businessScope.type">
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

      <el-form-item>
        <el-button type="primary" @click="submitForm('registerForm')">注册</el-button>
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
          // console.log(reg.test(value))
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
        } else if (value !== this.registerForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        registerForm: {
          loading: '',
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
                  financing: 'B轮'
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
              ],
              businessScope:[
                {
                  type:" IT·互联网"
                },
                {
                  type:" 金融"
                },
                {
                  type:" 房地产·建筑"
                },
                {
                  type:" 教育培训"
                },
                {
                  type:" 教育培训"
                },
                {
                  type:" 汽车"
                },
                {
                  type:" 娱乐传媒"
                },
                {
                  type:" 医疗健康"
                },
                {
                  type:" 法律咨询"
                },
                {
                  type:"  供应链·物流"
                },
                {
                  type:" 采购贸易"
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
            { required: true, message: '请再一次输入您的密码', trigger: 'blur' },
            { validator: validatePass2, trigger: 'blur' }
          ],
          emintroduce: [
            { required: true, message: '请输入公司简介', trigger: 'blur' }
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
      //当地址下拉框变化时获取地址值
      onChangeProvince(data) {
        this.registerForm.residenceAddress.province= data.value
      },
      onChangeCity(data) {
        this.registerForm.residenceAddress.city = data.value
      },
      onChangeArea(data){
        this.registerForm.residenceAddress.area= data.value
      },
      submitForm(formName) {
        // console.log(this.registerForm.emstablishmentDate.toLocaleDateString())
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            // 验证成功后将数据转换成JSON格式传递到后端
            this.loading = true
            this.$message.info("正在提交数据")

            // 通过axios的post方法将表单数据传递给后端接口
            this.$axios.post('/registerEnterprise',{
              enterprise: {
                eName: this.registerForm.emName,
                ephone: this.registerForm.emphone,
                epassword: this.registerForm.emName,
                ecreateTime: new Date().toLocaleDateString(),
                status: "注册"
              },
              enterpriseMessage:{
                emName: this.registerForm.emName,
                emphone: this.registerForm.emphone,
                emstablishmentDate: this.registerForm.emstablishmentDate.toLocaleDateString(),
                emintroduce: this.registerForm.emintroduce, //公司简介
                registerFinancing: this.registerForm.registerFinancing, // 融资情况
                emScaleList: this.registerForm.registerCompanyScale, // 公司规模
                ememail: this.registerForm.email,
                businessScope: this.registerForm.businessScope, //经营类型
                emaddress: this.registerForm.residenceAddress.province + this.registerForm.residenceAddress.city+this.registerForm.residenceAddress.area,
                emFinancing: this.registerForm.emFinancing,
              }
              }).then(
              result => {
                this.responseResult = JSON.stringify(result.data)
                this.loading = false
                // console.log( this.responseResult)
                if (result.data.code === 200) {
                  // 当验证成功后跳转到用户中心
                  this.$router.replace({path: '/login'})
                  this.$message.success('注册成功！！')
                }else{
                  this.$message.error(result.data.message + '请重新输入')
                }
              }
            ).catch(function (error) {
              // console.log(error)
              // this.loading = false
            })

          }else {
            this.$message.error('验证失败，请重新检查您输入的信息')
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs.registerForm.resetFields();
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
