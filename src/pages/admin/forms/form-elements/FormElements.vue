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
    @file-added="insertJob"
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
  import { storeToRefs } from 'pinia'
  import { useGlobalStore } from '../../../..//stores/global-store'
  import moment from 'moment'

  const GlobalStore = useGlobalStore()
  const { userName, studentCode } = storeToRefs(GlobalStore)

  const $axios = inject('$axios')
  const basic = ref([])
  const lorem = ref('仅支持上传PDF格式文件，文件大小不超过50MB')
  const { confirm } = useModal()
  const ifUpload = ref(false)

  const options = ref(['WebDev-作业管理系统前后端开发'])

  const value = ref([])

  const isDisabled = computed(() => {
    return value.value.length === 0 ? true : false
  })

  const corseName = computed(() => {
    return value.value.split('-')[0]
  })

  const workName = computed(() => {
    return value.value.split('-')[1]
  })

  const JobId = ref('')

  const formData = ref(null)

  const fileAdded = async () => {
    ifUpload.value = true
    //将文件上传到服务器
    try {
      console.log('将文件上传到服务器->', formData.value)
      await $axios
        .post('/api/upload/' + JobId.value, formData.value, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then((result) => {
          if (result.code === 200) {
            console.log('上传成功')
            const ok = confirm('作业上传成功')
            if (ok) {
              console.log('ok')
              ifUpload.value = false
            }
          } else {
            basic.value = []
            ifUpload.value = false
            confirm('作业文件上传失败，请重新上传')
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
  //TODO 作业的id和文件名绑定关系
  //将作业提交信息存储到数据库
  const insertJob = async (file) => {
    console.log(file)
    console.log(formData.value)
    try {
      const result = await $axios.post('/api/job/insertJob', {
        score: 0,
        studentName: userName.value,
        studentCode: studentCode.value,
        isQualify: 0,
        isCommit: 1,
        jobStatus: 0,
        commitTime: moment().utcOffset(480).format('YYYY-MM-DD HH:mm:ss'),
        courseCode: 10,
        courseName: corseName.value,
        workCode: 101,
        workName: workName.value,
      })
      if (result.code === 200) {
        console.log('作业信息存储成功')
        JobId.value = result.data

        formData.value = new FormData()
        formData.value.append('file', file[0])

        fileAdded()
      }
    } catch (error) {
      console.log(error)
      basic.value = []
    }
  }
</script>
