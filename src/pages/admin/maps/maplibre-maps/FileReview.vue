<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
      <VaButton text-color="#ffffff80" class="mr-3 mb-2" @click="returnFiles"> 返回作业列表 </VaButton>
      <VaInput v-model="score" type="number" style="height: 42px" placeholder="打分" label="打分" />
      <VaInput v-model="remark" style="height: 42px" placeholder="评语" label="评语" preset="solid" />
      <VaButton text-color="#FFFFFF" color="info" class="mr-3 mb-2"> 提交批改 </VaButton>
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
  import { ref, reactive } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useGlobalStore } from '../../../../stores/global-store'
  import { useRouter } from 'vue-router'

  const GlobalStore = useGlobalStore()
  const { uploadedFileName } = storeToRefs(GlobalStore)
  const router = useRouter()

  const state = reactive({ pdf: null })
  const score = ref('')
  const remark = ref('')

  console.log(uploadedFileName.value)
  const url = 'http://127.0.0.1:5173/upload/' + uploadedFileName.value
  state.pdf = url

  const returnFiles = () => {
    router.push({ name: 'maps' })
  }
</script>
