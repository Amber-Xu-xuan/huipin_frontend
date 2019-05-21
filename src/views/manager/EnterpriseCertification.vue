<template>
    <!--管理员将企业进行认证之后企业的信息才能对外公布-->
  <section class="xxcenter-content">

    <!--列表-->
    <el-table ref="businessInfoList" :data="businessInfoList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="eName" label="公司简称" width="220">
      </el-table-column>
      <el-table-column prop="eFullName" label="公司全称" width="200" >
      </el-table-column>
      <el-table-column prop="legalRepresentative" label="法人代表" width="200" >
      </el-table-column>
      <el-table-column prop="registeredCapital" label="注册资本" width="200" sortable>
      </el-table-column>
      <el-table-column prop="establishmentTime" label="成立时间" width="200" sortable>
      </el-table-column>
      <el-table-column prop="enterprisesType" label="企业类型" width="200" >
      </el-table-column>
      <el-table-column prop="managementState" label="经营状态" width="200" >
      </el-table-column>

      <el-table-column prop="unifiedCreditCode" label="统一信用代码" width="200" >
      </el-table-column>
      <el-table-column prop="registeredAddress" label="注册地址" width="200" >
      </el-table-column>
      <el-table-column prop="businessScope" label="经营范围" width="200" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="tianYanCha" label="天眼查网址" width="200" >
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <div style="margin: 20px;">
          <el-button size="small" @click="passBusinessInfo(scope.$index, scope.row)">审核通过</el-button>
          </div>
          <el-button type="danger" size="small" @click.native.prevent="handleEdit(scope.$index, scope.row)">通知企业验证失败</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-col :span="24" class="toolbar">
      <!--<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>-->
      <!--<el-pagination-->
      <!--layout="prev, pager, next"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="pageConf.pageCode"-->
      <!--:page-sizes="pageConf.pageOption"-->
      <!--:page-size="pageConf.pageSize"-->
      <!--:total="pageConf.totalPage"-->

      <!--style="float:right;">-->
      <!--&lt;!&ndash; layout="total, sizes, prev, pager, next, jumper"-->
      <!--@size-change="handleSizeChange"-->
      <!--:current-page="pageConf.pageCode"-->
      <!--:page-sizes="pageConf.pageOption"-->
      <!--:page-size="pageConf.pageSize"-->

      <!--:total="total"-->

      <!--&ndash;&gt;-->
      <!--</el-pagination>-->
    </el-col>
    <!--通知企业用户界面-->
    <el-dialog title="通知企业用户" :visible.sync="notifyFormVisible" :close-on-click-modal="false">
      <el-form :model="notifyForm" label-width="80px" ref="notifyForm">
        <el-form-item label="审核结果" prop="platform">
          <el-input type="textarea" autosize rows="5" v-model="notifyForm.info" auto-complete="off" placeholder="输入通知企业需要修改的内容,如：企业名称与实际不符"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="notifyFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="notifyEnterpriseBusinessInfoIsWrong" :loading="notifyLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>


<script>
//导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/**
 * 企业管理职位信息
 */
export default {
  name: 'EnterpriseCertification',
  data () {
    return {
      filters: {
        eName: ''
      },
      businessInfoList: [],
      loginPhone: '',
      //登录的用户信息
      // total: 0,
      // pageNumber: 1, //当前页
      listLoading: false,
      sels: [],//列表选中列

      // 当前修改行的数据
      rowData: {},
      //定义分页Config
      pageConf: {
        //设置一些初始值(会被覆盖)
        pageCode: 1, //当前页
        pageSize: 2, //每页显示的记录数
        totalPage: 12, //总记录数
        pageOption: [4, 10, 20], //分页选项
      },
      //通知企业用户，

      notifyFormVisible: false,
      notifyForm: {},
      notifyLoading: false,
      //编辑界面数据
      passBusinessInfoForm: {
        eName: '',
        eFullName: '',
        bId:'',
        legalRepresentative:'',
        registeredCapital:'',
        establishmentTime:'',
        enterprisesType:'',
        managementState:'',
        registeredAddress:'',
        unifiedCreditCode:'',
        businessScope:'',
        updateTime:'',
        isVerification:'',
        tianYanCha:'',
        ephone:''
      }
    }
  },
  methods: {
    //当前页改变时触发的函数,下一页或上一页
    handleCurrentChange (val) {
      // this.pageNumber = val;
      this.getBusinessInfoByIsVerification(val, this.pageConf.pageSize)
    },
    getBusinessInfoByIsVerification (pageCode, pageSize) {
      var loginAdminPhone = localStorage.getItem('loginAdminPhone')
      this.$axios.post('manager/getBusinessInfoByIsVerification',
        {
          pageCode: this.pageConf.pageCode,
          pageSize: this.pageConf.pageSize,
          phone: loginAdminPhone
        }).then((res) => {
        if(res.data.code === 200){
          this.pageConf.totalPage = res.data.total
          this.businessInfoList = res.data.data.rows
        }else {
          this.$message.error(res.data.message + '请重新登录账号')
        }
      })
    },
    //通知界面显示
    handleEdit: function (index, row) {
      this.notifyFormVisible = true
      this.notifyForm = Object.assign({}, row)
      this.rowData = row
    },
    //通知企业修改工商信息，未通过，+理由
    notifyEnterpriseBusinessInfoIsWrong: function () {
      var loginAdminPhone = localStorage.getItem('loginAdminPhone')
        this.notifyLoading = true
        NProgress.start();
      console.log(this.rowData.bId + ":::" + this.notifyForm.info)
        this.$axios.put('manager/notifyEnterpriseBusinessInfoIsWrong',
          {
              id: this.rowData.bId,
            phone:loginAdminPhone,
            info:this.notifyForm.info
          }
        )
          .then((res) => {

            if(res.data.code === 200) {
              this.notifyLoading = false
              this.notifyFormVisible = false
              NProgress.done();
              this.$message({
                message: '通知成功',
                type: 'success'
              })
              this.$refs['notifyForm'].resetFields()
            }else {
              this.notifyFormVisible = false
              this.$message.error(res.data.message + '发送通知失败')
            }
          }).catch((error) => {
        alert(error)
      })
    },

    passBusinessInfo: function (index,row) {
      //获取到对应的行数的数据信息
      // this.passBusinessInfoForm = row
      var loginAdminPhone = localStorage.getItem('loginAdminPhone')
      console.log(row.bId)
          this.$confirm('确认审核通过该企业工商信息吗？', '提示', {}).then(() => {
            NProgress.start();
            this.$axios.put("/manager/passBusinessInfo",{
              id: row.bId,
              phone: loginAdminPhone,
            }).then((res) => {
              NProgress.done();
              this.$message({
                message: '审核结果提交成功',
                type: 'success'
              })
              this.getBusinessInfoByIsVerification(this.pageConf.pageCode, this.pageConf.pageSize)
            })
          })
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    //批量删除,ing
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        // this.listLoading = true
        // NProgress.start();
        // let para = {ids: ids}
        batchRemoveUser(para).then((res) => {
          // this.listLoading = false
          NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getBusinessInfoByIsVerification(this.pageConf.pageCode, this.pageConf.pageSize)
        })
      }).catch(() => {

      })
    }
  },
  mounted () {
    this.getBusinessInfoByIsVerification(this.pageConf.pageCode, this.pageConf.pageSize)
  }

}
</script>
<style scoped>

</style>
