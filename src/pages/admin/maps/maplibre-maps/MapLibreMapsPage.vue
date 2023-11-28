<template>
  <div>
    <VaSelect v-model="value" label="班级" :options="options" multiple>
      <VaChip
        v-for="chip in value"
        :key="chip"
        size="small"
        class="mr-1 my-1"
        closeable
        @update:modelValue="deleteChip(chip)"
      >
        {{ chip }}
      </VaChip>
    </VaSelect>
    <br />
    <br />
    <VaSwitch v-model="approved" left-label="true" label="已批改 " color="success" />
    <VaSwitch v-model="unapproved" style="padding-left: 20px" left-label="true" label="未批改 " color="warning" />
    <VaSwitch v-model="overdue" style="padding-left: 20px" left-label="true" label="逾期未提交 " color="danger" />
  </div>
  <br />
  <br />
  <hr />
  <div>
    <va-list>
      <va-list-label> Files </va-list-label>

      <va-list-item v-for="(file, index) in files" :key="index" class="list__item">
        <va-list-item-section avatar>
          <va-avatar>
            <img :src="img" :alt="file.fileName" />
          </va-avatar>
        </va-list-item-section>

        <va-list-item-section>
          <va-list-item-label>
            {{ file.studentName }}
          </va-list-item-label>

          <va-list-item-label caption>
            {{ file.fileUrl }}
          </va-list-item-label>
        </va-list-item-section>

        <va-list-item-section icon>
          <va-icon name="remove_red_eye" color="background-element" />
        </va-list-item-section>

        <va-button disabled="true" color="info" gradient class="mr-6 mb-2"> 已批改 </va-button>
        <va-button disabled="true" color="danger" gradient class="mr-6 mb-2"> 逾期未提交 </va-button>
        <va-button color="warning" gradient class="mr-6 mb-2" @click="previewFile(file.fileUrl)"> 待批改 </va-button>
      </va-list-item>
    </va-list>
  </div>
</template>

<script setup>
  import { inject, ref } from 'vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()
  import { storeToRefs } from 'pinia'
  import { useGlobalStore } from '../../../../stores/global-store'
  const GlobalStore = useGlobalStore()
  const { uploadedFileName } = storeToRefs(GlobalStore)

  const img = '/pdf.png'
  const files = ref([])

  const $axios = inject('$axios')

  const options = ref(['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'])
  const value = ref(['one', 'two'])

  const approved = ref(false)
  const unapproved = ref(true)
  const overdue = ref(false)

  const deleteChip = (chip) => {
    value.value = value.value.filter((v) => v !== chip)
  }

  const fetchData = async () => {
    try {
      const response = await $axios.get('/api/files')
      console.log(response.data)
      response.data.forEach((element) => {
        element.studentName = 'Eddie'
        files.value.push({
          studentName: element.studentName,
          fileName: element.fileName,
          fileUrl: element.url,
        })
      })
    } catch (error) {
      console.log(error)
    }
  }

  let fileSeperate = ''
  const previewFile = (fileName) => {
    fileSeperate = fileName.split('/')
    fileName = fileSeperate[fileSeperate.length - 1]
    uploadedFileName.value = fileName
    console.log('previewFile:', fileName)
    router.push({ name: 'dashboard' })
  }

  fetchData()
</script>

<style lang="scss">
  .list__item + .list__item {
    margin-top: 20px;
  }
</style>
