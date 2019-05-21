<template>
  <section class="xxcenter-content">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.companyName" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item>
          <!--this.pageConf.pageCode,this.pageConf.pageSize-->
          <el-button type="primary" @click="getWorkExperienceByCompanyNameAndPhone">查询
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table ref="workExperienceList" :data="workExperienceList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="companyName" label="公司名称" width="120" sortable>
      </el-table-column>
      <el-table-column prop="salary" label="税前月资" width="100" sortable>
      </el-table-column>
      <el-table-column prop="industryInvolved" label="所属部门" width="100" sortable>
      </el-table-column>
      <el-table-column prop="jobTitle" label="职位名称" width="100" sortable>
      </el-table-column>
      <el-table-column prop="workingStartTime" label="入职日期" min-width="180" max-height="10" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="workingEndTime" label="离职日期" min-width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="jobDescription" label="工作描述" min-width="180">
      </el-table-column>

      <el-table-column label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click.native.prevent="deleteWorkExperience(scope.$index, scope.row)">删除</el-button>
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
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="editForm.companyName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="税前月资" prop="salary">
          <el-select v-model="editForm.salary" placeholder="税前月资">
            <el-option
              v-for="(salary,index) in selectCondition.salaryList"
              :key="index"
              :label="salary.salary"
              :value="salary.salary">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属部门" prop="industryInvolved">
            <el-input v-model="editForm.industryInvolved" placeholder="所属部门"></el-input>
        </el-form-item>

        <el-form-item label="职位名称" prop="jobTitle">
          <el-input v-model="editForm.jobTitle" placeholder="职位名称">
          </el-input>
        </el-form-item>

        <el-form-item label="在职时间">
          <div class="block">
            <el-date-picker
              v-model="editWorkDate"
              type="daterange"
              start-placeholder="入职日期"
              end-placeholder="离职日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>   <span style="font-size: 10px; color: #ccc;">{{editForm.workingStartTime}}至{{editForm.workingEndTime}}</span>
          </div>
        </el-form-item>
        <el-form-item label="工作描述" prop="jobDescription">
          <el-input type="textarea" autosize v-model="editForm.jobDescription"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editWorkExperience" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面 -->
    <el-dialog title="新增" :visible.sync="addWorkExperienceFormVisible" :close-on-click-modal="false">
      <el-form :model="addWorkExperienceForm" label-width="80px" :rules="addWorkExperienceFormRules" ref="addWorkExperienceForm">
        <el-form-item label="公司名称" prop="companyName">
          <el-input v-model="addWorkExperienceForm.companyName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="税前月资" prop="salary">
          <el-select v-model="addWorkExperienceForm.salary" placeholder="税前月资">
            <el-option
              v-for="(salary,index) in selectCondition.salaryList"
              :key="index"
              :label="salary.salary"
              :value="salary.salary">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属部门" prop="industryInvolved">
            <el-input v-model="addWorkExperienceForm.industryInvolved" placeholder="所属部门"></el-input>
        </el-form-item>

        <el-form-item label="职位名称" prop="jobTitle">
            <el-input v-model="addWorkExperienceForm.jobTitle"  placeholder="职位名称"></el-input>
        </el-form-item>

        <el-form-item label="在职日期" prop="onWorkDate">
          <div class="block">
            <el-date-picker
              v-model="onWorkDate"
              type="daterange"
              start-placeholder="入职日期"
              end-placeholder="离职日期"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </el-form-item>
        <el-form-item label="工作描述" prop="jobDescription">
          <el-input v-model="addWorkExperienceForm.jobDescription"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addWorkExperienceFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addWorkExperience" :loading="addLoading">提交</el-button>
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
  name: 'ManageWorkExperience',
  mounted () {
    this.getWorkExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
  },
  data () {
    return {
      filters: {
        companyName: ''
      },
      //在职时间
      onWorkDate: [
      ],
      editWorkDate: [],
      workExperienceList: [],
      loginPhone: '',
      //登录的用户信息
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
        companyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' }
        ],
        industryInvolved: [
          { required: true, message: '请输入所属部门', trigger: 'blur' }
        ],
        jobTitle: [
          { required: true, message: '请输入职位名称', trigger: 'blur' }
        ],
      },
      //编辑界面数据
      editForm: {
        companyName: '',
        salary: '',
        industryInvolved: '',
        jobTitle: '',
        workingStartTime: '',
        workingEndTime: '',
        jobDescription: '',
        phone: ''
      },

      // 下拉框
      selectCondition:
        {
          salaryList: [
            {
              salary: '1k-3k'
            },
            {
              salary: '3k-5k'
            },
            {
              salary: '5k-8k'
            },
            {
              salary: '8k-10k'
            },
            {
              salary: '>10k'
            }
          ]
        },

      addWorkExperienceFormVisible: false,//新增界面是否显示
      addLoading: false,
      addWorkExperienceFormRules: {
        companyName: [
          {required: true, message: '请输入公司名称', trigger: 'blur'}
        ],
        salary: [
          {required: true, message: '请输入税前月资', trigger: 'blur'}
        ],
        industryInvolved: [
          {required: true, message: '请输入所属部门', trigger: 'blur'}
        ],
        jobTitle: [
          {required: true, message: '请输入职位名称', trigger: 'blur'}
        ],
        jobDescription: [
          {required: true, message: '请输入工作描述', trigger: 'blur'}
        ],
      },
      //新增界面数据
      addWorkExperienceForm: {
        companyName: '',
        salary: '',
        industryInvolved: '',
        jobTitle: '',
        workingStartTime: '',
        workingEndTime: '',
        jobDescription: '',
        phone: ''
      }

    }
  },
  methods: {
    //当前页改变时触发的函数,下一页或上一页
    handleCurrentChange (val) {
      // this.pageNumber = val;
      this.getWorkExperienceList(val, this.pageConf.pageSize)
    },
    //条件查询
    getWorkExperienceByCompanyNameAndPhone () {
      this.$axios.post('candidate/getWorkExperiencePagerByPhoneAndEName',
        {
          pageCode: this.pageConf.pageCode,
          pageSize: this.pageConf.pageSize,
          companyName: this.filters.companyName,
          phone: this.loginCandidate.phone
        }).then((res) => {
        if(res.data.code === 200){
          this.pageConf.totalPage = res.data.total
          this.workExperienceList = res.data.data.rows
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
    getWorkExperienceList (pageCode, pageSize) {
      this.listLoading = true
      NProgress.start();
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      var loginCandidate = JSON.parse(localStorage.getItem('loginCandidate'))
      this.loginCandidate = loginCandidate
      this.$axios.post('candidate/getWorkExperiencePagerByPhone',
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
          // console.log(res.data.data.rows)
          this.workExperienceList = res.data.data.rows
          this.listLoading = false
        } else {
          this.$message.error(res.data.message + '请重新登录')
        }
        NProgress.done();
      })
    },
    //删除
    deleteWorkExperience: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        NProgress.start();
        // console.log(row.jpId)
        // console.log("index" + index)
        this.$axios.delete('candidate/deleteWorkExperience',
          {
            data: {
              weId: row.weId
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
              this.getWorkExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
            }else {
              this.$message.error(res.data.message + '删除失败')
            }
          })
      }).catch((error) => {
        alert(error)
      })
    },
    //显示新增界面
    handleAdd: function () {
      this.addWorkExperienceFormVisible = true
      this.addWorkExperienceForm = {
        companyName: '',
        salary: '',
        industryInvolved: '',
        jobTitle: '',
        workingStartTime: '',
        workingEndTime: '',
        jobDescription: '',
        phone: ''
      }
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      this.rowData = row
    },
    //修改求职信息
    editWorkExperience: function (index,row) {
      //获取到对应的行数的数据信息
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            NProgress.start();
            this.$axios.post("/candidate/updateWorkExperience",{
              weId: this.rowData.weId,
              companyName: this.editForm.companyName,
              salary: this.editForm.salary,
              industryInvolved: this.editForm.industryInvolved,
              jobTitle: this.editForm.jobTitle,
              workingStartTime: this.editWorkDate[0],
              workingEndTime: this.editWorkDate[1],
              jobDescription: this.editForm.jobDescription,
              phone: loginCandidatePhone
            }).then((res) => {
              this.editLoading = false
              NProgress.done();
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getWorkExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
            })
          })
        }
      })
    },
    //新增职位
    addWorkExperience: function () {
      // console.log(this.loginCandidate)
      this.$refs.addWorkExperienceForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            NProgress.start();
            var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
            this.$axios.post('candidate/addWorkExperience', {
              companyName: this.addWorkExperienceForm.companyName,
              salary: this.addWorkExperienceForm.salary,
              industryInvolved: this.addWorkExperienceForm.industryInvolved,
              jobTitle: this.addWorkExperienceForm.jobTitle,
              workingStartTime: this.onWorkDate[0],
              workingEndTime: this.onWorkDate[1],
              jobDescription: this.addWorkExperienceForm.jobDescription,
              phone: loginCandidatePhone
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
                if (result.data.code === 200) {
                  this.$refs['addWorkExperienceForm'].resetFields()
                  this.addWorkExperienceFormVisible = false
                  this.getWorkExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
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
          this.getWorkExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
        })
      }).catch(() => {

      })
    }
  }


}
</script>

<style scoped>

</style>
