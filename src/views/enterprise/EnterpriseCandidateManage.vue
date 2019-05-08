<template>
  <section class="xxcenter-content">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.jName" placeholder="职位名称"></el-input>
        </el-form-item>
        <el-form-item>
          <!--this.pageConf.pageCode,this.pageConf.pageSize-->
          <el-button type="primary" v-on:click="getJobListByjName">查询
          </el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table ref="joblist" :data="joblist" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="jName" label="职位名称" width="120" sortable>
      </el-table-column>
      <el-table-column prop="jType" label="职位性质" max-width="180" min-width="50">
      </el-table-column>
      <el-table-column prop="jPublishDate" label="发布时间" min-width="100" sortable>
      </el-table-column>
      <el-table-column prop="stopRecruitDate" label="停止招聘时间" min-width="100" sortable>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" @click="handleRecruitmentSituation(scope.$index, scope.row)">查看招聘情况</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-col :span="24" class="toolbar">
      <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="pageConf.pageCode"
        :page-sizes="pageConf.pageOption"
        :page-size="pageConf.pageSize"
        :total="pageConf.totalPage"

        style="float:right;">
        <!-- layout="total, sizes, prev, pager, next, jumper"
         @size-change="handleSizeChange"
          :current-page="pageConf.pageCode"
            :page-sizes="pageConf.pageOption"
             :page-size="pageConf.pageSize"

             :total="total"

         -->
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="职位名称" prop="jName">
          <el-input v-model="editForm.jName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="停止招聘">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.stopRecruitDate"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <!--职位性质： 实习 -->
        <el-form-item label="职位性质" prop="jType">
          <el-select v-model="editForm.jType" placeholder="职位性质">
            <el-option
              v-for="(jType,index) in selectCondition.jTypeList"
              :key="index"
              :label="jType.jType"
              :value="jType.jType">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editJob" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--显示招聘情况界面 -->
    <el-dialog title="招聘情况" :visible.sync=" recruitmentSituationDialogVisible" :close-on-click-modal="false">
      显示招聘情况，未完善

      <div slot="footer" class="dialog-footer">
        <el-button @click.native=" recruitmentSituationDialogVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addJob" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
// import util from '/util.js'
// import { removeJob, batchRemoveUser, editUser, addUser } from 'src/apis/api'
//导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/**
 * 企业管理职位信息
 */
