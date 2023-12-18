<template>
  <div class="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mb-6">
    <VaSelect
      v-model="value"
      label="选择抄袭检测方法"
      :options="options"
      searchable
      highlight-matched-text
      width="100%"
    />
    <VaSelect
      v-model="course"
      label="选择要检测的课程作业"
      placeholder="下拉选择课程作业"
      color="primary"
      :options="courses"
      searchable
      highlight-matched-text
      clearable="true"
      clearable-icon="va-clear"
    />
    <VaButton v-if="jobs[0]" color="info" class="mr-6 mb-2" @click="showModal = !showModal"> 抄袭检测 </VaButton>
    <VaButton v-if="jobs[0]" color="info" class="mr-6 mb-2"> 辅助批改 </VaButton>
  </div>

  <div>
    <VaTabs v-model="jobStatus">
      <template #tabs>
        <VaTab v-for="tab in ['全部', '已提交', '已批改', '未批改']" :key="tab">
          {{ tab }}
        </VaTab>
      </template>
    </VaTabs>
  </div>

  <div>
    <VaDataTable
      :items="jobs"
      :columns="columns"
      :cell-bind="getCellBind"
      :per-page="perPage"
      :current-page="currentPage"
      :pages="pages"
      selectable
    >
      <template #cell(actions)="{ row, isExpanded }">
        <VaButton
          :icon="isExpanded ? 'va-arrow-up' : 'va-arrow-down'"
          preset="secondary"
          class="w-full"
          @click="row.toggleRowDetails()"
        >
          {{ isExpanded ? '隐藏详情' : '查看详情' }}
        </VaButton>
      </template>
      <template #expandableRow="{ rowData }">
        <div class="flex gap-2">
          <form>
            <th>账号：</th>
            <td>
              <br />
              <h3 style="color: rgb(110, 133, 200)">{{ rowData.username }}</h3>
            </td>
            <th>姓名：</th>
            <td>
              <br />
              <h3 style="color: rgb(110, 133, 200)">{{ rowData.name }}</h3>
            </td>
            <th>相似度：</th>
            <td>
              <VaButton preset="primary"> 查看相似内容 </VaButton>
            </td>
          </form>
        </div>
      </template>
      <template #bodyAppend>
        <tr>
          <td colspan="10">
            <div class="flex justify-center mt-4">
              <VaPagination v-model="currentPage" :pages="pages" />
            </div>
          </td>
        </tr>
      </template>
    </VaDataTable>
  </div>

  <div>
    <VaModal
      v-model="showModal"
      ok-text="Apply"
      close-button
      fullscreen="true"
      @ok="cpDetect"
      @close="ifUProgress = false"
    >
      <h3 class="va-h3">抄袭检测</h3>
      <br />
      <br />
      <VaPopover placement="left" message="设置相似度阈值 超过设定的阈值则表明有抄袭嫌疑">
        <h2 style="color: rgb(110, 133, 200)">🔍相似度阈值：</h2>
      </VaPopover>
      <br />
      <VaSelect v-model="value1" :options="options1" placeholder="Select an option" />
      <br />
      <br />
      <div v-if="ifUProgress">
        <va-progress-bar size="large" indeterminate />
      </div>
    </VaModal>
  </div>
</template>

