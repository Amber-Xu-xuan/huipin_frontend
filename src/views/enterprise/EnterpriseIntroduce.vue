<template>
  <!--显示职位的卡片-->
  <div class="introduce-container">
    <el-row class="enterprise-content">
      <!-- v-for="item in enterpriseList" :key="item.jId"-->
      <!--<el-col :xs="24" :sm="24" :md="13" :lg="13" :xl="13">-->
        <div class="job-box">
          <div class="inner home-inner">
            <div class="company-sider">
              <!-- 快速登录注册 -->

              <div class="update-time">更新时间:{{businessInformation.updateTime}}</div>
            </div>

            <div class="job-detail">
              <div class="detail-content">
                <div class="job-sec">
                  <h3>{{enterpriseMessage.eName}}简介</h3>
                  <!-- style="max-height: none; overflow: visible;"-->
                  <div class="text fold-text">
                    {{enterpriseMessage.emintroduce}}
                    <!--<a href="javascript:;" class="more-view" ka="company-intro-more" style="display: inline;">-->
                      <!--{{extendFlag?'展开':'收起'}} <i class="fz fz-slidedown"></i>-->
                    <!--</a>-->
                  </div>
                </div>
                <div class="job-sec company-business">
                  <h3>工商信息</h3>
                  <h4>{{businessInformation.eName}}</h4>
                  <div class="business-detail" :class="extendsStyle">
                    <label><span v-on:click="changeExtendFlag">{{extendFlag?'展开':'收起'}}</span><i :class="extendsIcon"></i></label>
                    <ul >
                      <li><span class="t">法人代表：</span>{{businessInformation.legalRepresentative}}</li>
                      <li><span class="t">注册资本：</span>{{businessInformation.registeredCapital}}人民币</li>
                      <li><span class="t">成立时间：</span>{{emstablishmentDate}}</li>
                      <li class="col-auto"><span class="t">企业类型：</span>{{businessInformation.enterprisesType}}</li>
                      <li class="col-auto"><span class="t">经营状态：</span>{{businessInformation.managementState}}</li>
                      <li class="col-auto"><span class="t">注册地址：</span>{{businessInformation.registeredAddress}}</li>
                      <li class="col-auto"><span class="t">统一信用代码：</span>{{businessInformation.unifiedCreditCode}}</li>
                      <li class="col-auto"><span class="t">经营范围：</span>
                        {{businessInformation.businessScope}}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="job-sec">
                  <h3>公司地址</h3>
                  <div class="job-location">
                    <div class="location-item show-map">
                      <div class="location-address"><a href="javascript:;" class="more-view" ka="job-poi-1"><i class="fz fz-slidedown"></i></a>{{businessInformation.registeredAddress}}</div>
                      <div class="map-container js-open-detail" data-num="0" data-lat="118.182171,24.483892" data-id="map-container-1">
                        <img src="https://restapi.amap.com/v3/staticmap?zoom=16&amp;size=652*174&amp;markers=mid,0xFF0000,A:118.182171,24.483892&amp;key=21b56a6cc83fad7668dbb0e9564759a7" alt="公司地址">
                        <!--<p>点击查看地图</p>-->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      <!--</el-col>-->

    </el-row>
  </div>
  <!--显示职位的卡片-->
</template>

