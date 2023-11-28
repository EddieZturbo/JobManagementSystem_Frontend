<template>
  <va-card color="primary" gradient>
    <va-card-content>选择要提交的课程作业</va-card-content>
    <VaSelect
      v-model="value"
      placeholder="下拉选择课程作业"
      color="primary"
      :options="options"
      searchable
      highlight-matched-text
      background="blue"
      clearable="true"
      clearable-icon="va-clear"
    />
  </va-card>

  <va-file-upload
    v-model="basic"
    :disabled="isDisabled"
    style="height: 666px"
    dropzone
    file-types="pdf"
    @file-added="fileAdded"
  />

  <div v-if="ifUpload">
    <va-progress-bar size="large" indeterminate />
  </div>

  <div class="flex flex-col flex-wrap gap-5">
    <va-card>
      <va-card-block class="flex-nowrap" horizontal>
        <div class="flex-auto">
          <va-card-title>Title</va-card-title>
          <va-card-content>
            {{ lorem }}
          </va-card-content>
        </div>
      </va-card-block>
    </va-card>
  </div>
</template>

<script setup>
  import { ref, inject, computed } from 'vue'
  import { useModal } from 'vuestic-ui'

  const $axios = inject('$axios')
  const basic = ref([])
  const lorem = ref('仅支持上传PDF格式文件，文件大小不超过50MB')
  const { confirm } = useModal()
  const ifUpload = ref(false)

  const options = ref(['WebDev-作业管理系统前后端开发', 'WebDev-数据库表设计', 'WebDev-项目部署运维'])

  const value = ref([])

  const isDisabled = computed(() => {
    return value.value.length === 0 ? true : false
  })

  const fileAdded = async (file) => {
    ifUpload.value = true
    const formData = new FormData()
    console.log(file[0])
    formData.append('file', file[0])
    try {
      const result = await $axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (result.code === 200) {
        console.log('上传成功')
        const ok = await confirm('作业上传成功')
        if (ok) {
          console.log('ok')
          ifUpload.value = false
        }
      }
    } catch (error) {
      basic.value = []
      ifUpload.value = false
      console.log(error)
      await confirm('作业文件上传失败，请重新上传')
    }
  }
</script>
