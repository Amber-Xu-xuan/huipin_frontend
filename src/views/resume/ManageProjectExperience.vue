<!--ManageProjectExperience-->
<template>
  <section class="xxcenter-content">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.projectName" placeholder="项目名称"></el-input>
        </el-form-item>
        <el-form-item>
          <!--this.pageConf.pageCode,this.pageConf.pageSize-->
          <el-button type="primary" v-on:click="getProjectExperienceByProjectName">查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table ref="projectExperienceList" :data="projectExperienceList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="120" sortable>
      </el-table-column>
      <el-table-column prop="company" label="关联公司" width="100" sortable>
      </el-table-column>

      <el-table-column prop="projectLink" label="项目链接" min-width="180">
      </el-table-column>
      <el-table-column prop="projectDescribe" label="项目描述" min-width="180">
      </el-table-column>
      <el-table-column label="项目开始时间" prop="startTime" min-width="180">
    </el-table-column>
      <el-table-column label="项目结束时间" prop="endTime" min-width="180">
      </el-table-column>
      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click.native.prevent="deleteProjectExperience(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-col :span="24" class="toolbar">
      <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
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
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="editForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="关联公司" prop="company">
          <el-input v-model="editForm.company" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目周期" prop="editProjectCycle">
          <el-date-picker
            v-model="editProjectCycle"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="项目链接" prop="projectLink">
          <el-input v-model="editForm.projectLink" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="projectDescribe">
          <el-input v-model="editForm.projectDescribe" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editProjectExperience" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面 -->
    <el-dialog title="新增" :visible.sync="addProjectExperienceFormVisible" :close-on-click-modal="false">
      <el-form :model="addProjectExperienceForm" label-width="80px" :rules="addProjectExperienceFormRules" ref="addProjectExperienceForm">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="addProjectExperienceForm.projectName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="关联公司" prop="company">
          <el-input v-model="addProjectExperienceForm.company" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目周期" prop="addProjectCycle">
          <el-date-picker
            v-model="addProjectCycle"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="项目链接" prop="projectLink">
          <el-input v-model="addProjectExperienceForm.projectLink" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="projectDescribe">
          <el-input v-model="addProjectExperienceForm.projectDescribe" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer" >
        <el-button @click.native="addProjectExperienceFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addProjectExperience" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
//导入nprogress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/**
 * 企业管理项目信息
 */
