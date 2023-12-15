<template>
  <div class="charts">
    <dashboard-info-block />
    <progress-bars-2 />
  </div>
</template>

<script setup>
  import DashboardInfoBlock from '../../dashboard/DashboardInfoBlock.vue'
  import ProgressBars2 from './ProgressBars2.vue'
</script>

<style lang="scss">
  .chart-widget {
    .va-card__content {
      height: 450px;
    }
  }
</style>
