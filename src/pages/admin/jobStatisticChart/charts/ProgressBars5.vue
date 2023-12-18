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
          legend: {},
          tooltip: {},
          dataset: {
            source: [['状态', '已提交', '未批改', '不及格']],
          },
          xAxis: { type: 'category' },
          yAxis: {},
          series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }],
        },
      }
    },
    mounted() {
      this.createChart()
      this.$axios
        .get('/api/job/getCommittedWorkName')
        .then((response) => {
          response.data.forEach((item) => {
            try {
              const params = {
                is_commit: 1,
                work_name: item,
              }
              this.$axios.post('/api/job/list', params).then(async (res) => {
                const params = {
                  is_commit: 1,
                  work_name: item,
                  job_status: 1,
                  is_qualify: 0,
                }
                const statistic = await this.$axios.post('/api/job/list', params)
                this.option['dataset']['source'].push([
                  item,
                  res.data.length,
                  res.data.length - statistic.data.length,
                  statistic.data.length,
                ])
                this.createChart()
              })
            } catch (error) {
              console.log(error)
            }
          })
        })
        .catch((error) => {
          console.log(error)
        })
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
