<template>
    <!--修改企业信息-->
  <el-form :model="EnterpriseInfo" :rules="rules" ref="EnterpriseInfo" label-width="100px" class="register-form">
    <div class="register-font">注册</div>

    <el-form-item label="公司名称" prop="emName" required>
      <el-input v-model="EnterpriseInfo.emName"></el-input>
    </el-form-item>

    <el-form-item label="公司简介" prop="emintroduce" required>
      <el-input v-model="EnterpriseInfo.emintroduce"></el-input>
    </el-form-item>

    <!--<el-form-item label="公司总人数" prop="emnum" required>-->
      <!--<el-input v-model="EnterpriseInfo.emnum"></el-input>-->
    <!--</el-form-item>-->


    <el-form-item label="经营类型" prop="businessScope" required>
      <el-input v-model="EnterpriseInfo.businessScope"></el-input>
    </el-form-item>


    <el-form-item label="公司规模" prop="emScale" required>
      <el-select v-model="emScale" placeholder="公司规模">
        <el-option
          v-for="(companyScale,index) in enterpriseInfo.emScale"
          :key="index"
          :value="companyScale.companyScale">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="手机号" prop="emphone" required>
      <el-input v-model="EnterpriseInfo.emphone"></el-input>
    </el-form-item>

    <el-form-item label="公司地址" prop="emaddress" required>
        <v-distpicker :province="emaddress.select.province" :city="emaddress.select.city" :area="emaddress.select.area"></v-distpicker>
    </el-form-item>

    <el-form-item label="创立日期" required>
      <el-col :span="11">
        <el-form-item prop="emstablishmentDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="EnterpriseInfo.emstablishmentDate"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="融资情况">login
      <el-select v-model="emFinancing" placeholder="融资情况">
        <el-option
          v-for="(financing,index) in enterpriseInfo.financingList"
          :key="index"
          :value="financing.financing">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="公司规模">
      <el-select v-model="emCompanyScale" placeholder="公司规模" >
        <el-option
          v-for="(companyScale,index) in enterpriseInfo.companyScaleList"
          :key="index"
          :value="companyScale.companyScale">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="性别" prop="gender" required>
      <el-radio-group v-model="EnterpriseInfo.gender">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('EnterpriseInfo')">立即创建</el-button>
      <el-button @click="resetForm('EnterpriseInfo')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import VDistpicker from 'v-distpicker'
export default {
  name: 'EditEnterpriseInfo',
  components: { VDistpicker },
  data () {
    return{
      editenterpriseInfo : {
        emName: '',
        emintroduce: '',
        businessScope: '',
        emScale: '',
        emphone: '',
        emaddress: {

        },

      }
    }
  }
}
</script>

<style scoped>

</style>