export default {
  name: 'ManageProjectExperience',
  data () {
    return {
      filters: {
        projectName: ''
      },
      //项目周期
      addProjectCycle: [],
      editProjectCycle: [],
      projectExperienceList: [],
      loginPhone: '',
      //登录的用户信息
      loginCandidate:{},
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
        projectName: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        projectDescribe: [
          {required: true, message: '请输入项目描述', trigger: 'blur'}
        ]
      },
      //编辑界面数据
      editForm: {
        projectName: '',
        company: '',
        startTime: '',
        endTime: '',
        projectLink: '',
        projectDescribe: '',
        phone: ''
      },
      addProjectExperienceFormVisible: false,//新增界面是否显示
      addLoading: false,
      addProjectExperienceFormRules: {
        projectName: [
          {required: true, message: '请输入项目名称', trigger: 'blur'}
        ],
        projectDescribe: [
          {required: true, message: '请输入项目描述', trigger: 'blur'}
        ]
      },
      //新增界面数据
      addProjectExperienceForm: {
        projectName: '',
        company: '',
        startTime: '',
        endTime: '',
        projectLink: '',
        projectDescribe: '',
        phone: ''
      }

    }
  },
  methods: {
    //当前页改变时触发的函数,下一页或上一页
    handleCurrentChange (val) {
      // this.pageNumber = val;
      this.getProjectExperienceList(val, this.pageConf.pageSize)
    },
    getProjectExperienceByProjectName () {
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      this.$axios.post('candidate/getProjectExperienceListByProjectNameAndPhone',
        {
          pageCode: this.pageConf.pageCode,
          pageSize: this.pageConf.pageSize,
          projectName: this.filters.projectName,
          phone: loginCandidatePhone
        }).then((res) => {
        if(res.data.code === 200){
          this.pageConf.totalPage = res.data.total
          this.projectExperienceList = res.data.data.rows
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
    getProjectExperienceList (pageCode, pageSize) {
      this.listLoading = true
      // this.loginPhone =  this.$route.params.loginPhone
      NProgress.start();
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      var loginCandidate = JSON.parse(localStorage.getItem('loginCandidate'))
      this.loginCandidate = loginCandidate

      this.$axios.post('candidate/getProjectExperienceListByPhone',
        {
            pageCode: pageCode,
            pageSize: pageSize,
            phone: loginCandidatePhone
        }
      ).then((res) => {
        //  后端返回岗位数据的同时记得统计一下岗位的总量
        if (res.data.code === 200) {
          // 当验证成功后跳转到用户中心
          this.pageConf.totalPage = res.data.total
          this.projectExperienceList = res.data.data.rows
          console.log(res.data.data.rows)
          this.listLoading = false
        } else {
          this.$message.error(res.data.message + '请重新登录')
        }

        NProgress.done();

      })
    },
    //删除
    deleteProjectExperience: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        NProgress.start();
        this.$axios.delete('candidate/deleteProjectExperience',
          {
            data: {
              peId: row.peId
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
              this.getProjectExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
            }else {
              this.$message.error(res.data.message + '删除失败')
            }
          })
      }).catch(() => {

      })
    },
    //显示新增界面
    handleAdd: function () {
      this.addProjectExperienceFormVisible = true
      this.addProjectExperienceForm = {
        projectName: '',
        company: '',
        startTime: '',
        endTime: '',
        projectLink: '',
        projectDescribe: '',
        phone: ''
      }
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      this.rowData = row
    },
    //修改信息
    editProjectExperience: function (index,row) {
      //获取到对应的行数的数据信息
      // this.editForm = row
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            NProgress.start();

            // let para = Object.assign({}, this.editForm)
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            this.$axios.post("/candidate/updateProjectExperience",{
              peId: this.rowData.peId,
              projectName: this.editForm.projectName,
              company: this.editForm.company,
              startTime: this.editProjectCycle[0],
              endTime: this.editProjectCycle[1],
              projectLink: this.editForm.projectLink,
              projectDescribe: this.editForm.projectDescribe,
              phone: this.loginCandidate.phone
            }).then((res) => {
              this.editLoading = false
              NProgress.done();
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getProjectExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
            })
          })
        }
      })
    },
    //新增
    addProjectExperience: function () {
      this.$refs.addProjectExperienceForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            NProgress.start();
            this.$axios.post('candidate/addProjectExperience', {
              projectName: this.addProjectExperienceForm.projectName,
              company: this.addProjectExperienceForm.company,
              startTime: this.addProjectCycle[0],
              endTime: this.addProjectCycle[1],
              projectLink: this.addProjectExperienceForm.projectLink,
              projectDescribe: this.addProjectExperienceForm.projectDescribe,
              phone: this.loginCandidate.phone,
            })
              .then((result) => {
                this.addLoading = false
                NProgress.done();
                this.$message({
                  message: '提交成功',
                  type: 'success'
                })
                this.responseResult = JSON.stringify(result.data)
                this.loading = false
                // console.log(this.responseResult)
                if (result.data.code === 200) {
                  this.$refs['addProjectExperienceForm'].resetFields()
                  this.addProjectExperienceFormVisible = false
                  this.getProjectExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
                } else {
                  this.$message.error(result.data.message + '请重新添加')
                }

              })
          })
        }
      })
    },
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
          this.getProjectExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
        })
      }).catch(() => {

      })
    }
  },
  mounted () {
    this.getProjectExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
  }

}
</script>

<style scoped>

</style>
