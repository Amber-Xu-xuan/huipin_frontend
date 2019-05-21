<template>
  <!--修改企业信息 :rules="rules" -->
  <div class="xxcenter-content">
    <el-form :model="selfDescriptionForm" :rules="rules" ref="selfDescriptionForm" label-width="100px" class="register-form">

      <el-form-item label="个人描述" prop="introduce">
        <el-input  type="textarea" autosize min-row="5" v-model="selfDescriptionForm.introduce"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="loading" @click="submitForm('selfDescriptionForm')">修改</el-button>
        <el-button @click="resetForm('selfDescriptionForm')">重置</el-button>
      </el-form-item>

      <span class="font">参考样式</span>
      <div class="example-content">
        <p class="example-content_name">
          <img src="https://www.lgstatic.com/common/image/pc/default_girl_headpic3.png">
          <span>java</span>
        </p>
        <p class="example-content_des">本人有6年工作经验，意向电商或高并发，责任心非常强，耐力持久，热爱技术，皮实。本人符合程序员特征内敛、灵活、执着。热衷于技术，崇尚科技改变世界。</p>
      </div>


    </el-form>
  </div>
</template>

<script>
export default {
  name: 'EditSelfDescription',
  data () {
    return{
      loading:false,
      selfDescriptionForm: {
      },
      rules: {
        introduce: [
          { required: true, message: '请输入个人描述' , trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs.selfDescriptionForm.validate((valid) => {
        if (valid) {
          // 验证成功后将数据转换成JSON格式传递到后端
          this.loading = true
          this.$message.info("正在提交数据")
          var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
          if (loginCandidatePhone === null){
            alert("请重新登录您的个人账号")
          }
            // 通过axios的post方法将表单数据传递给后端接口
            this.$axios.post('/candidate/editSelfDescription',{
              introduce:this.selfDescriptionForm.introduce,
              phone:loginCandidatePhone
            }).then(
              result => {
                this.responseResult = JSON.stringify(result.data)
                this.loading = false
                if (result.data.code === 200) {
                  this.$message.success('提交成功！')
                }else{
                  this.loading = false
                  this.$message.error(result.data.message + '请重新输入')
                }
              }
            ).catch(function (error) {
              console.log(error)
              this.loading = false
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
  //   //  页面挂载时加载信息
    getSelfDescription(){
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      if (loginCandidatePhone === null){
        alert("请重新登录您的个人账号")
      }
      this.$axios.post('/candidate/getCandidateMessageByPhone', {
        phone:loginCandidatePhone
        }
      ).then((result) => {
        this.selfDescriptionForm = result.data.data[0]
        console.log( result.data.data[0])
      })
        .catch(function (error) {
          alert(error)
        })
    }
  },
  mounted () {
    this.getSelfDescription()
  }
}
</script>

<style scoped>
  /*<!--示例-->*/
  .example-content {
    background: #FAFAFA;
    border-radius: 3px;
    padding: 20px;
  }

  .example-content .example-content_name {
    display: flex;
    align-items: center;
  }
  .example-content .example-content_des {
    font-size: 14px;
    color: #666;
    line-height: 24px;
    margin-top: 10px;
  }
  /*示例图片*/
  .example-content .example-content_name img {
    display: block;
    height: 30px;
    width: 30px;
    margin-right: 10px;
  }
  img {
    border: 0;
    vertical-align: top;
    display: inline-block;
  }
  .font{
    font-size: 14px;
    color: #666;
  }
</style>

