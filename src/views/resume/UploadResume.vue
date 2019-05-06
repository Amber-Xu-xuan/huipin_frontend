<template>
  <!--上传简历-->
  <!--:action，必选参数，上传的地址，String类型。data()需要使用代理转发，要不然会有跨域的问题

　　:data，上传时附带的额外参数，object类型。用于传递其他的需要携带的参数，比如下面的srid-->
<div class="xxcenter-content">
  <el-upload
    class="upload-file"
    drag
    :action="uploadResume"
    :data="data">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  </el-upload>

</div>
</template>

<script>
export default {
  name: 'UploadResume',
  data(){
    return {
      uploadResume:'/api/up/file',
      data: { time:new Date}
  }
  }
}
</script>

<style scoped>

</style>
