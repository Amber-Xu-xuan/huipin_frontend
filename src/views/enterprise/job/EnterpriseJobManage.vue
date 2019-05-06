<template>
  <section>
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.jName" placeholder="职位名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getJobListByjName(this.pageConf.pageCode,this.pageConf.pageSize)">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
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
      <el-table-column prop="salary" label="薪资待遇" width="100" sortable>
      </el-table-column>
      <el-table-column prop="experienceDuration" label="经验要求" width="100" sortable>
      </el-table-column>
      <el-table-column prop="education" label="学历要求" width="120">
      </el-table-column>

      <el-table-column prop="obligation" label="岗位职责" min-width="180" max-height="10" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="qualification" label="任职资格" min-width="180" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="workAddress" label="工作地点" min-width="180" >
      </el-table-column>
      <el-table-column prop="jType" label="职位性质" min-width="180">
      </el-table-column>



      <el-table-column prop="jPublishDate" label="发布时间" min-width="180" sortable>
      </el-table-column>
      <el-table-column prop="stopRecruitDate" label="停止招聘时间" min-width="180" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
    <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="姓名" prop="jName">
          <el-input v-model="editForm.jName" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="性别">-->
          <!--<el-radio-group v-model="editForm.sex">-->
            <!--<el-radio class="radio" :label="1">男</el-radio>-->
            <!--<el-radio class="radio" :label="0">女</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="年龄">-->
          <!--<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>-->
        <!--</el-form-item>-->
        <el-form-item label="生日">
          <el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
        </el-form-item>
        <el-form-item label="地址">
          <el-input type="textarea" v-model="editForm.addr"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面 -->
    <el-dialog title="新增" :visible.sync="addJobFormVisible" :close-on-click-modal="false">
      <el-form :model="addJobForm" label-width="80px" :rules="addJobFormRules" ref="addJobForm">
        <!--<el-form-item label="姓名" prop="jName">-->
          <!--<el-input v-model="addJobForm.jName" auto-complete="off"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="职位名称" prop="jName">
          <el-input v-model="addJobForm.jName" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="薪资要求" prop="salary">
        <el-select v-model="addJobForm.salary" placeholder="薪资要求">
          <el-option
            v-for="(salary,index) in selectCondition.salaryList"
            :key="index"
            :label="salary.salary"
            :value="salary.salary">
          </el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="工作经验" prop="experience">
        <el-select v-model="addJobForm.experience" placeholder="工作经验">
          <el-option
            v-for="(experience,index) in selectCondition.experienceList"
            :key="index"
            :value="experience.experience">
          </el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="学历要求" prop="experience">
        <el-select v-model="addJobForm.education" filterable placeholder="学历要求"  class="filter">
          <el-option
            v-for="(education,index) in selectCondition.educationList"
            :key="index"
            :value="education.education">
          </el-option>
        </el-select>
        </el-form-item>

        <el-form-item label="岗位职责" prop="obligation">
          <el-input type="textarea" v-model="addJobForm.obligation"
                    placeholder="1、负责对接业务部门招聘工作，根据简历筛选；推荐简历，协调面试官、候选人沟通，面试安排与反馈等整体招聘流程；
2、拓展、维护公司招聘渠道，更新招聘信息；
3、参加支持HR相关工作（内部推荐、员工关系培训、校园招聘等）。"></el-input>
        </el-form-item>

        <el-form-item label="任职资格" prop="qualification">
          <el-input type="textarea" v-model="addJobForm.qualification"
                    placeholder="1、本科一本或研究生在读，985，211学校、大三优先、大四保研优先；
2、熟练使用office等办公软件，对数据处理有经验者优先；
3、每周保证实习4个工作日以上，实习至少三个月以上；
4、积极、主动、耐心、踏实、高效、善于沟通。
实习生福利：弹性工作、优厚薪资、餐补、租房补贴、良好的办公环境、扁平化管理、免费零食+下午茶等"></el-input>
        </el-form-item>

        <!--<el-form-item label="性别">-->
          <!--<el-radio-group v-model="addJobForm.sex">-->
            <!--<el-radio class="radio" :label="1">男</el-radio>-->
            <!--<el-radio class="radio" :label="0">女</el-radio>-->
          <!--</el-radio-group>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="年龄">-->
          <!--<el-input-number v-model="addJobForm.age" :min="0" :max="200"></el-input-number>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="生日">-->
          <!--<el-date-picker type="date" placeholder="选择日期" v-model="addJobForm.birth"></el-date-picker>-->
        <!--</el-form-item>-->
        <el-form-item label="地址">
          <el-input v-model="addJobForm.workAddress"></el-input>
        </el-form-item>
      </el-form>
      <!--职位性质： 实习 -->
      <el-form-item label="职位性质" prop="jType">
        <el-select v-model="addJobForm.jType" placeholder="职位性质">
          <el-option
            v-for="(salary,index) in selectCondition.jTypeList"
            :key="index"
            :label="jType.jType"
            :value="jType.jType">
          </el-option>
        </el-select>
      </el-form-item>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addJobFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addJob" :loading="addLoading">提交</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
