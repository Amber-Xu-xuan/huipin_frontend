<template>
  <div class="xxcenter-content">
    <h3>{{this.titleString}}</h3>
    <el-form :model="businessInformation" :rules="rules" ref="businessInformation" label-width="100px" class="register-form">
      <el-form-item label="公司简称">
       {{businessInformation.eName}}
      </el-form-item>
      <el-form-item label="公司全称" prop="eFullName" required >
        <el-input v-model="businessInformation.eFullName"></el-input>
      </el-form-item>
      <el-form-item label="法人代表" prop="legalRepresentative"  required>
        <el-input v-model="businessInformation.legalRepresentative"></el-input>
      </el-form-item>

      <el-form-item label="注册资本" prop="registeredCapital" required >
        <el-input  type="textarea" autosize v-model="businessInformation.registeredCapital"></el-input>
      </el-form-item>

      <el-form-item label="成立时间" prop="establishmentTime" required>

          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="businessInformation.establishmentTime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
                          style="width: 100%;"></el-date-picker>
      </el-form-item>


      <el-form-item label="企业类型" prop="enterprisesType" required >
        <el-input v-model="businessInformation.enterprisesType"></el-input>
      </el-form-item>

      <el-form-item label="经营状态" prop="managementState" required >
        <el-input v-model="businessInformation.managementState"></el-input>
      </el-form-item>
      <el-form-item label="统一信用代码" prop="unifiedCreditCode" required >
        <el-input v-model="businessInformation.unifiedCreditCode"></el-input>
      </el-form-item>

      <el-form-item label="注册地址" prop="registeredAddress" required >
        <!--<v-distpicker :province="registeredAddress.province" :city="registeredAddress.city" :area="registeredAddress.area" @province="onChangeProvince" @city="onChangeCity" @area="onChangeArea"></v-distpicker>-->
        <el-input v-model="businessInformation.registeredAddress"></el-input>
      </el-form-item>
      <!--经营范围-->
      <el-form-item label="经营范围" prop="businessScope" required>
        <el-input type="textarea" autosize rows="4" v-model="businessInformation.businessScope"
                  placeholder="计算机、网络、通信质统软请显选敌、研究，通信设万，计算机及配请显销售。（品业体法下主相择经营项带，选支经营活动；体法个经批准显项带，经严关导还批准石体批准显内容选支经营活动；紧得从事本亚民业克策禁式和限制仍项带显经营活动。）"></el-input>
      </el-form-item>
      <el-form-item label="天眼查网址" prop="tianYanCha" required >
        <el-input v-model="businessInformation.tianYanCha"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('businessInformation')">提交</el-button>
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
    return{
      //验证规则
      rules: {
        eFullName: [
          {required: true, message: '请输入公司全称', trigger: 'blur'}
        ],
        legalRepresentative: [
          {required: true, message: '请输入法人代表', trigger: 'blur'}
        ],
        registeredCapital: [
          {required: true, message: '请输入注册资本', trigger: 'blur'}
        ],
        establishmentTime: [
          {required: true, message: '请选择成立时间', trigger: 'blur'}
        ],
        enterprisesType: [
          {required: true, message: '请输入企业类型', trigger: 'blur'}
        ],
        managementState: [
          {required: true, message: '请输入经营状态', trigger: 'blur'},
        ],
        unifiedCreditCode: [
          {required: true, message: '请输入统一信用代码', trigger: 'blur'}
        ],
        registeredAddress: [
          {required: true, message: '请输入注册地址', trigger: 'blur'},
        ],
        businessScope: [
          {required: true, message: '请输入经营范围', trigger: 'blur'},
        ],
        tianYanCha: [
          {required: true, message: '请输入天眼查网址', trigger: 'blur'},
        ]
      },
      loading: '',
      //获取后端工商信息为空时，赋值给这个数据。
      businessInformationData: {},
      //标题字符串，当从后端获取的数据为空时，titleString
      titleString: '',
      registeredAddress:'',
      businessInformation: {
        ePhone: '',
        eName: '',
        eFullName: '',
        legalRepresentative: '',
        registeredCapital: '',
        managementState: '',
        establishmentTime: '',
        enterprisesType: '',
        unifiedCreditCode: '',
        businessScope:'', //经营类型
        updateTime: '',
        // emFinancing: '1',
        tianYanCha: '',
        registeredAddress: '',
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs.businessInformation.validate((valid) => {
        if (valid) {
          // 验证成功后将数据转换成JSON格式传递到后端
          this.loading = true
          this.$message.info("正在提交数据")
          var loginEnterprisePhone = localStorage.getItem('loginEnterprisePhone')
          if(this.businessInformationData === null){
          //  添加
            this.$axios.post('enterprise/addBusinessInformation',{
              ePhone: loginEnterprisePhone,
              eName: this.businessInformation.eName,
              eFullName: this.businessInformation.eFullName,
              legalRepresentative: this.businessInformation.legalRepresentative,
              registeredCapital: this.businessInformation.registeredCapital,
              managementState: this.businessInformation.managementState,
              establishmentTime: this.businessInformation.establishmentTime,
              enterprisesType: this.businessInformation.enterprisesType,
              unifiedCreditCode: this.businessInformation.unifiedCreditCode,
              businessScope: this.businessInformation.businessScope, //经营类型
              updateTime: new Date().toLocaleDateString(),
              // emFinancing: this.businessInformation.emFinancing,
              tianYanCha: this.businessInformation.tianYanCha,
              isVerification: '未通过验证',
              registeredAddress: this.businessInformation.registeredAddress
            }).then(
              result => {
                this.responseResult = JSON.stringify(result.data)
                this.loading = false
                console.log( this.responseResult)
                if (result.data.code === 200) {
                  this.$message.success('提交成功！等待审核..')
                }else{
                  this.$message.error(result.data.message + '请重新输入')
                }
              }
            ).catch(function (error) {
              console.log(error)
              // this.loading = false
            })
          }else {
            //  修改
            var loginEnterprisePhone = localStorage.getItem('loginEnterprisePhone')
            this.$axios.post('enterprise/updateBusinessInformation', {
              ePhone: loginEnterprisePhone,
              eName: this.businessInformation.eName,
              eFullName: this.businessInformation.eFullName,
              legalRepresentative: this.businessInformation.legalRepresentative,
              registeredCapital: this.businessInformation.registeredCapital,
              managementState: this.businessInformation.managementState,
              establishmentTime: this.businessInformation.establishmentTime,
              enterprisesType: this.businessInformation.enterprisesType,
              unifiedCreditCode: this.businessInformation.unifiedCreditCode,
              businessScope: this.businessInformation.businessScope, //经营类型
              updateTime: new Date().toLocaleDateString(),
              // emFinancing: this.businessInformation.emFinancing,
              tianYanCha: this.businessInformation.tianYanCha,
              registeredAddress: this.businessInformation.registeredAddress
            }).then(
              result => {
                this.responseResult = JSON.stringify(result.data)
                this.loading = false
                console.log(this.responseResult)
                if (result.data.code === 200) {
                  this.$message.success('提交成功！等待审核中')
                } else {
                  this.$message.error(result.data.message + '请重新输入')
                }
              }
            ).catch(function (error) {
              console.log(error)
              // this.loading = false
            })
          }


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
    getBusinessInformation(){
      var loginEnterprise = JSON.parse(localStorage.getItem('loginEnterprise'))
      console.log(loginEnterprise)
      if (loginEnterprise === null) {
        this.$message.error("请先登录您的账号或完善您的信息")
       // alert("请先登录您的账号或完善您的信息")
      }else{
        this.businessInformation.eName = loginEnterprise.eName
        this.$axios.get('enterprise/getBusinessInformationByEName', {
            params:{
              eName: loginEnterprise.eName
            }
          }
        ).then((result) => {
          // var res = result.data
          // this.businessInformation = res.data[0]
          if(result.data.code === 200){
            if(result.data.data === null){
              this.businessInformation.eName = loginEnterprise.eName
              //特殊的赋值返回结果
              this.businessInformationData = result.data.data
              this.titleString = '添加'
            }else{
              this.businessInformation = result.data.data
              this.businessInformationData = result.data.data
              this.titleString = '修改'
            }
          }else{
            this.$message.error(result.data.message)
          }
          console.log(result.data)
        })
          .catch(function (error) {
            console.log(error)
          })
      }
      }

  },

  mounted () {
    this.getBusinessInformation()
  }
}
</script>

<style scoped>

</style>
