<template>

  <div class="xxcenter-content">
    <el-row :gutter="5" class="enterprise-row-margin">
      <!--:offset="index > 0 ? 2 : 0"-->
      <el-col :span="4" v-for="(enterprise, index) in enterpriseList" :key="enterprise.index">
        <el-card>
          <img :src="enterprise.img" class="image">
          <div style="padding: 1px;">
            <span>{{enterprise.name}}</span>
            <div class="bottom clearfix">
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'DiliveryResumeEnterprise',
  data(){
    return {
      enterpriseList: [
        {
          name: '阿里巴巴',
          img: 'https://img.bosszhipin.com/beijin/mcs/bar/20180906/5fd9804307c9e266559d8c4c911d228fbe1bd4a3bd2a63f070bdbdada9aad826.png?x-oss-process=image/resize,w_120,limit_0'
        }, {
          name: '百度',
          img: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20190228/a83fc908c1bcb5510b35da79ebc74a9286b6a9e98aa8f150dd17e2f5328c5178.jpg?x-oss-process=image/resize,w_120,limit_0'
        },
        {
          name: '腾讯',
          img: 'https://img.bosszhipin.com/beijin/mcs/bar/brand/109.jpg?x-oss-process=image/resize,w_120,limit_0'
        },
        {
          name: '京东数字科技',
          img: 'https://img.bosszhipin.com/beijin/mcs/chatphoto/20181203/edd5783606744772f3d55fda265b5fc7cfcd208495d565ef66e7dff9f98764da.jpg?x-oss-process=image/resize,w_120,limit_0'
        },
        {
          name: '小米',
          img: 'https://img.bosszhipin.com/beijin/mcs/bar/brand/84270.jpg?x-oss-process=image/resize,w_120,limit_0'
        }, {
          name: 'OPPO',
          img: 'https://img.bosszhipin.com/beijin/logo/0181f814e6ac2d0d826b403e8235c8f9be1bd4a3bd2a63f070bdbdada9aad826.jpg?x-oss-process=image/resize,w_120,limit_0'
        }
    ]
    }
  }
}
</script>

<style scoped>

</style>
