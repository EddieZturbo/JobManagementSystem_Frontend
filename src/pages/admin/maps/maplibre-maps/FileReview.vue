<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
      <VaButton text-color="#fffff0" class="mr-3 mb-2" @click="returnFiles"> 返回作业列表 </VaButton>
      <VaInput v-if="jobStatus" v-model="score" type="number" style="height: 42px" placeholder="打分" label="打分" />
      <VaInput v-if="jobStatus" v-model="remark" style="height: 42px" placeholder="评语" label="评语" preset="solid" />
      <VaButton
        v-if="jobStatus"
        :disabled="!isValid"
        text-color="#FFFFFF"
        color="info"
        class="mr-3 mb-2"
        @click="commitHandle"
      >
        提交批改
      </VaButton>
    </div>
  </div>
  <br />
  <br />
  <div>
    <vue-pdf-embed v-if="state.pdf" :source="state.pdf" />
  </div>
</template>
<script setup>
  import VuePdfEmbed from 'vue-pdf-embed'
  import { ref, reactive, computed, inject, onMounted } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useGlobalStore } from '../../../../stores/global-store'
  import { useRouter } from 'vue-router'

  const $axios = inject('$axios') // Access global properties

  const GlobalStore = useGlobalStore()
  const { uploadedFileName } = storeToRefs(GlobalStore)
  const router = useRouter()
  const jobStatus = ref(false)

  onMounted(() => {
    if (router.currentRoute.value.params.toRate) {
      jobStatus.value = router.currentRoute.value.params.toRate.toString() === 'true' ? true : false
    }
  })

  const state = reactive({ pdf: null })
  const score = ref('')
  const remark = ref('')

  const isValid = computed(() => score.value)

  const url = 'http://127.0.0.1:5173/upload/' + uploadedFileName.value
  state.pdf = url

  const returnFiles = () => {
    router.push({ name: 'maps' })
  }

  const commitHandle = () => {
    $axios.post('/api/job/toRate/' + uploadedFileName.value.split('.')[0] + '?score=' + score.value)
    score.value = ''
    remark.value = ''
    router.push({ name: 'maps' }) //return to the 返回作业列表 page
  }
</script>
