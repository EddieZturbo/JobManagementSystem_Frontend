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
                text: '                                               自动驾驶综述2023                      作业管理系统前后端开发                       自动驾驶2023综述                             抄袭检测测试                                        综述作业',
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
                    2184, 2242, 2533, 2748, 2325, 2176, 2495, 2657, 2667, 2361, 2631, 2637, 2402, 2075, 2230, 2212,
                    2531, 2607, 2496, 2613, 1000, 999, 800, 4800, 4000, 3896, 4569, 4469, 3399, 1265, 986, 869,
                  ],
                  [
                    2672, 2535, 2461, 2642, 2280, 2138, 2290, 2405, 2318, 2292, 2254, 2211, 2187, 2392, 2341, 2215,
                    2227, 2216, 2338, 2197, 1000, 999, 800, 4800, 4000, 3896, 4569, 4469, 3399, 1265, 986, 869,
                  ],
                  [
                    2324, 2422, 2362, 2484, 2173, 2118, 1951, 2430, 2699, 2521, 2325, 2525, 2351, 2376, 2308, 2224,
                    2440, 2255, 2172, 2350,
                  ],
                  [
                    2368, 2249, 2223, 2233, 2161, 2147, 2076, 2062, 2115, 2171, 2437, 2439, 2340, 2249, 2387, 2002,
                    2223, 2418, 2362, 2156, 1000, 999, 800, 4469, 3399, 1265, 986, 869,
                  ],
                  [
                    2327, 2348, 2127, 2342, 2089, 2244, 2183, 2213, 2300, 2427, 2366, 2441, 2243, 2074, 2364, 2601,
                    2535, 2168, 2361, 2453, 4569,
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
              name: '字数/篇',
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
