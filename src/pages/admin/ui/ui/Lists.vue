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
    <VaButton v-if="jobs[0]" color="info" class="mr-6 mb-2" @click="showScoring = !showScoring"> 辅助批改 </VaButton>
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
      class="table"
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

  <div>
    <VaModal
      v-model="showScoring"
      ok-text="Apply"
      close-button
      fullscreen="true"
      @ok="assistScoring"
      @close="ifUProgress = false"
    >
      <h3 class="va-h3">辅助批改</h3>
      <br />
      <br />
      <VaPopover placement="left" message="设三个参考值各占辅助评分的参考比例 三个比例值之和为1">
        <h2 style="color: rgb(110, 133, 200)">🔍评分参考占比：</h2>
      </VaPopover>
      <br />
      <br />
      抄袭分数占比
      <VaSelect v-model="assitValue1" :options="assitValues1" placeholder="Select an option" />
      <br />
      <br />
      内容评分占比
      <VaSelect v-model="assitValue2" :options="assitValues2" placeholder="Select an option" />
      <br />
      <br />
      参考文献评分占比
      <VaSelect v-model="assitValue3" :options="assitValues3" placeholder="Select an option" />
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
        courseCode: '',
        workName: '',
        jobs: [],
        columns: [
          { key: 'id', label: '序号', sortable: true },
          { key: 'studentName', label: '姓名', sortable: true },
          { key: 'commitTime', label: '提交时间', sortable: true },
          { key: 'jobStatus', label: '状态', name: 'jobStatus', sortable: true },
          { key: 'auxiliaryScore', label: '辅助评分分数' },
          { key: 'score', label: '成绩' },
        ],
        perPage: 10,
        currentPage: 1,
        showModal: false,
        showScoring: false,
        options1: ['0', '0.03', '0.05', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
        value1: 0.2,
        assitValue1: 0,
        assitValue2: 0,
        assitValue3: 0,
        assitValues1: ['0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
        assitValues2: ['0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
        assitValues3: ['0', '0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
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
          this.workName = value.split('-')[1]
          this.$axios.post('/api/course/list', { course_name: value.split('-')[0] }).then((result) => {
            if (result.code === 200) {
              this.courseCode = result.data[0].courseCode
              this.$axios
                .post('/api/job/list', {
                  course_code: this.courseCode,
                  work_name: this.workName,
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
            if (res.code === 200) {
              console.log(res.data.result.matrix)
              //冒泡排序res.data.result.matrix
              for (let i = 0; i < res.data.result.matrix.length; i++) {
                for (let j = 0; j < res.data.result.matrix.length - i - 1; j++) {
                  if (res.data.result.matrix[j].maxSimilarity < res.data.result.matrix[j + 1].maxSimilarity) {
                    let temp = res.data.result.matrix[j]
                    res.data.result.matrix[j] = res.data.result.matrix[j + 1]
                    res.data.result.matrix[j + 1] = temp
                  }
                }
              }
              matrix.value = res.data.result.matrix
              this.$router.push({ name: 'tree-view' })
              this.ifUProgress = false
              this.showModal = false
            }
          })
      },
      assistScoring() {
        this.showScoring = true
        this.ifUProgress = true
        if (this.assitValue1 * 10 + this.assitValue2 * 10 + this.assitValue3 * 10 !== 10) {
          this.showScoring = true
          this.ifUProgress = false
          this.$vaModal.confirm('三个值的占比之和必须为 1  请调整后重试')
        } else {
          this.$axios
            .post(
              '/api/auxiliary_score/' +
                this.jobs[0].workCode +
                '?ratio_pl=' +
                this.assitValue1 +
                '&ratio_content=' +
                this.assitValue2 +
                '&ratio_ref=' +
                this.assitValue3,
              console.log('辅助批改'),
            )
            .then((res) => {
              if (res.code === 200) {
                //辅助评分完成后刷新数据
                this.$axios
                  .post('/api/job/list', {
                    course_code: this.courseCode,
                    work_name: this.workName,
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
              this.ifUProgress = false
              this.showScoring = false
            })
        }
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

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table td {
    padding: 16px;
    border-bottom: 1px solid #ebeef5;
    color: #474849;
    font-family: 'Microsoft YaHei', '宋体';
    font-size: 16px;
    font-weight: normal;
    line-height: 1.5;
    vertical-align: middle;
  }

  .table tr:nth-child(2n) {
    background-color: #fafafa;
  }
</style>
