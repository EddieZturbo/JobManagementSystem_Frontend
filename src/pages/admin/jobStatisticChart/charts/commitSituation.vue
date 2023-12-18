<template>
  <div class="charts">
    <dashboard-info-block />
    <progress-bars-5 />
  </div>
</template>

<script setup>
  import DashboardInfoBlock from '../../dashboard/DashboardInfoBlock.vue'
  import ProgressBars5 from './ProgressBars5.vue'
</script>

<style lang="scss">
  .chart-widget {
    .va-card__content {
      height: 450px;
    }
  }
</style>
