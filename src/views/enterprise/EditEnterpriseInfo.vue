<template>
    <!--修改企业信息 :rules="rules" -->
  <div class="xxcenter-content">
  <el-form :model="enterpriseInfo" ref="enterpriseInfo" label-width="100px" class="register-form">

    <el-form-item label="公司名称" required>
      <el-input v-model="enterpriseInfo.emName"></el-input>
    </el-form-item>

    <el-form-item label="公司简介" required>
      <el-input v-model="enterpriseInfo.emintroduce"></el-input>
    </el-form-item>

    <!--<el-form-item label="公司总人数" prop="emnum" required>-->
      <!--<el-input v-model="enterpriseInfo.emnum"></el-input>-->
    <!--</el-form-item>-->


    <el-form-item label="经营类型" required>
      <el-input v-model="enterpriseInfo.businessScope"></el-input>
    </el-form-item>


    <el-form-item label="手机号" required>
      <el-input v-model="enterpriseInfo.emphone"></el-input>
    </el-form-item>

    <el-form-item label="公司地址" required>
        <v-distpicker :province="emAddress.select.province" :city="emAddress.select.city" :area="emAddress.select.area"></v-distpicker>
    </el-form-item>

    <el-form-item label="创立日期" required>
      <el-col :span="11">
        <el-form-item prop="emstablishmentDate">
          <el-date-picker type="date" placeholder="选择日期" v-model="enterpriseInfo.emstablishmentDate"
                          style="width: 100%;"></el-date-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="融资情况">
      <el-select v-model="enterpriseInfo.emFinancing" placeholder="融资情况">
        <el-option
          v-for="(financing,index) in financingList"
          :key="index"
          :value="financing.financing">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="公司规模">
      <el-select v-model="enterpriseInfo.emCompanyScale" placeholder="公司规模" >
        <el-option
          v-for="(companyScale,index) in companyScaleList"
          :key="index"
          :value="companyScale.companyScale">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="性别" required>
      <el-radio-group v-model="enterpriseInfo.gender">
        <el-radio label="男"></el-radio>
        <el-radio label="女"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('enterpriseInfo')">立即创建</el-button>
      <el-button @click="resetForm('enterpriseInfo')">重置</el-button>
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
    return{
      enterpriseInfo : {
        emName: '',
        emintroduce: '',
        businessScope: '',
        emScale: '',//公司规模
        emphone: '',


      },
      emAddress: {
        select: { province: '', city: '', area: '' },
      },
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
    }
  }
}
</script>

<style scoped>

</style>
