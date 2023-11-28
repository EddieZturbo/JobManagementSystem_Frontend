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
            backgroundColor: '#FFFFFF',
            title: {
              text: 'Customized Pie',
              left: 'center',
              top: 20,
              textStyle: {
                color: '#ccc',
              },
            },
            tooltip: {
              trigger: 'item',
            },
            visualMap: {
              show: false,
              min: 80,
              max: 600,
              inRange: {
                colorLightness: [0, 1],
              },
            },
            series: [
              {
                name: 'Access From',
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: [
                  { value: 335, name: 'Direct' },
                  { value: 310, name: 'Email' },
                  { value: 274, name: 'Union Ads' },
                  { value: 235, name: 'Video Ads' },
                  { value: 400, name: 'Search Engine' },
                ].sort(function (a, b) {
                  return a.value - b.value
                }),
                roseType: 'radius',
                label: {
                  color: 'rgba(31, 36, 40, 0.3)',
                },
                labelLine: {
                  lineStyle: {
                    color: 'rgba(31, 36, 40, 0.3)',
                  },
                  smooth: 0.2,
                  length: 10,
                  length2: 20,
                },
                itemStyle: {
                  color: '#C5688S',
                  shadowBlur: 200,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function (idx) {
                  return Math.random() * 200
                },
              },
            ],
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