export default {
  name: 'CandidateManage',
  data () {
    return {
      filters: {
        jName: ''
      },
      joblist: [],
      // joblist: {},
      loginPhone: '',
      //登录的用户信息
      loginEnterprise:{},
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

      editFormVisible: false,//编辑界面是否显示
      editLoading: false,
      editFormRules: {
        jName: [
          {required: true, message: '请输入岗位名称', trigger: 'blur'}
        ]
      },
      //编辑界面数据
      editForm: {
        jName: '',
        salary: '',
        experienceDuration: '',
        education: '',
        obligation: '',
        qualification: '',
        workAddress: '',
        jType: '',
        jPublishDate: '',
        stopRecruitDate: ''
      },
      // 下拉框
      selectCondition:
        {
          jTypeList: [
            {
              jType: '实习'
            },
            {
              jType: '全职'
            },
            {
              jType: '兼职'
            }
          ]
        },

       recruitmentSituationDialogVisible: false,//显示招聘情况界面是否显示
      addLoading: false,
      //新增界面数据
      addJobForm: {
        jName: '',
        salary: '',
        experienceDuration: '',
        education: '',
        obligation: '',
        qualification: '',
        workAddress: '',
        jType: '',
        jPublishDate: '',
        stopRecruitDate: ''
      }

    }
  },
  methods: {
    //显示职位信息弹框
    // 点击相应职位信息，查看该岗位收到的简历信息
    selectCandidateByJobPosition(index,row){

    },
    //当前页改变时触发的函数,下一页或上一页
    handleCurrentChange (val) {
      // this.pageNumber = val;
      this.getJobList(val, this.pageConf.pageSize)
    },
    getJobListByjName () {
      // console.log('通过职位名查询')
      console.log('this.pageConf.pageCode' + this.pageConf.pageCode)
      console.log('this.pageConf.pageSize' + this.pageConf.pageSize)
      this.$axios.post('enterprise/getJobListByENameAndJName',
        {
          pageCode: this.pageConf.pageCode,
          pageSize: this.pageConf.pageSize,
          jName: this.filters.jName,
          eName: this.loginEnterprise.eName
        }).then((res) => {
        if(res.data.code === 200){
          this.pageConf.totalPage = res.data.total
          this.joblist = res.data.data.rows
        }else {
          this.$message.error(res.data.message + '请重新查询')
        }
      })
    },
    //获取列表(分页）
    /**
     *
     * @param pageCode  当前页
     * @param pageSize 每页显示的记录数
     */
    getJobList (pageCode, pageSize) {
      this.listLoading = true
      // this.loginPhone =  this.$route.params.loginPhone
      NProgress.start();
      var loginEnterprisePhone = localStorage.getItem('loginEnterprisePhone')
      var loginEnterprise = JSON.parse(localStorage.getItem('loginEnterprise'))
      this.loginEnterprise = loginEnterprise
      // console.log("登录账号：" + this.$route.params.loginPhone)
      // console.log("登录账号：" + this.$route.params.loginPhone)
      // console.log(loginEnterprise)
      this.$axios.get('enterprise/getJobListByEName',
        {
          params: {
            pageCode: pageCode,
            pageSize: pageSize,
            phone: loginEnterprisePhone
          }
        }
      ).then((res) => {
        //  后端返回岗位数据的同时记得统计一下岗位的总量
        if (res.data.code === 200) {
          // 当验证成功后跳转到用户中心
          this.pageConf.totalPage = res.data.total
          // console.log(res.data.data.rows)
          this.joblist = res.data.data.rows
          // console.log("joblist:" + this.joblist)
          this.listLoading = false
        } else {
          this.$message.error(res.data.message + '请重新登录')
        }

        NProgress.done();

      })
    },
    //删除
    deleteJob: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        NProgress.start();
        // console.log(row.jpId)
        // console.log("index" + index)
        this.$axios.delete('enterprise/deleteJobPosition',
          {
            data: {
              jpId: row.jpId
            }
          }
        )
          .then((res) => {
            if(res.data.code === 200) {
              this.listLoading = false
              NProgress.done();
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getJobList(this.pageConf.pageCode, this.pageConf.pageSize)
            }else {
              this.$message.error(res.data.message + '删除失败')
            }
          })
      }).catch(() => {

      })
    },
    //显示招聘情况界面
    handleRecruitmentSituation: function () {
      this. recruitmentSituationDialogVisible = true

    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      //用于将所有可枚举属性的值从一个或多个源对象复制到目标对象，它将返回目标对象。
      this.editForm = Object.assign({}, row)
      this.rowData = row
    },
    //修改求职信息
    editJob: function (index,row) {
      //获取到对应的行数的数据信息
      // this.editForm = row
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            NProgress.start();

            // let para = Object.assign({}, this.editForm)
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            this.$axios.post("/enterprise/updateJobPosition",{
              jpId: this.rowData.jpId,
              jName: this.editForm.jName,
              salary: this.editForm.salary,
              experienceDuration: this.editForm.experienceDuration,
              education: this.editForm.education,
              obligation: this.editForm.obligation,
              qualification: this.editForm.qualification,
              workAddress: this.editForm.workAddress,
              jType: this.editForm.jType,
              stopRecruitDate: this.editForm.stopRecruitDate
            }).then((res) => {
              this.editLoading = false
              NProgress.done();
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getJobList(this.pageConf.pageCode, this.pageConf.pageSize)
            })
          })
        }
      })
    },
    //新增职位
    // addJob: function () {
    //   // console.log(this.loginEnterprise)
    //   this.$refs.addJobForm.validate((valid) => {
    //     if (valid) {
    //       this.$confirm('确认提交吗？', '提示', {}).then(() => {
    //         this.addLoading = true
    //         NProgress.start();
    //         // let para = Object.assign({}, this.addJobForm)
    //         // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
    //         // addUser(para).
    //         // console.log(this.addJobForm.jName)
    //         this.$axios.post('enterprise/addJobPosition', {
    //
    //           jName: this.addJobForm.jName,
    //           salary: this.addJobForm.salary,
    //           experienceDuration: this.addJobForm.experienceDuration,
    //           education: this.addJobForm.education,
    //           obligation: this.addJobForm.obligation,
    //           qualification: this.addJobForm.qualification,
    //           workAddress: this.addJobForm.workAddress,
    //           jType: this.addJobForm.jType,
    //           jPublishDate: new Date().toLocaleDateString(),
    //           stopRecruitDate: this.addJobForm.stopRecruitDate,
    //           eName: this.loginEnterprise.eName
    //         })
    //           .then((result) => {
    //             this.addLoading = false
    //             NProgress.done();
    //             // this.$message({
    //             //   message: '提交成功',
    //             //   type: 'success'
    //             // })
    //             this.responseResult = JSON.stringify(result.data)
    //             this.loading = false
    //             // console.log(this.responseResult)
    //             if (result.data.code === 200) {
    //               this.$refs['addJobForm'].resetFields()
    //               this. recruitmentSituationDialogVisible = false
    //               this.getJobList(this.pageConf.pageCode, this.pageConf.pageSize)
    //             } else {
    //               this.$message.error(result.data.message + '请重新添加')
    //             }
    //
    //           })
    //       })
    //     }
    //   })
    // },
    selsChange: function (sels) {
      this.sels = sels
    },
    //批量删除
    batchRemove: function () {
      var ids = this.sels.map(item => item.id).toString()
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        NProgress.start();
        let para = {ids: ids}
        batchRemoveUser(para).then((res) => {
          this.listLoading = false
          NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getJobList(this.pageConf.pageCode, this.pageConf.pageSize)
        })
      }).catch(() => {

      })
    }
  },
  mounted () {
    this.getJobList(this.pageConf.pageCode, this.pageConf.pageSize)
  }

}
</script>

<style scoped>

</style>