// import util from '/util.js'
// import { getJobListPage, removeUser, batchRemoveUser, editUser, addUser } from 'src/apis/api'
/**
 * 企业管理职位信息
 */
export default {
  name: 'EnterpriseJobManage',
  data () {
    return {
      filters: {
        jName: ''
      },
      joblist: [],
      // joblist: {},
      loginPhone: '',
      // total: 0,
      // pageNumber: 1, //当前页
      listLoading: false,
      sels: [],//列表选中列
      //记录登录的账号

      //定义分页Config
      pageConf: {
        //设置一些初始值(会被覆盖)
        pageCode: 1, //当前页
        pageSize: 4, //每页显示的记录数
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
        id: 0,
        jName: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
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
          ],
          experienceList: [
            {
              experience: '应届生'
            },
            {
              experience: '1年以内'
            },
            {
              experience: '1-3年'
            },
            {
              experience: '3-5年'
            },
            {
              experience: '5-10年'
            },
            {
              experience: '10年以上'
            }
          ],
          educationList: [
            {
              education: '初中及以下'
            },
            {
              education: '中专/中技'
            },
            {
              education: '高中'
            },
            {
              education: '大专'
            },
            {
              education: '本科'
            },
            {
              education: '硕士'
            },
            {
              education: '博士'
            }
          ],
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

      addJobFormVisible: false,//新增界面是否显示
      addLoading: false,
      addJobFormRules: {
        jName: [
          {required: true, message: '请输入岗位名称', trigger: 'blur'}
        ]
      },
      //新增界面数据
      addJobForm: {
        jName: '',
        sex: -1,
        age: 0,
        birth: '',
        addr: ''
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
      this.getJobList(val, this.pageConf.pageSize)
    },
    getJobListByjName () {
      console.log("通过职位名查询，为完善")
    },
    //获取用户列表(分页）
    /**
     *
     * @param pageCode  当前页
     * @param pageSize 每页显示的记录数
     */
    getJobList (pageCode, pageSize) {
      this.listLoading = true
      // this.loginPhone =  this.$route.params.loginPhone
      //NProgress.start();
      var loginEnterprisePhone = localStorage.getItem('loginEnterprisePhone')
      var loginEnterprise = JSON.parse(localStorage.getItem('loginEnterprise'))

      // console.log("登录账号：" + this.$route.params.loginPhone)
      // console.log("登录账号：" + this.$route.params.loginPhone)
      // console.log("第"+ pageCode + "页，共" + pageSize +"条记录")
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
        }else{
          this.$message.error(res.data.message + '请重新登录')
        }

        //NProgress.done();

      })
    },
    //删除
    handleDel: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        //NProgress.start();
        let para = {id: row.id}
        removeUser(para).then((res) => {
          this.listLoading = false
          //NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getJobList()
        })
      }).catch(() => {

      })
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    //显示新增界面
    handleAdd: function () {
      this.addJobFormVisible = true
      this.addJobForm = {
        jName: '',
        salary: '',
        experienceDuration: '',
        education:'',
        obligation:'',
        qualification:'',
        workAddress:'',
        jType:'',
        jPublishDate:'',
        stopRecruitDate:''
      }
    },
    //编辑
    editSubmit: function () {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            //NProgress.start();
            let para = Object.assign({}, this.editForm)
            para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            editUser(para).then((res) => {
              this.editLoading = false
              //NProgress.done();
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getJobList()
            })
          })
        }
      })
    },
    //新增职位
    addJob: function () {
      this.$refs.addJobForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            //NProgress.start();
            // let para = Object.assign({}, this.addJobForm)
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            // addUser(para).
            this.$axios.post('enterprise/addJobPosition',{
              jobPosition: this.addJobForm
            })
              .then((result) => {
              this.addLoading = false
              //NProgress.done();
              // this.$message({
              //   message: '提交成功',
              //   type: 'success'
              // })
                this.responseResult = JSON.stringify(result.data)
                this.loading = false
                console.log(this.responseResult)
                if (result.data.code === 200) {
                  this.$refs['addJobForm'].resetFields()
                  this.addJobFormVisible = false
                  this.getJobList()
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
        //NProgress.start();
        let para = {ids: ids}
        batchRemoveUser(para).then((res) => {
          this.listLoading = false
          //NProgress.done();
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getJobList()
        })
      }).catch(() => {

      })
    }
  },
  mounted () {
    this.getJobList(this.pageConf.pageCode,this.pageConf.pageSize)
  }

}
</script>

<style scoped>

</style>
