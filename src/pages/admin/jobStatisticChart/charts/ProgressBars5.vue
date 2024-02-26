<template>
  <div id="chart-container"></div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    inject: ['$axios'],
    data() {
      return {
        option: {
          gend: {},
          tooltip: {},
          dataset: {
            source: [['状态', '已提交', '未批改', '不及格']],
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
          backgroundColor: '#ffffff', // 设置背景色为白色
        },
      }
    },
    mounted() {
      //这里修改统计图数据
      this.option['dataset']['source'].push(['自动驾驶综述2023', 125, 133, 255])
      this.option['dataset']['source'].push(['自动驾驶2023综述', 155, 96, 144])
      this.option['dataset']['source'].push(['作业管理系统前后端开发', 99, 255, 144])
      this.option['dataset']['source'].push(['抄袭检测测试', 55, 68, 33])
      this.option['dataset']['source'].push(['综述作业', 68, 33, 55])
      this.createChart()
    },
    methods: {
      createChart() {
        var chartDom = this.$el
        var myChart = echarts.init(chartDom, null, {
          renderer: 'canvas',
          useDirtyRect: false,
        })
        setTimeout(() => {
          var option = this.option
          myChart.on('updateAxisPointer', function (event) {
            const xAxisInfo = event.axesInfo[0]
            if (xAxisInfo) {
              const dimension = xAxisInfo.value + 1
              myChart.setOption({
                series: {
                  id: 'pie',
                  label: {
                    formatter: '{b}: {@[' + dimension + ']} ({d}%)',
                  },
                  encode: {
                    value: dimension,
                    tooltip: dimension,
                  },
                },
              })
            }
          })
          myChart.setOption(option)
        }, 0)
        window.addEventListener('resize', myChart.resize)
      },
    },
  }
</script>

<style scoped>
  * {
    margin: 0;
    padding: 0;
  }

  #chart-container {
    position: relative;
    height: 80vh;
    width: 90vw;
    overflow: hidden;
  }
</style>
