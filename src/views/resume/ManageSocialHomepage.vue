<!--ManageSocialHomepage-->
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
      <el-table-column prop="workAddress" label="工作地点" min-width="180">
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
          <!---->
          <el-button type="danger" size="small" @click.native.prevent="deleteJob(scope.$index, scope.row)">删除</el-button>
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
        <el-form-item label="职位名称" prop="jName">
          <el-input v-model="editForm.jName" auto-complete="off"></el-input>
        </el-form-item>
        <!--<el-form-item label="生日">-->
        <!--<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="地址">-->
        <!--<el-input type="textarea" v-model="editForm.addr"></el-input>-->
        <!--</el-form-item>-->
        <el-form-item label="薪资要求" prop="salary">
          <el-select v-model="editForm.salary" placeholder="薪资要求">
            <el-option
              v-for="(salary,index) in selectCondition.salaryList"
              :key="index"
              :label="salary.salary"
              :value="salary.salary">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="工作经验" prop="experienceDuration">
          <el-select v-model="editForm.experienceDuration" placeholder="工作经验">
            <el-option
              v-for="(experienceDuration,index) in selectCondition.experienceDurationList"
              :key="index"
              :value="experienceDuration.experienceDuration">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学历要求" prop="education">
          <el-select v-model="editForm.education" placeholder="学历要求">
            <el-option
              v-for="(education,index) in selectCondition.educationList"
              :key="index"
              :value="education.education">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位职责" prop="obligation">
          <el-input type="textarea" rows="5" v-model="editForm.obligation"
                    placeholder="例如:
1、负责对接业务部门招聘工作，根据简历筛选；推荐简历，协调面试官、候选人沟通，面试安排与反馈等整体招聘流程；
2、拓展、维护公司招聘渠道，更新招聘信息；
3、参加支持HR相关工作（内部推荐、员工关系培训、校园招聘等）。"></el-input>
        </el-form-item>

        <el-form-item label="任职资格" prop="qualification">
          <el-input type="textarea" rows="5" v-model="editForm.qualification"
                    placeholder="例如:
1、本科一本或研究生在读，985，211学校、大三优先、大四保研优先；
2、熟练使用office等办公软件，对数据处理有经验者优先；
3、每周保证实习4个工作日以上，实习至少三个月以上；
4、积极、主动、耐心、踏实、高效、善于沟通。
实习生福利：弹性工作、优厚薪资、餐补、租房补贴、良好的办公环境、扁平化管理、免费零食+下午茶等"></el-input>
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
        <el-form-item label="地址" prop="workAddress">
          <el-input v-model="editForm.workAddress"></el-input>
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

    <!--新增界面 -->
    <el-dialog title="新增" :visible.sync="addJobFormVisible" :close-on-click-modal="false">
      <el-form :model="addJobForm" label-width="80px" :rules="addJobFormRules" ref="addJobForm">
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

        <el-form-item label="工作经验" prop="experienceDuration">
          <el-select v-model="addJobForm.experienceDuration" placeholder="工作经验">
            <el-option
              v-for="(experienceDuration,index) in selectCondition.experienceDurationList"
              :key="index"
              :value="experienceDuration.experienceDuration">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学历要求" prop="education">
          <el-select v-model="addJobForm.education" placeholder="学历要求">
            <el-option
              v-for="(education,index) in selectCondition.educationList"
              :key="index"
              :value="education.education">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="岗位职责" prop="obligation">
          <el-input type="textarea" rows="5" v-model="addJobForm.obligation"
                    placeholder="例如:
1、负责对接业务部门招聘工作，根据简历筛选；推荐简历，协调面试官、候选人沟通，面试安排与反馈等整体招聘流程；
2、拓展、维护公司招聘渠道，更新招聘信息；
3、参加支持HR相关工作（内部推荐、员工关系培训、校园招聘等）。"></el-input>
        </el-form-item>

        <el-form-item label="任职资格" prop="qualification">
          <el-input type="textarea" rows="5" v-model="addJobForm.qualification"
                    placeholder="例如:
1、本科一本或研究生在读，985，211学校、大三优先、大四保研优先；
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
        <el-form-item label="停止招聘">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="addJobForm.stopRecruitDate"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="workAddress">
          <el-input v-model="addJobForm.workAddress"></el-input>
        </el-form-item>
        <!--职位性质： 实习 -->
        <el-form-item label="职位性质" prop="jType">
          <el-select v-model="addJobForm.jType" placeholder="职位性质">
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
        <el-button @click.native="addJobFormVisible = false">取消</el-button>
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
  name: 'ManageSocialHomepage',
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
          experienceDurationList: [
            {
              experienceDuration: '应届生'
            },
            {
              experienceDuration: '1年以内'
            },
            {
              experienceDuration: '1-3年'
            },
            {
              experienceDuration: '3-5年'
            },
            {
              experienceDuration: '5-10年'
            },
            {
              experienceDuration: '10年以上'
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
        ],
        salary: [
          {required: true, message: '请输入薪资待遇', trigger: 'blur'}
        ],
        experienceDuration: [
          {required: true, message: '请输入经验要求', trigger: 'blur'}
        ],
        education: [
          {required: true, message: '请输入学历要求', trigger: 'blur'}
        ],
        obligation: [
          {required: true, message: '请输入岗位职责', trigger: 'blur'}
        ],
        qualification: [
          {required: true, message: '请输入任职资格', trigger: 'blur'}
        ],
        workAddress: [
          {required: true, message: '请输入工作地点', trigger: 'blur'}
        ],
        jType: [
          {required: true, message: '请输入职位性质', trigger: 'blur'}
        ],
      },
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
    //显示新增界面
    handleAdd: function () {
      this.addJobFormVisible = true
      this.addJobForm = {
        jName: '',
        salary: '',
        experienceDuration: '',
        education: '',
        obligation: '',
        qualification: '',
        workAddress: '',
        jType: '',
        stopRecruitDate: ''
      }
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
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
    addJob: function () {
      // console.log(this.loginEnterprise)
      this.$refs.addJobForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            NProgress.start();
            // let para = Object.assign({}, this.addJobForm)
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            // addUser(para).
            // console.log(this.addJobForm.jName)
            this.$axios.post('enterprise/addJobPosition', {

              jName: this.addJobForm.jName,
              salary: this.addJobForm.salary,
              experienceDuration: this.addJobForm.experienceDuration,
              education: this.addJobForm.education,
              obligation: this.addJobForm.obligation,
              qualification: this.addJobForm.qualification,
              workAddress: this.addJobForm.workAddress,
              jType: this.addJobForm.jType,
              jPublishDate: new Date().toLocaleDateString(),
              stopRecruitDate: this.addJobForm.stopRecruitDate,
              eName: this.loginEnterprise.eName
            })
              .then((result) => {
                this.addLoading = false
                NProgress.done();
                // this.$message({
                //   message: '提交成功',
                //   type: 'success'
                // })
                this.responseResult = JSON.stringify(result.data)
                this.loading = false
                // console.log(this.responseResult)
                if (result.data.code === 200) {
                  this.$refs['addJobForm'].resetFields()
                  this.addJobFormVisible = false
                  this.getJobList(this.pageConf.pageCode, this.pageConf.pageSize)
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
