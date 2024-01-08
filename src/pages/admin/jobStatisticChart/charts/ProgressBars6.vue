<template>
  <div class="charts">
    <progress-bars-6-Data />
  </div>
  <div>
    <form>
      <th></th>
      <th style="padding-left: 250px">自动驾驶综述2023</th>
      <th style="padding-left: 150px">作业管理系统前后端开发</th>
      <th style="padding-left: 146px">自动驾驶2023综述</th>
      <th style="padding-left: 176px; padding-right: 220px">抄袭检测测试</th>
      <th>综述作业</th>
    </form>
  </div>
</template>

<script setup>
  import ProgressBars6Data from './ProgressBars6Data.vue'
</script>

<style lang="scss">
  .chart-widget {
    .va-card__content {
      height: 450px;
    }
  }

  form {
    display: flex;
    justify-content: left;
  }
</style>
