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
            color: ['#67F9D8', '#FFE434', '#56A3F1', '#FF917C'],
            title: {
              text: '评断标准',
            },
            legend: {},
            radar: [
              {
                indicator: [
                  { text: 'Indicator1' },
                  { text: 'Indicator2' },
                  { text: 'Indicator3' },
                  { text: 'Indicator4' },
                  { text: 'Indicator5' },
                ],
                center: ['25%', '50%'],
                radius: 120,
                startAngle: 90,
                splitNumber: 4,
                shape: 'circle',
                axisName: {
                  formatter: '【{value}】',
                  color: '#428BD4',
                },
                splitArea: {
                  areaStyle: {
                    color: ['#77EADF', '#26C3BE', '#64AFE9', '#428BD4'],
                    shadowColor: 'rgba(0, 0, 0, 0.2)',
                    shadowBlur: 10,
                  },
                },
                axisLine: {
                  lineStyle: {
                    color: '#67f9d8',
                  },
                },
                splitLine: {
                  lineStyle: {
                    color: '#67f9d8',
                  },
                },
              },
              {
                indicator: [
                  { text: '抄袭情况', max: 50 },
                  { text: '引文情况', max: 10 },
                  { text: '内容结构', max: 5 },
                  { text: '文章质量', max: 30 },
                  { text: '篇幅情况', max: 5 },
                ],
                center: ['75%', '50%'],
                radius: 120,
                axisName: {
                  color: '#fff',
                  backgroundColor: '#666',
                  borderRadius: 3,
                  padding: [3, 5],
                },
              },
            ],
            series: [
              {
                type: 'radar',
                emphasis: {
                  lineStyle: {
                    width: 4,
                  },
                },
                data: [
                  {
                    value: [100, 8, 0.4, -80, 2000],
                    name: 'Data A',
                  },
                  {
                    value: [60, 5, 0.3, -100, 1500],
                    name: 'Data B',
                    areaStyle: {
                      color: 'rgba(255, 228, 52, 0.6)',
                    },
                  },
                ],
              },
              {
                type: 'radar',
                radarIndex: 1,
                data: [
                  {
                    value: [45, 8, 5, 28, 5],
                    name: 'Data D',
                    areaStyle: {
                      color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                        {
                          color: '#67f9d8',
                          offset: 0,
                        },
                        {
                          color: 'rgba(255, 145, 124, 0.9)',
                          offset: 1,
                        },
                      ]),
                    },
                  },
                  {
                    value: [42, 5, 3, 21, 5],
                    name: 'Data D',
                    areaStyle: {
                      color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                        {
                          color: '#67f9d8',
                          offset: 0,
                        },
                        {
                          color: 'rgba(255, 145, 12, 0.9)',
                          offset: 1,
                        },
                      ]),
                    },
                  },
                  {
                    value: [36, 5, 2, 10, 5],
                    name: 'Data D',
                    areaStyle: {
                      color: new echarts.graphic.RadialGradient(0.1, 0.6, 1, [
                        {
                          color: '#67f9d8',
                          offset: 0,
                        },
                        {
                          color: 'rgba(255, 145, 12, 0.9)',
                          offset: 1,
                        },
                      ]),
                    },
                  },
                ],
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
