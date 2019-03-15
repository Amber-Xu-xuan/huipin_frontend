<template>
  <div>
    <ZPHeader></ZPHeader>
    <!--筛选条件-->
    <div class="search-condition">
      <div class="left-title">职位薪资</div>
      <div class="condition-detail-box">
        <div class="li select"><a href="">不限</a></div>
        <div class="li "><a href="">1K~1.5K/月</a></div>
        <div class="li "><a href="">1.5K~2K/月</a></div>
        <div class="li "><a href="">2K~3K/月</a></div>
        <div class="li "><a href="">3K~5K/月</a></div>
        <div class="li "><a href="">5K~10K/月</a></div>
        <div class="li "><a href="">10K以上/月</a></div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>
      <div class="left-title">职位亮点</div>
      <div class="condition-detail-box">
        <div class="li select"><a href="">不限</a></div>
        <div class="li "><a href="">环境好</a></div>
        <div class="li "><a href="">年终奖</a></div>
        <div class="li "><a href="">双休</a></div>
        <div class="li "><a href="">五险一金</a></div>
        <div class="li "><a href="">加班费</a></div>
        <div class="li "><a href="">朝九晚五</a></div>
        <div class="li "><a href="">交通方便</a></div>
        <div class="li "><a href="">加班补助</a></div>

        <div class="li "><a href="">包食宿</a></div>
        <div class="li "><a href="">管理规范</a></div>
        <div class="li "><a href="">有提成</a></div>
        <div class="li "><a href="">全勤奖</a></div>
        <div class="li "><a href="">有年假</a></div>
        <!--专车接送 有补助 晋升快 车贴 房贴 压力小 技术培训 旅游-->
        <div class="clear"></div>
      </div>
      <div class="clear"></div>

      <div class="left-title">更多筛选</div>
      <div class="condition-detail-box">
        <div class="bli J_dropdown">
          <span class="txt" title="所属行业">所属行业</span>
          <div class="dropdowbox2 J_dropdown_menu">
            <div class="dropdow_inner2">
              <ul class="nav_box">
                <li><a class="" href="" data-code="1">计算机软件/硬件</a>
                </li>
                <li><a class="" href="" data-code="2">计算机系统/维修</a>
                </li>
                <li><a class="" href="" data-code="3">通信(设备/运营/服务)</a>
                </li>
                <li><a class="" href="" data-code="4">互联网/电子商务</a>
                </li>
                <li><a class="" href="" data-code="5">网络游戏</a>
                </li>
                <li><a class="" href="" data-code="6">电子/半导体/集成电路</a>
                </li>
                <li><a class="" href="" data-code="7">仪器仪表/工业自动化</a>
                </li>
                <li><a class="" href="" data-code="8">会计/审计</a>
                </li>

                <!--金融(投资/证券) 金融(银行/保险) 贸易/进出口 批发/零售-->
                <div class="clear"></div>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="bli J_dropdown">
          <span>企业规模</span>
          <div class="dropdowbox1 J_dropdown_menu">
            <div class="dropdow_inner1">
              <ul class="nav_box">
                <li><a class="" href=""
                       data-code="80">20人以下</a></li>
                <li><a class="" href=""
                       data-code="81">20-99人</a></li>
                <li><a class="" href=""
                       data-code="82">100-499人</a></li>
                <li><a class="" href=""
                       data-code="83">500-999人</a></li>
                <li><a class="" href=""
                       data-code="84">1000-9999人</a></li>
                <li><a class="" href=""
                       data-code="85">10000人以上</a></li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="bli J_dropdown">
          <span>工作性质</span>
          <div class="dropdowbox1 J_dropdown_menu">
            <div class="dropdow_inner1">
              <ul class="nav_box">
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;nature=62"
                       data-code="62">全职</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;nature=63"
                       data-code="63">兼职</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;nature=64"
                       data-code="64">实习</a></li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="bli J_dropdown">
          <span>学历要求</span>
          <div class="dropdowbox1 J_dropdown_menu">
            <div class="dropdow_inner1">
              <ul class="nav_box">
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;education=65"
                       data-code="65">初中</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;education=66"
                       data-code="66">高中</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;education=67"
                       data-code="67">中技</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;education=68"
                       data-code="68">中专</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;education=69"
                       data-code="69">大专</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;education=70"
                       data-code="70">本科</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;education=71"
                       data-code="71">硕士</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;education=72"
                       data-code="72">博士</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;education=73"
                       data-code="73">博后</a></li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="bli J_dropdown">
          <span>工作经验</span>
          <div class="dropdowbox1 J_dropdown_menu">
            <div class="dropdow_inner1">
              <ul class="nav_box">
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;experience=74"
                       data-code="74">无经验</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;experience=75"
                       data-code="75">1年以下</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;experience=76"
                       data-code="76">1-3年</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;experience=77"
                       data-code="77">3-5年</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;experience=78"
                       data-code="78">5-10年</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;experience=79"
                       data-code="79">10年以上</a></li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="bli J_dropdown">
          <span>更新时间</span>
          <div class="dropdowbox1 J_dropdown_menu">
            <div class="dropdow_inner1">
              <ul class="nav_box">
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;settr=3" data-code="3">3天内</a>
                </li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;settr=7" data-code="7">7天内</a>
                </li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;settr=15"
                       data-code="15">15天内</a></li>
                <li><a class="" href="/index.php?m=&amp;c=Jobs&amp;a=jobs_list&amp;license=&amp;settr=30"
                       data-code="30">30天内</a></li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
      </div>
      <div class="clear"></div>

      <!--已选条件，当没有条件的时候不显示下面的DIV -->
      <div class="selected J_selected">
        <div class="stit">已选条件</div>
        <div class="sc">
          <div class="clear"></div>
        </div>
        <div class="sr">
          <div class="empty" onclick="window.location='/index.php?m=&amp;c=jobs&amp;a=jobs_list';">清空</div>
        </div>
        <div class="clear"></div>
      </div>
    </div>

    <!--工作列表-->
    <div class="job-table">
      <div class="J_jobsList yli" data-jid="4310">
        <div class="td1">
          <div class="J_allList radiobox"></div>
        </div>
        <div class="td2 link_blue link_visited ">
          <div class="td-j-name"><a href="" target="_blank" title=""></a></div>
          <div class="td-j-img">
          </div>
          <div class="clear"></div>
        </div>
        <div class="td3 link_gray6">
          <a class="line_substring" href="" target="_blank"></a>
          <img src="" title="认证企业">
          <div class="clear"></div>
        </div>
        <div class="td4">8K-15K/月</div>
        <div class="td5"><span id="r_time" style="color:#FF3300">17小时前</span></div>
        <div class="td6">
          <div class="J_jobsStatus hide "></div>
        </div>
        <div class="clear"></div>
        <div class="detail">
          <div class="ltx">
            <div class="txt font_gray6">
              学历：{{jobPosition.education}}<span>|</span>经验：<span>|</span>职位性质：<span>|</span>人数：若干人<span>|</span>地点：
            </div>
            <div class="dlabs">
              <div class="dl">环境好</div>
              <div class="dl">年终奖</div>
              <div class="dl">加班费</div>
              <div class="dl">交通方便</div>
              <div class="dl">有提成</div>
              <div class="dl">有年假</div>
              <div class="clear"></div>
            </div>
          </div>
          <div class="rbtn ">
            <div class="deliver J_applyForJob" data-batch="false"
                 data-url="/index.php?m=&amp;c=AjaxPersonal&amp;a=resume_apply">投递简历
            </div>
            <div class="favorites  J_collectForJob" data-batch="false"
                 data-url="/index.php?m=&amp;c=AjaxPersonal&amp;a=jobs_favorites">收藏
            </div>
            <div class="map-area"></div>
          </div>
          <div class="clear"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ZPHeader from '@/components/ZPHeader'

  export default {
    name: 'HomePage',
    components: {
      ZPHeader
    },
    data () {
      return {
        jpId:'',
        jName:'',
        salary: '',
        experienceDuration: '',
        jarea: '',
        obligation: '',
        education: '',
        qualification: '',
        workAddress: '',
        jType: '',
        jPublishDate: '',
        stopRecruitDate: '',
        jobPosition :[
          {
            jpId:'',
            jName:'',
            salary: '',
            experienceDuration: '',
            jarea: '',
            obligation: '',
            education: '',
            qualification: '',
            workAddress: '',
            jType: '',
            jPublishDate: '',
            stopRecruitDate: ''
          }
        ]
      }
    },
    // 监视data中指定数据的变化，触发watch中的function
    watch: {
      qualification: function() {
      //  监视到数据变化
      },
      '$route.path': function (newVal,oldVal) {
        // console.log(newVal + '---' + olsVal)
      }
    },
    // 注意：计算属性在引用的时候不要加小括号，当普通属性去使用
    computed: {
    //  计算属性，本质时一个方法，计算属性的时候把他们的名称直接当成属性使用
      'result': function () {
        return 2
      }
    }
  }
