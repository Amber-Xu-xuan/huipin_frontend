<template>
    <div style="padding-top: 20px;padding-left: 20px">
      <el-form>
        <el-form-item label="是否找到工作" prop="isFindJobDate">
          <el-radio-group v-model="isFindJobDate">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="找到工作时间" required v-if="isFindJobDate">
          <el-form-item prop="workDate">
            <el-date-picker type="date" placeholder="请选择时间" v-model="findJobDate"
            ></el-date-picker>
          </el-form-item>

        </el-form-item>
        <!--未完善-->
        <el-form-item>
          <el-button type="primary" @click="submitForm('resume')">提交</el-button>
          <el-button @click="resetForm('resume')">重置</el-button>
        </el-form-item>
      </el-form>

    </div>
</template>

<script>
export default {
  name: 'SetStatus',
  data () {
    return {
      isFindJobDate: false,
      findJobDate:''
    }
  },
  methods :{
    submitForm() {

    },
    resetForm() {

    }
  }
}
</script>

<style scoped>

</style>
