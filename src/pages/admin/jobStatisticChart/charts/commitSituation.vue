<template>
  <div class="charts">
    <dashboard-info-block />
    <dashboard-charts />
  </div>
</template>

<script setup lang="ts">
  import DashboardCharts from '../../dashboard/DashboardCharts.vue'
  import DashboardInfoBlock from '../../dashboard/DashboardInfoBlock.vue'
</script>

<style lang="scss">
  .chart-widget {
    .va-card__content {
      height: 450px;
    }
  }
</style>