</script>
<style scoped>
  /*首页中 按钮搜索框*/
  .search-condition {
    margin: 0 auto;
    border: 1px #eeeeee solid;
    border-top-width: 0;
    padding-top: 10px;
    padding-bottom: 15px;
  }

  .search-condition .left-title {
    width: 90px;
    padding-right: 15px;
    float: left;
    text-align: right;
    padding-top: 8px;
    margin-top: 15px;
  }

  .search-condition .condition-detail-box {
    margin-top: 15px;
    float: left;
  }

  * {
    margin: 0;
    padding: 0;
  }

  /* 已经被选中时的显示格式*/
  .search-condition .condition-detail-box .li.select, .search-condition .selected {
    border-color: #59a0ff;
  }

  .search-condition .condition-detail-box .li {
    padding-left: 10px;
    padding-right: 10px;
    height: 26px;
    line-height: 26px;
    float: left;
    border: 1px #FFFFFF solid;
    background-color: #FFFFFF;
    margin-right: 8px;
    border-radius: 3px;
    margin-top: 5px;
  }

  a {
    display: block;
    float: none;
    height: 20px;
    line-height: 20px;
    padding: 6px 15px;
    text-decoration: none;
    color: #333;
    _height: 18px;
    white-space: nowrap;
    _white-space: normal;
    _background: transparent;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
  }

  li {
    text-decoration: none;
    list-style: none;
  }

  condition-detail-box {
    float: left;
  }

  .clear {
    clear: both;
    height: 0;
    font-size: 0;
    line-height: 0;
  }

  /* 更多筛选*/
  .J_dropdown_menu ul {
    display: none;
  }

  .search-condition .condition-detail-box .bli {
    padding-left: 13px;
    padding-right: 27px;
    height: 30px;
    line-height: 30px;
    float: left;
    border: 1px #E7E7E7 solid;
    background-color: #FFFFFF;
    margin-right: 15px;
    cucondition-detail-boxor: pointer;
    background-repeat: no-repeat;
    background-position: 76px -65px;
    border-radius: 3px;
    width: 60px;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 3px;
  }

  .job-table {
    width: 943px;
    border: 1px #EEEEEE solid;
    margin-top: 10px;
  }

  /* 工作列表*/
  .job-table  .yli {
    border-bottom: 1px #0d86ff solid;
    padding-top: 18px;
    padding-bottom: 18px;
    background-color: #fff;
    display: flex;
  }
  .job-table .yli .td2 {
    padding-top: 1px;
    font-size: 16px;
    padding-right: 15px;
    flex-direction: row;
  }

  .dlabs .dl {
    float: left;
    padding-left: 15px;
    padding-right: 15px;
    border: 1px #D4D4D4 solid;
    background-color: #FFFFFF;
    margin-right: 15px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    border-radius: 2px;
    color: #666666;
  }
</style>
