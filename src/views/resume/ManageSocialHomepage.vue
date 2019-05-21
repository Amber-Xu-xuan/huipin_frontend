<!--ManageSocialHomepage-->
<template>
  <section class="xxcenter-content">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
      <el-form :inline="true" :model="filters">
        <!--<el-form-item>-->
          <!--<el-input v-model="filters.platform" placeholder="社交主页平台"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item>-->
          <!--this.pageConf.pageCode,this.pageConf.pageSize-->
          <!--<el-button type="primary" v-on:click="getHomePageListByPlatform">查询-->
          <!--</el-button>-->
        <!--</el-form-item>-->
        <el-form-item>
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </el-col>

    <!--列表-->
    <el-table ref="homePageList" :data="homePageList" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="platform" label="社交主页平台" width="220" sortable>
      </el-table-column>
      <el-table-column prop="homePage" label="社交主页链接" width="200" sortable>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <!---->
          <el-button type="danger" size="small" @click.native.prevent="deleteHomePage(scope.$index, scope.row)">删除</el-button>
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

    <!--编辑界面-->
    <el-dialog title="编辑" :visible.sync="editFormVisible" :close-on-click-modal="false">
      <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
        <el-form-item label="社交主页平台" prop="platform">
          <el-input v-model="editForm.platform" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="社交主页" prop="platform">
          <el-input v-model="editForm.homePage" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="editHomePage" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>

    <!--新增界面 -->
    <el-dialog title="新增" :visible.sync="addHomePageFormVisible" :close-on-click-modal="false">
      <el-form :model="addHomePageForm" label-width="80px" :rules="addHomePageFormRules" ref="addHomePageForm">
        <el-form-item label="社交主页平台" prop="platform">
          <el-input v-model="addHomePageForm.platform" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="社交主页" prop="homePage">
          <el-input v-model="addHomePageForm.homePage" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addHomePageFormVisible = false">取消</el-button>
        <el-button type="primary" @click.native="addHomePage" :loading="addLoading">提交</el-button>
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
  name: 'ManageSocialHomepage',
  data () {
    return {
      filters: {
        platform: ''
      },
      homePageList: [],
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

      editFormVisible: false,//编辑界面是否显示
      editLoading: false,
      editFormRules: {
        platform: [
          {required: true, message: '请输入社交主页平台名称', trigger: 'blur'}
        ],
        homePage:
        [
          {required: true, message: '请输入社交主页名称', trigger: 'blur'}
          ]
      },
      //编辑界面数据
      editForm: {
        platform: '',
        homePage: ''
      },

      addHomePageFormVisible: false,//新增界面是否显示
      addLoading: false,
      addHomePageFormRules: {
        platform: [
          {required: true, message: '请输入岗位名称', trigger: 'blur'}
        ],
        homePage: [
          {required: true, message: '请输入社交主页链接', trigger: 'blur'}
        ]
      },
      //新增界面数据
      addHomePageForm: {
        platform: '',
        homePage: ''
      }

    }
  },
  methods: {
    //当前页改变时触发的函数,下一页或上一页
    handleCurrentChange (val) {
      // this.pageNumber = val;
      this.getHomePageList(val, this.pageConf.pageSize)
    },
    // 预埋
    getHomePageListByPlatform () {
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      var loginCandidate = JSON.parse(localStorage.getItem('loginCandidate'))
      this.$axios.post('candidate/getHomePageListByCPhoneAndPlatform',
        {
          pageCode: this.pageConf.pageCode,
          pageSize: this.pageConf.pageSize,
          cphone: this.loginCandidatePhone,
          platform:this.editForm.platform
        }).then((res) => {
        if(res.data.code === 200){
          this.pageConf.totalPage = res.data.total
          this.homePageList = res.data.data.rows
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
    getHomePageList (pageCode, pageSize) {
      this.listLoading = true
      // this.loginPhone =  this.$route.params.loginPhone
      NProgress.start();
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      var loginCandidate = JSON.parse(localStorage.getItem('loginCandidate'))
      this.loginCandidate = loginCandidate
      this.$axios.post('candidate/getSocialHomepageByPhone',
        {
            phone: loginCandidatePhone
        }
      ).then((res) => {
        if (res.data.code === 200) {
          // this.pageConf.totalPage = res.data.total
          this.homePageList = res.data.data
          // console.log("homePageList:" + this.homePageList)
          this.listLoading = false
        } else {
          this.$message.error(res.data.message + '请重新登录')
        }

        NProgress.done();

      })
    },
    //删除
    deleteHomePage: function (index, row) {
      this.$confirm('确认删除该记录吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.listLoading = true
        NProgress.start();
        // console.log(row.shId)
        // console.log("index" + index)
        this.$axios.delete('candidate/deleteSocialHomepage',
          {
            data: {
              shId: row.shId
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
              this.getHomePageList(this.pageConf.pageCode, this.pageConf.pageSize)
            }else {
              this.$message.error(res.data.message + '删除失败')
            }
          })
      }).catch(() => {

      })
    },
    //显示新增界面
    handleAdd: function () {
      this.addHomePageFormVisible = true
      this.addHomePageForm = {
        platform: '',
        homePage: '',
      }
    },
    //显示编辑界面
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
      this.rowData = row
    },
    //修改求职信息
    editHomePage: function (index,row) {
      //获取到对应的行数的数据信息
      // this.editForm = row
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      var loginCandidate = JSON.parse(localStorage.getItem('loginCandidate'))
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.editLoading = true
            NProgress.start();

            // let para = Object.assign({}, this.editForm)
            // para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd')
            this.$axios.post("/candidate/updateSocialHomepage",{
              shId: this.rowData.shId,
              platform: this.editForm.platform,
              homePage: this.editForm.homePage,
            }).then((res) => {
              this.editLoading = false
              NProgress.done();
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this.$refs['editForm'].resetFields()
              this.editFormVisible = false
              this.getHomePageList(this.pageConf.pageCode, this.pageConf.pageSize)
            })
          })
        }
      })
    },
    //新增职位
    addHomePage: function () {
      // console.log(this.loginCandidate)
      var loginCandidatePhone = localStorage.getItem('loginCandidatePhone')
      var loginCandidate = JSON.parse(localStorage.getItem('loginCandidate'))
      this.$refs.addHomePageForm.validate((valid) => {
        if (valid) {
          this.$confirm('确认提交吗？', '提示', {}).then(() => {
            this.addLoading = true
            NProgress.start();
            this.$axios.post('candidate/addSocialHomepage', {
              phone:loginCandidatePhone,
              platform: this.addHomePageForm.platform,
              homePage: this.addHomePageForm.homePage
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
                  this.$refs['addHomePageForm'].resetFields()
                  this.addHomePageFormVisible = false
                  this.getHomePageList(this.pageConf.pageCode, this.pageConf.pageSize)
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
          this.getHomePageList(this.pageConf.pageCode, this.pageConf.pageSize)
        })
      }).catch(() => {

      })
    }
  },
  mounted () {
    this.getHomePageList(this.pageConf.pageCode, this.pageConf.pageSize)
  }

}
</script>

<style scoped>

</style>