<script>
  // import { sleep } from '@amcharts/amcharts5/.internal/core/util/Time'
  import { storeToRefs } from 'pinia'
  import { useGlobalStore } from '../../../../stores/global-store'
  const GlobalStore = useGlobalStore()
  const { matrix } = storeToRefs(GlobalStore)

  export default {
    inject: ['$axios', '$router'],
    data() {
      return {
        ifUProgress: false,
        jobStatus: 0,
        options: ['fingerprint_jar', 'ppioin_cnn', 'simhash_cnn'],
        value: 'fingerprint_jar',
        courses: [],
        course: '',
        jobs: [],
        columns: [
          { key: 'id', label: '序号', sortable: true },
          { key: 'studentName', label: '姓名', sortable: true },
          { key: 'commitTime', label: '提交时间', sortable: true },
          { key: 'jobStatus', label: '状态', name: 'jobStatus', sortable: true },
          // { key: 'phone', label: '附件' },
          // { key: 'phone', label: '辅助评分分数' },
          { key: 'phone', label: '学生作业' },
          { key: 'score', label: '成绩' },
          // { key: 'phone', label: '评语' },
        ],
        perPage: 10,
        currentPage: 1,
        showModal: false,
        options1: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
        value1: 0.2,
      }
    },
    computed: {
      pages() {
        return Math.ceil(this.jobs.length / this.perPage)
      },
    },
    watch: {
      value: {
        handler(value) {
          let index = this.options.indexOf(value)
          let methodId = index + 1
          this.$axios
            .post(`/api/modify/check/similarity/method/${methodId}`)
            .then((res) => {
              console.log(res)
            })
            .catch((err) => {
              console.log(err)
            })
        },
        immediate: true,
      },
      course: {
        handler(value) {
          let courseCode = ''
          this.$axios.post('/api/course/list', { course_name: value.split('-')[0] }).then((result) => {
            if (result.code === 200) {
              courseCode = result.data[0].courseCode
              this.$axios
                .post('/api/job/list', {
                  course_code: courseCode,
                  work_name: value.split('-')[1],
                  is_commit: 1,
                })
                .then((result) => {
                  if (result.code !== 200) {
                    console.log(result.data)
                    this.jobs = []
                  } else {
                    this.jobs = result.data
                  }
                })
            }
          })
        },
        // immediate: true,
      },
    },
    mounted() {
      this.$axios.post('/api/work/list').then((result) => {
        if (result.code === 200) {
          console.log(result.data)
          result.data.forEach((item) => {
            this.$axios.post('/api/course/list', { course_code: (item.courseCode *= 1) }).then((result) => {
              if (result.code === 200) {
                this.courses.push(result.data[0].courseName + '-' + item.workName)
                this.course = this.courses[0]
                this.$axios
                  .post('/api/job/list', {
                    course_code: item.courseCode,
                    work_name: item.workName,
                    is_commit: 1,
                  })
                  .then((result) => {
                    if (result.code === 200) {
                      console.log(result.data)
                      this.jobs = result.data
                    }
                  })
              }
            })
          })
        }
      })
    },
    methods: {
      getCellBind(cell, row, column) {
        if (column.key === 'jobStatus') {
          if (cell === 1) {
            return {
              style: { color: '#67C23A' },
              innerHTML: '<span class="status-rounded-commited">已批改</span>',
            }
          } else {
            return {
              style: { color: '#dF476F' },
              innerHTML: '<span class="status-rounded-uncommited">未批改</span>',
            }
          }
        }
      },
      cpDetect() {
        this.showModal = true
        this.ifUProgress = true
        this.$axios
          .post('/api/check_similarity_async/' + this.jobs[0].workCode + '?similar=' + this.value1)
          .then((res) => {
            // sleep(2000).then(() => {
            if (res.code === 200) {
              console.log(res.data.result.matrix)
              matrix.value = res.data.result.matrix
              // matrix.value = [
              //   {
              //     account: '1001',
              //     maxSimilarity: '0.2',
              //     name: 'Eddie',
              //     homeworkId: '1729480862809071660',
              //     similarList: [
              //       {
              //         account: '10011',
              //         name: 'Irving',
              //         homeworkId: '1729480862809071660',
              //         similarity: '0',
              //       },
              //       {
              //         account: '10012',
              //         name: 'James',
              //         homeworkId: '1729480862809071660',
              //         similarity: '0.2',
              //       },
              //     ],
              //   },
              //   {
              //     account: '1002',
              //     maxSimilarity: '0.2',
              //     name: 'EddieZhang',
              //     homeworkId: '1729480862809071660',
              //     similarList: [
              //       {
              //         account: '10021',
              //         name: 'Curry',
              //         homeworkId: '1729480862809071660',
              //         similarity: '0.2',
              //       },
              //       {
              //         account: '10022',
              //         name: 'Durant',
              //         homeworkId: '1729480862809071660',
              //         similarity: '0',
              //       },
              //     ],
              //   },
              // ]
              this.$router.push({ name: 'tree-view' })
              this.ifUProgress = false
              this.showModal = false
            }
            // })
          })
      },
    },
  }
</script>
<style>
  .status-rounded-commited {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: medium;
    display: inline-block;
    padding: 2px 6px;
    border-radius: 12px;
    background-color: #67c23a;
    color: white;
  }

  .status-rounded-uncommited {
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: medium;
    display: inline-block;
    padding: 2px 6px;
    border-radius: 12px;
    background-color: #c23c3a;
    color: white;
  }

  .va-data-table__table-tr--expanded td {
    background: var(--va-background-border);
  }

  .va-data-table__table-expanded-content td {
    background-color: var(--va-background-element);
  }
</style>
