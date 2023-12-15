<template>
  <va-file-upload v-model="basic" style="height: 666px" dropzone file-types="pdf" @file-added="fileAdded" />

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
  import { ref, inject } from 'vue'
  import { useModal } from 'vuestic-ui'

  const $axios = inject('$axios')
  const basic = ref([])
  const lorem = ref('仅支持上传PDF格式文件，文件大小不超过50MB')
  const { confirm } = useModal()
  const ifUpload = ref(false)

  const formData = ref(null)

  const fileAdded = async (file) => {
    formData.value = new FormData()
    formData.value.append('file', file[0])
    ifUpload.value = true
    //将文件上传到服务器
    try {
      console.log('将文件上传到服务器->', formData.value)
      await $axios
        .post('/api/upload', formData.value, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((result) => {
          if (result.code === 200) {
            console.log('上传成功')
            const ok = confirm('文件上传成功')
            if (ok) {
              console.log('ok')
              ifUpload.value = false
            }
          } else {
            basic.value = []
            ifUpload.value = false
            confirm('文件上传失败，请重新上传')
          }
        })
        .catch((err) => {
          console.log(err)
          confirm('作业文件上传失败，请重新上传')
          ifUpload.value = false
          basic.value = []
        })
    } catch (error) {
      basic.value = []
      ifUpload.value = false
      console.log(error)
      confirm('作业文件上传失败，请重新上传')
    }
  }
</script>
