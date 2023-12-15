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
  import { VaCard, VaCardContent } from 'vuestic-ui'
  import { ref, inject, onMounted } from 'vue'

  const $axios: any = inject('$axios') // Access global properties

  let commitedNum = ref(0)
  let unexaminedNum = ref(0)
  let unqualifyNum = ref(0)

  async function fetchJobsStatistic() {
    try {
      const params = {
        is_commit: 1,
      }
      const response = await $axios.post('/api/job/list', params)
      commitedNum.value = response.data.length
    } catch (error) {
      console.log(error)
    }
    try {
      const params = {
        score: 0,
      }
      const response = await $axios.post('/api/job/list', params)
      unexaminedNum.value = response.data.length
    } catch (error) {
      console.log(error)
    }
    try {
      const params = {
        is_qualify: 0,
      }
      const response = await $axios.post('/api/job/list', params)
      unqualifyNum.value = response.data.length
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(() => fetchJobsStatistic()) // Fetch JobsStatistic when component is mounted

  const infoTiles = ref([
    {
      color: 'success',
      value: commitedNum,
      text: '已提交',
      icon: '',
    },
    {
      color: 'info',
      value: unexaminedNum,
      text: '未批改',
      icon: '',
    },
    {
      color: 'danger',
      value: unqualifyNum,
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
