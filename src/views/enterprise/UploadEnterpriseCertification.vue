<template>
  <div class="xxcenter-content">
    <el-form :model="workExperience" :rules="rules" ref="workExperience" label-width="100px" class="register-form">

      <el-form-item label="营业执照号码" prop="businessLicense" required>
        <el-input v-model="businessLicenseke"></el-input>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name: 'UploadEnterpriseCertification'
}
</script>

<style scoped>

</style>
