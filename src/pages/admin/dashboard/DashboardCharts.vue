<template>
  <div class="grid grid-cols-22 gap-8">
    <va-card class="col-span-14 sm:col-span-8 lg:col-span-3">
      <va-card-title>
        <h1>作业提交情况</h1>
      </va-card-title>
      <va-card-content v-if="doughnutChartDataGenerated">
        <va-chart ref="doughnutChart" class="chart chart--donut" :data="doughnutChartDataGenerated" type="doughnut" />
      </va-card-content>
    </va-card>

    <dashboard-contributors-chart class="col-span-12 sm:col-span-6 lg:col-span-3" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'

  import { doughnutChartData } from '../../../data/charts'
  import { useChartData } from '../../../data/charts/composables/useChartData'
  import VaChart from '../../../components/va-charts/VaChart.vue'
  import DashboardContributorsChart from './DashboardContributorsList.vue'

  const doughnutChart = ref()

  const doughnutChartDataGenerated = useChartData(doughnutChartData)
</script>

<style scoped>
  .chart {
    height: 400px;
  }
</style>
