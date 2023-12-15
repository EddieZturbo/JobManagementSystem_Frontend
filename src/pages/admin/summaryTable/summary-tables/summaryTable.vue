<template>
  <div>
    <va-card class="markup-tables mb-8">
      <va-card-title>学生作业数据汇总表</va-card-title>
      <va-card-content class="overflow-auto">
        <table class="va-table w-full">
          <thead>
            <tr class="styled-header">
              <th>序号</th>
              <!-- <th>排名</th> -->
              <th>姓名</th>
              <th>学号</th>
              <th>分数</th>
              <th>课程</th>
              <th>作业</th>
              <th>是否合格</th>
              <th>提交状态</th>
              <th>批改状态</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="user in users" :key="user.ranking" class="styled-tbody">
              <td>{{ user.no }}</td>
              <!-- <td>{{ user.ranking }}</td> -->
              <td>{{ user.studentName }}</td>
              <td>{{ user.studentCode }}</td>
              <td>{{ user.score }}</td>
              <td>{{ user.courseName }}</td>
              <td>{{ user.workName }}</td>
              <td>
                <va-badge
                  :text="user.isQualify === 1 ? '合格' : '不合格'"
                  :color="getQualifyStatusColor(user.isQualify)"
                />
              </td>
              <td>
                <va-badge :text="user.isCommit === 1 ? '已提交' : '未提交'" :color="getStatusColor(user.isCommit)" />
              </td>
              <td>
                <va-badge :text="user.jobStatus === 1 ? '已批改' : '未批改'" :color="getStatusColor(user.jobStatus)" />
              </td>
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
      @update:model-value="fetchUsers"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, inject, onMounted } from 'vue'

  const $axios: any = inject('$axios') // Access global properties

  let users = ref([]) as any

  const currentPage = ref(1)
  const visiblePages = ref(9)

  async function fetchUsers(newPage: number) {
    try {
      const params = {
        current: newPage,
        size: 17,
      }
      const response = await $axios.post('/api/job/page', params)
      users.value = response.data.records
      visiblePages.value = response.data.pages
    } catch (error) {
      console.log(error)
    }
  }

  onMounted(() => fetchUsers(currentPage.value)) // Fetch users when component is mounted

  function getQualifyStatusColor(status: number) {
    return status === 1 ? 'success' : 'danger'
  }
  function getStatusColor(status: number) {
    return status === 1 ? 'primary' : 'secondary'
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
