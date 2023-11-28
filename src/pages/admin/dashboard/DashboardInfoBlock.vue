<template>
  <div class="pt-6 grid grid-cols-22 gap-6">
    <div class="col-span-12 lg:col-span-6 flex flex-wrap">
      <div class="w-full pb-6 grid grid-cols-12 gap-6">
        <va-card v-for="(info, idx) in infoTiles" :key="idx" class="col-span-12 sm:col-span-4 mb-8" :color="info.color">
          <va-card-content>
            <h2 class="va-h2 m-0 text-white">{{ info.value }}</h2>
            <p class="text-white">{{ info.text }}</p>
          </va-card-content>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { VaCard, VaCardContent } from 'vuestic-ui'

  const infoTiles = ref([
    {
      color: 'success',
      value: '803',
      text: '已提交',
      icon: '',
    },
    {
      color: 'info',
      value: '5',
      text: '未提交',
      icon: '',
    },
    {
      color: 'danger',
      value: '57',
      text: '不合格',
      icon: '',
    },
  ])
</script>

<style lang="scss" scoped>
  .gallery-carousel {
    width: 80vw;
    max-width: 100%;

    @media all and (max-width: 576px) {
      width: 100%;
    }
  }
</style>
