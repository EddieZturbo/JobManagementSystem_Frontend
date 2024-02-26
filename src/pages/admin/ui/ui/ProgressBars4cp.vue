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
            title: [
              {
                text: '                                               自动驾驶综述2023                      自动驾驶综述2022                       自动驾驶综述2021                             抄袭检测测试                                        综述作业',
                left: 'left',
              },
              {
                borderColor: '#999',
                textStyle: {
                  fontWeight: 'normal',
                  fontSize: 14,
                  lineHeight: 20,
                },
                left: '10%',
                top: '90%',
              },
            ],
            dataset: [
              {
                source: [
                  [
                    0.02184, 0.02242, 0.02533, 0.02748, 0.02325, 0.02176, 0.02495, 0.02657, 0.02667, 0.02361, 0.02631,
                    0.02637, 0.02402, 0.02075, 0.0223, 0.02212, 0.02531, 0.02607, 0.02496, 0.02613, 0.28, 0.24, 0.25,
                    0.0, 0.0, 0.01, 0.02, 0.03, 0.04, 0.05,
                  ],
                  [
                    0.02672, 0.02535, 0.02461, 0.02642, 0.0228, 0.02138, 0.0229, 0.02405, 0.02318, 0.02292, 0.02254,
                    0.02211, 0.02187, 0.02392, 0.02341, 0.02215, 0.02227, 0.02216, 0.02338, 0.02197, 0.32, 0.46, 0.12,
                    0.46, 0.01, 0.03, 0.05, 0.02, 0.01, 0.02, 0.0, 0.0, 0.0, 0.0,
                  ],
                  [
                    0.02324, 0.02422, 0.02362, 0.02484, 0.02173, 0.02118, 0.01951, 0.0243, 0.02699, 0.02521, 0.02325,
                    0.02525, 0.02351, 0.02376, 0.02308, 0.02224, 0.0244, 0.02255, 0.02172, 0.0235, 0.12, 0.32, 0.42,
                    0.0, 0.0, 0.0, 0.01, 0.02, 0.03, 0.5, 0.12,
                  ],
                  [
                    0.02368, 0.02249, 0.02223, 0.02233, 0.02161, 0.02147, 0.02076, 0.02062, 0.02115, 0.02171, 0.02437,
                    0.02439, 0.0234, 0.02249, 0.02387, 0.02002, 0.02223, 0.02418, 0.02362, 0.02156, 0.12, 0, 0.15,
                    0.023,
                  ],
                  [
                    0.02327, 0.02348, 0.02127, 0.02342, 0.02089, 0.02244, 0.02183, 0.02213, 0.023, 0.02427, 0.02366,
                    0.02441, 0.02243, 0.02074, 0.02364, 0.02601, 0.02535, 0.02168, 0.02361, 0.02453, 0.35, 0.45, 0.001,
                    0, 0, 0.02, 0.03,
                  ],
                ],
              },
              {
                transform: {
                  type: 'boxplot',
                },
              },
              {
                fromDatasetIndex: 1,
                fromTransformResult: 1,
              },
            ],
            tooltip: {
              trigger: 'item',
              axisPointer: {
                type: 'shadow',
              },
            },
            grid: {
              left: '10%',
              right: '10%',
              bottom: '15%',
            },
            xAxis: {
              type: 'category',
              boundaryGap: true,
              nameGap: 30,
              splitArea: {
                show: false,
              },
              splitLine: {
                show: false,
              },
            },
            yAxis: {
              type: 'value',
              name: '抄袭占比',
              splitArea: {
                show: true,
              },
            },
            series: [
              {
                name: 'boxplot',
                type: 'boxplot',
                datasetIndex: 1,
              },
              {
                name: 'outlier',
                type: 'scatter',
                datasetIndex: 2,
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
