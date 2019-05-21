<template>
  <!--统计求职者数据-->
  <div class="xxcenter-content">

    <div :class="className" :id="id" :style="{height:height,width:width}" ref="statisticCandidateEchart">
    </div>

  </div>
</template>

<script>
// <!--引入echart-->
import echarts from 'echarts'
export default {
  name: 'StatisticCandidate',
  props: {
    className: {
      type: String,
      default: 'yourClassName'
    },
    id: {
      type: String,
      default: 'staticCandidate'
    },
    width: {
      type: String,
      default: '1000px'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      chart: null,
    }
  },
  mounted() {
    var loginAdminPhone = localStorage.getItem("loginAdminPhone")
    if(loginAdminPhone === "" || loginAdminPhone === null){
      this.$message.error("请登录您的管理员账号")
    }else {
      this.initChart()
    }

  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      var loginAdminPhone = localStorage.getItem("loginAdminPhone")
      this.chart = echarts.init(this.$refs.statisticCandidateEchart);
      // 从后端请求数据
      this.$axios.get('/manager/StatisticCandidate',{
        params: {
          phone:loginAdminPhone
        }
      }).then((res) => {
        if(res.data.code === 200){
          this.$message.success("统计数据如下")
          this.chart.setOption({
            color: ['#3398DB'],
            title: {
              text: '求职用户月度数据分析'
            },
            //提示框组件
            tooltip: {
              trigger: 'axis', // 坐标轴触发，主要在柱状图，折线图等会使用类目轴的图表中使用。，item
              axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [{
              type: 'category',
              // data: this.dateList,
              data: res.data.data.dateList,
              axisTick: {
                alignWithLabel: true
              }
            }],
            yAxis: [{
              type: 'value',
              boundaryGap: false,
            }],
            //折线图上方的工具箱
            toolbox: {
              left: 'center',
              feature: {
                dataZoom: {
                  yAxisIndex: 'none'
                },
                restore: {},
                saveAsImage: {}
              }
            },
            //区域缩放
            dataZoom:[{
              //绝对数值形式
              startValue: '2014-06-01'
            }, {
              type: 'inside'
            }],
            series: [{
              name: '用户数量',
              //bar：柱状图 line为折线图
              type: 'line',
              //区域颜色
              areaStyle: {},
              smooth: true,
              data: res.data.data.sumList,
              markLine: {
                silent: true,
                data: [{
                  yAxis: 10
                }, {
                  yAxis: 20
                }, {
                  yAxis: 50
                }, {
                  yAxis: 100
                }, {
                  yAxis: 200
                }]
              }
            }],
            //  折线图的颜色
            visualMap: {
              top: 10,
              right: 10,
              pieces: [{
                gt: 0,
                lte: 5,
                color: '#096'
              }, {
                gt: 5,
                lte: 10,
                color: '#ffde33'
              }, {
                gt: 10,
                lte: 20,
                color: '#ff9933'
              }, {
                gt: 20,
                lte: 30,
                color: '#cc0033'
              }, {
                gt: 30,
                lte: 40,
                color: '#660099'
              }, {
                gt: 40,
                color: '#7e0023'
              }],
              outOfRange: {
                color: '#999'
              }
            },
          })
        }
      })
      //前端测试
      // 把配置和数据放这里

    }
  }
}
</script>

<style scoped>

</style>
