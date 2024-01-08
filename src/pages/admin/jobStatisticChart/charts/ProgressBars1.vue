<template>
  <div id="chart-container"></div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    mounted() {
      this.createChart()
    },
    methods: {
      createChart() {
        var chartDom = this.$el
        var myChart = echarts.init(chartDom, null, {
          renderer: 'canvas',
          useDirtyRect: false,
        })
        var option
        setTimeout(() => {
          option = {
            legend: {},
            tooltip: {},
            dataset: {
              source: [
                ['状态', '引用情况'],
                ['2010-2013', 13],
                ['2014-2017', 28],
                ['2018-2020', 15],
                ['2021-2023', 50],
                ['2024', 3],
              ],
            },
            xAxis: { type: 'category' },
            yAxis: {},
            series: [{ type: 'bar', itemStyle: { color: '#91cc75' } }],
          }
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