<script>
export default {
  name: 'EnterpriseIntroduce',
  data () {
    return{
      businessInformation :{},
      enterpriseMessage: {},
      emstablishmentDate:'',
    //  是否展开
      extendFlag: true,
      extendsStyle: '',
    //  展开的图标
      extendsIcon: ''
    }
  },
  methods : {
    getBusinessInformation () {
      this.eName = this.$route.query.eName
      this.$axios.get('/getBusinessInformation',
        {
          params: {
            eName: this.eName
          }
        }
          ).then((result) => {
        if(result.data.code === 200){
          this.businessInformation = result.data.data
          this.emstablishmentDate = result.data.data.emstablishmentDate
          console.log(this.businessInformation)
        }else{
          this.$message.error(result.data.message + "，跳转回首页")
          this.$router.push("/")
        }
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    getEnterpriseMessage () {
      this.eName = this.$route.query.eName
      // console.log("company::" + this.eName)
      this.$axios.get('/getEnterpriseByEName', {
          params:{
            eName: this.eName
          }
        }
      ).then((result) => {
        var res = result.data
        this.enterpriseMessage = res.data[0]
        // console.log(this.enterpriseMessage)
      })
        .catch(function (error) {
          console.log(error)
        })
    },


    //展开、收齐工商信息
    changeExtendFlag (){
      this.extendFlag = !this.extendFlag
      if(this.extendFlag === true){
        this.extendsStyle='business-detail'
        this.extendsIcon='el-icon-arrow-down'
      }else{
        this.extendsStyle='business-detail show-business-all '
        this.extendsIcon='el-icon-arrow-up'
      }
    }
  },
  mounted () {
    this.getBusinessInformation()
    this.getEnterpriseMessage()
  }
}
</script>

<style scoped>
.introduce-container{
  margin-left: 100px;
  min-width: 1000px;
}
  /*公司信息-container*/
  .job-box{
    margin-top: 20px;
  }
  /*右边显示内容*/
.company-sider, .job-sider {
  float: right;
  width: 298px;
  padding-bottom: 40px;
}
.job-detail .detail-content {
  clear: left;
}


.job-sec {
  position: relative;
}
.job-sec h3 {
  font-weight: 700;
  font-size: 15px;
  color: #424a5e;
}

.chat-sider h3, .job-sec h3, .secretary-sec h3 {
  font-size: 18px;
  font-weight: 400;
  color: #424a5e;
  line-height: 50px;
  padding: 0 0 10px 0;
  margin-top: 5px;
  margin-bottom: 0;
  /*background: url() 0 45px no-repeat;*/
}
.detail-content .text {
  word-break: break-all;
  word-wrap: break-word;
}
.job-sec .fold-text {
  max-height: 180px;
  overflow: hidden;
  position: relative;
}
.job-sec .text, .secretary-sec .text {
  color: #000;
  line-height: 36px;
  font-size: 14px;
}
  /*显示天眼查的内容*/
.business-detail {
  border: 1px #d9dadf solid;
  padding: 15px 25px;
  /*padding-right: 12px;*/
  border-radius: 8px;
  height: 35px;
  overflow: hidden;
}
li, ol, ul {
  list-style: none;
}
/*"来源于天眼查"的文字的样式*/
.company-business h4 span {
  float: right;
  font-size: 14px;
  color: #9fa3b0;
}
.company-business h4 {
  font-size: 16px;
  margin-bottom: 13px;
}
.job-sec h4 {
  font-size: 14px;
  font-weight: 400;
  line-height: 36px;
  color: #424a5e;
}
  /*公司地址*/
.show-map .location-address {
  cursor: default;
  background-position: 15px -1965px;
}

.location-address {
  display: block;
  background-position: 15px -420px;
  padding-left: 25px;
  color: #62687a;
  padding: 13px 15px 11px 35px;
  font-size: 15px;
  border-bottom: 1px #ecedef solid;
}
/*天眼查的信息列表格式*/
.business-detail ul {
  font-size: 0;
}
.business-detail li {
  display: inline-block;
  vertical-align: top;
  width: 220px;
  font-size: 14px;
  padding: 10px 0;
}
  /*展开*/
  .show-business-all{
    height: auto!important;
  }
.business-detail label {
  float: right;
  width: 54px;
  cursor: pointer;
  color: #9fa3b0;
  position: relative;
  top: 5px;
}
  /*天眼查信息的信息分类的标题*/
.business-detail .t {
  color: #9fa3b0;
  padding-right: 0;
}
.business-detail li.col-auto {
  width: auto;
  display: block;
}
.business-detail li {
  display: inline-block;
  vertical-align: top;
  width: 220px;
  font-size: 14px;
  padding: 10px 0;
}
  /*间隔线*/
.job-detail {
  position: relative;
  padding-right: 25px;
  border-right: 1px #f5f7f9 solid;
  margin-right: 322px;
  padding-bottom: 45px;
  min-height: 813px;
}
  /*更多*/
.job-sec .fold-text .more-view {
  position: absolute;
  bottom: 6px;
  right: 0;
  /*background: url(../images/layer-more.png) no-repeat;*/
  padding-left: 22px;
  color: #9fa3b0;
  line-height: 24px;
  display: none;
  z-index: 1001;
}
  /*更新时间*/
.company-sider .update-time {
  color: #d0d4da;
  line-height: 20px;
  margin-top: 20px;
}
</style>
