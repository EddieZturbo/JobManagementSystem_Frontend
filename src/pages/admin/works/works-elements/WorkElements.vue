<template>
  <div>
    <VaForm ref="formRef" class="flex flex-wrap">
      <VaInput v-model="workName" label="作业名称" class="mr-2" :clearable="true" />
      <VaSelect v-model="course" :options="courses" label="所属课程" class="mr-2" :clearable="true" />
      <VaButton :disabled="!isValid" icon="add" @click="releaseWork"> 发布新作业 </VaButton>
    </VaForm>
    <br />
    <va-card class="markup-tables mb-8">
      <va-card-title>作业管理表</va-card-title>
      <va-card-content class="overflow-auto">
        <table class="va-table w-full">
          <thead>
            <tr class="styled-header">
              <th>序号</th>
              <th>作业编码</th>
              <th>作业名称</th>
              <th>作业状态</th>
              <th>所属课程编码</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="work in works" :key="work.ranking" class="styled-tbody">
              <td>{{ work.no }}</td>
              <td>{{ work.workCode }}</td>
              <td>{{ work.workName }}</td>
              <td>
                <va-badge
                  :text="work.workStatus === '1' ? '启用' : '弃用'"
                  :color="getQualifyStatusColor(work.workStatus)"
                />
              </td>
              <td>{{ work.courseCode }}</td>
            </tr>
          </tbody>
        </table>
      </va-card-content>
    </va-card>
  </div>
  <div>
    <va-pagination
      v-model="currentPage"
      size="large"
      :pages="visiblePages"
      :visible-pages="visiblePages - 1"
      class="justify-center my-pagination"
      @update:model-value="fetchworks"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, inject, onMounted, computed } from 'vue'

  const $axios: any = inject('$axios') // Access global properties

  let works = ref([]) as any
  let course = ref({ text: '', value: '' })
  let workCode = ref(0)
  let workName = ref('')
  let courses = ref([]) as any

  const currentPage = ref(1)
  const visiblePages = ref(9)

  async function fetchworks(newPage: number) {
    try {
      const params = {
        current: newPage,
        size: 17,
      }
      const response = await $axios.post('/api/work/page', params)
      works.value = response.data.records
      workCode.value = (works.value[works.value.length - 1].workCode *= 1) + 1 // Auto increase workCode
      visiblePages.value = response.data.pages
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(() => fetchworks(currentPage.value)) // Fetch works when component is mounted
  onMounted(() => fetchCourses())

  const isValid = computed(() => workCode.value && workName.value && course.value.value)

  function releaseWork() {
    const params = {
      workCode: workCode.value,
      workName: workName.value,
      workStatus: '1',
      courseCode: course.value.value,
    }
    $axios
      .post('/api/work/add', params)
      .then((response: any) => {
        if (response.code === 200) {
          fetchworks(currentPage.value)
          workCode.value = 0
          workName.value = ''
          course.value = { text: '', value: '' }
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  function fetchCourses() {
    $axios
      .post('/api/course/list')
      .then((response: any) => {
        if (response.code === 200) {
          response.data.forEach((item: any) => {
            courses.value.push({ text: item.courseName, value: item.courseCode })
          })
        }
      })
      .catch((error: any) => {
        console.log(error)
      })
  }

  function getQualifyStatusColor(status: string) {
    return status === '1' ? 'success' : 'danger'
  }
</script>
<style scoped>
  .styled-header th {
    text-align: center;
    font-size: 0.8em;
  }

  .styled-tbody td {
    text-align: center;
    font-size: 1em;
  }
</style>
