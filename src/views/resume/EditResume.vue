<template>
  <section class="xxcenter-content">
    <!--管理教育经历-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table ref="educationExperienceList" :data="educationExperienceList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column prop="school" label="学校名称" width="120" sortable>
      </el-table-column>
      <el-table-column prop="educationBackground" label="学历" width="100" sortable>
      </el-table-column>
      <el-table-column prop="major" label="所学专业" width="100" sortable>
      </el-table-column>
      <el-table-column prop="studyingStartTime" label="就读时间" width="120">
      </el-table-column>

      <el-table-column prop="graduationTime" label="毕业时间" min-width="180" max-height="10" show-overflow-tooltip>
      </el-table-column>

      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click.native.prevent="deleteEducationExperience(scope.$index, scope.row)">删除</el-button>
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
      </el-pagination>
    </el-col>

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="学校名称" prop="school">
          <el-input v-model="editForm.school" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="educationBackground">
          <el-select v-model="editForm.educationBackground" placeholder="学历">
            <el-option
              v-for="(educationBackground,index) in selectCondition.educationBackgroundList"
              :key="index"
              :label="educationBackground.educationBackground"
              :value="educationBackground.educationBackground">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="所学专业" prop="major" required>
        <el-input v-model="editForm.major"></el-input>
        </el-form-item>

        <el-form-item label="就读时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.studyingStartTime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="毕业时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="editForm.graduationTime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editJob" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面 -->
    <el-dialog title="新增" :visible.sync="addEducationExperienceFormVisible" :close-on-click-modal="false">
      <el-form :model="addEducationExperienceForm" label-width="80px" :rules="addEducationExperienceFormRules" ref="addEducationExperienceForm">

        <el-form-item label="学校名称" prop="school">
          <el-input v-model="addEducationExperienceForm.school" auto-complete="on"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="educationBackground">
          <el-select v-model="addEducationExperienceForm.educationBackground" placeholder="学历">
            <el-option
              v-for="(educationBackground,index) in selectCondition.educationBackgroundList"
              :key="index"
              :label="educationBackground.educationBackground"
              :value="educationBackground.educationBackground">
            </el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="所学专业" prop="major" required>
          <el-input v-model="addEducationExperienceForm.major"></el-input>
        </el-form-item>

        <el-form-item label="就读时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addEducationExperienceForm.studyingStartTime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="毕业时间">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addEducationExperienceForm.graduationTime"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addEducationExperienceFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addEducationExperience" :loading="addLoading">提交</el-button>
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
  name: 'EditResume',
  data () {
    return {
      filters: {
        school: ''
      },
      educationExperienceList: [],
      // educationExperienceList: {},
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
        school: [
          {required: true, message: '请输入岗位名称', trigger: 'blur'}
        ]
      },
      //编辑界面数据
      editForm: {
        school: '',
        educationBackground: '',
        major: '',
        studyingStartTime: '',
        graduationTime: '',
        phone: ''
      },

      // 下拉框
      selectCondition:
        {
          educationBackgroundList: [
            {
              educationBackground: '初中及以下'
            },
            {
              educationBackground: '中专/中技'
            },
            {
              educationBackground: '高中'
            },
            {
              educationBackground: '大专'
            },
            {
              educationBackground: '本科'
            },
            {
              educationBackground: '硕士'
            },
            {
              educationBackground: '博士'
            }
          ]
        },

      addEducationExperienceFormVisible: false,//新增界面是否显示
      addLoading: false,
      addEducationExperienceFormRules: {
        school: [
          {required: true, message: '请输入岗位名称', trigger: 'blur'}
        ],
        educationBackground: [
          {required: true, message: '请输入学历', trigger: 'blur'}
        ],
        major: [
          {required: true, message: '请输入学历要求', trigger: 'blur'}
        ]

      },
      //新增界面数据
      addEducationExperienceForm: {
        school: '',
        educationBackground: '',
        major: '',
        studyingStartTime: '',
        graduationTime: '',
        phone: ''
      }

    }
  },
  methods: {
    //性别显示转换
    // formatSex: function (row, column) {
    //   return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知'
    // },
    //:formatter="formatSex"
    //当前页改变时触发的函数,下一页或上一页
    handleCurrentChange (val) {
      // this.pageNumber = val;
      this.getEducationExperienceList(val, this.pageConf.pageSize)
    },
    //获取列表(分页）
    /**
     *
     * @param pageCode  当前页 成功
     * @param pageSize 每页显示的记录数
     */
    getEducationExperienceList (pageCode, pageSize) {
      this.listLoading = true
      // this.loginPhone =  this.$route.params.loginPhone
      NProgress.start();
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      var loginCandidate = JSON.parse(localStorage.getItem('loginCandidate'))
      this.loginCandidate = loginCandidate
      // console.log("登录账号：" + loginCandidatePhone)
      // console.log(loginCandidate)
      this.$axios.post('candidate/getEducationExperienceByPhone',
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
          this.educationExperienceList = res.data.data.rows
          // console.log("educationExperienceList:" + this.educationExperienceList)
          this.listLoading = false
        } else {
          this.$message.error(res.data.message + '请重新登录')
        }

        NProgress.done();

      })
    },
    //删除
    deleteEducationExperience: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        NProgress.start();
        this.$axios.delete('candidate/deleteEducationExperience',
          {
            data: {
              eId: row.rId
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
              this.getEducationExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
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
      this.addEducationExperienceFormVisible = true
      this.addEducationExperienceForm = {
        school: '',
        educationBackground: '',
        major: '',
        studyingStartTime: '',
        graduationTime: '',
        phone: ''
      }
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      //将每一行的数据复制到这个对象中
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

            this.$axios.post("/candidate/updateEducationExperience",{
              rId: this.rowData.rId,
              school: this.editForm.school,
              educationBackground: this.editForm.educationBackground,
              major: this.editForm.major,
              studyingStartTime: this.editForm.studyingStartTime,
              graduationTime: this.editForm.graduationTime
            }).then((res) => {
              this.editLoading = false
              NProgress.done();
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getEducationExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
            })
          })
        }
      })
    },
    //新增职位
    addEducationExperience: function () {
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      // console.log(this.loginCandidate)
      this.$refs.addEducationExperienceForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            NProgress.start();
            this.$axios.post('candidate/addEducationExperience', {
              school: this.addEducationExperienceForm.school,
              educationBackground: this.addEducationExperienceForm.educationBackground,
              phone: loginCandidatePhone,
              major: this.addEducationExperienceForm.major,
              studyingStartTime: this.addEducationExperienceForm.studyingStartTime,
              graduationTime: this.addEducationExperienceForm.graduationTime,
            })
              .then((result) => {
                this.addLoading = false
                NProgress.done();
                this.responseResult = JSON.stringify(result.data)
                this.loading = false
                // console.log(this.responseResult)
                if (result.data.code === 200) {
                  this.$refs['addEducationExperienceForm'].resetFields()
                  this.addEducationExperienceFormVisible = false
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  this.getEducationExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
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
          this.getEducationExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
        })
      }).catch(() => {

      })
    }
  },
  mounted () {
    this.getEducationExperienceList(this.pageConf.pageCode, this.pageConf.pageSize)
  }

}
</script>

<style scoped>

</style>
