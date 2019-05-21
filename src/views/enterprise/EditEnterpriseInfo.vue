<template>
    <!--修改企业信息 :rules="rules" -->
  <div class="xxcenter-content">
    <el-form :model="editForm" :rules="rules" ref="editForm" label-width="100px" class="register-form">

      <el-form-item label="手机号码">
        {{enterpriseMessage.emphone}}
      </el-form-item>

      <el-form-item label="公司名称" prop="emName">
        <el-input v-model="enterpriseMessage.emName"></el-input>
      </el-form-item>



      <el-form-item label="公司简介" prop="emintroduce">
        <el-input  type="textarea" autosize v-model="enterpriseMessage.emintroduce"></el-input>
      </el-form-item>


      <el-form-item label="电子邮件">
        <el-input v-model="enterpriseMessage.ememail"></el-input>
      </el-form-item>

      <!--<el-form-item label="密码" prop="pass">-->
        <!--<el-input type="password" v-model="editForm.pass" autocomplete="off"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="确认密码" prop="checkPass">-->
        <!--<el-input type="password" v-model="editForm.checkPass" autocomplete="off"></el-input>-->
      <!--</el-form-item>-->

      <el-form-item label="公司所在地" prop="residenceAddress">
        <!--<v-distpicker :province="editForm.residenceAddress.province" :city="editForm.residenceAddress.city" :area="editForm.residenceAddress.area" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>-->
        <el-input v-model="enterpriseMessage.emaddress" autocomplete="off"></el-input>
      </el-form-item>
      <!--<el-form-item label="创立日期" required>-->
        <!--<el-col :span="11">-->
          <!--<el-form-item prop="emstablishmentDate">-->
            <!--<el-date-picker type="date" placeholder="选择日期" v-model="editForm.emstablishmentDate"-->
                            <!--style="width: 100%;"></el-date-picker>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-form-item>-->
      <el-form-item label="融资情况">

        <el-select v-model="enterpriseMessage.emFinancing" placeholder="融资情况"  class="register">
          <el-option
            v-for="(financing,index) in editForm.editCondition.financingList"
            :key="index"
            :value="financing.financing">
          </el-option>
        </el-select>
      </el-form-item>

      <!--businessScope-->
      <!--<el-form-item label="经营类型">-->

        <!--<el-select v-model="enterpriseMessage.businessScope" placeholder="经营类型"  class="register">-->
          <!--<el-option-->
            <!--v-for="(businessScope,index) in editForm.editCondition.businessScope"-->
            <!--:key="index"-->
            <!--:value="businessScope.type">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->

      <el-form-item label="公司规模">
        <el-select v-model="enterpriseMessage.emScaleList"  placeholder="公司规模"  class="register">
          <el-option
            v-for="(companyScale,index) in editForm.editCondition.companyScaleList"
            :key="index"
            :value="companyScale.companyScale">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('editForm')">修改</el-button>
        <el-button @click="resetForm('editForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  name: 'EditenterpriseInfo',
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
    return{
      loading: '',
      //获得的企业信息
      enterpriseMessage: {
        emphone: '',
        emFinancing: ''
      },
      editForm: {
        // registerFinancing: '', // 融资情况
        // registerCompanyScale: '',
        // emstablishmentDate: '', // 创立日期
        // businessScope:'', //经营类型
        // emFinancing: '',// 公司规模
        // // residenceAddress: { province: '', city: '', area: '' },
        // emaddress: '',
        editCondition:
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


          },
      },
      rules: {
        emphone:[
          {validator: checkPhone, trigger: 'blur'},
        ],
        email: [
          {validator: checkEmail, trigger:'blur'},
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      console.log(this.enterpriseMessage)
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          // 验证成功后将数据转换成JSON格式传递到后端
          this.loading = true
          this.$message.info("正在提交数据")

          // 通过axios的post方法将表单数据传递给后端接口
          this.$axios.post('enterprise/editEnterprise',{
            enterprise: {
              eName: this.enterpriseMessage.emName,
              ephone: this.enterpriseMessage.emphone,
              ecreateTime: new Date().toLocaleDateString(),
              status: "注册后修改"
            },
            enterpriseMessage:{
              emName: this.enterpriseMessage.emName,
              emphone: this.enterpriseMessage.emphone,
              emintroduce: this.enterpriseMessage.emintroduce, //公司简介
              emFinancing: this.enterpriseMessage.emFinancing, // 融资情况
              emScaleList: this.enterpriseMessage.emScaleList, // 公司规模
              ememail: this.enterpriseMessage.email,
              // businessScope: this.enterpriseMessage.businessScope, //经营类型
              emaddress: this.enterpriseMessage.emaddress,
            }
          }).then(
            result => {
              this.responseResult = JSON.stringify(result.data)
              this.loading = false
              console.log( this.responseResult)
              if (result.data.code === 200) {
                this.$message.success("修改成功，请重新登录")
                localStorage.clear();
                this.$router.push("/login")
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
      this.$refs.editForm.resetFields();
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
        this.enterpriseMessage = res.data[0]
        console.log(res.data[0])
      })
        .catch(function (error) {
          alert(error)
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
