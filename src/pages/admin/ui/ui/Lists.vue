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
    <VaInput v-model.number="perPage" type="number" placeholder="Items..." label="Items per page" />
    <VaInput v-model.number="currentPage" type="number" placeholder="Page..." label="Current page" />
    <VaButton color="info" class="mr-6 mb-2" @click="showModal = !showModal"> 抄袭检测 </VaButton>
    <VaButton color="info" class="mr-6 mb-2"> 辅助批改 </VaButton>
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
      :items="users"
      :columns="columns"
      :cell-bind="getCellBind"
      :per-page="perPage"
      :current-page="currentPage"
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
    <VaModal v-model="showModal" ok-text="Apply" close-button fullscreen="true" @ok="cpDetect">
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
  import { sleep } from '@amcharts/amcharts5/.internal/core/util/Time'

  export default {
    inject: ['$axios', '$router'],
    data() {
      return {
        ifUProgress: false,
        jobStatus: 0,
        options: ['fingerprint_jar', 'ppioin_cnn', 'simhash_cnn'],
        value: 'fingerprint_jar',
        users: [
          {
            id: 1,
            name: 'Leanne Graham',
            username: 'Bret',
            status: '0',
            phone: '1-770-736-8031 x56442',
            website: 'hildegard.org',
          },
          {
            id: 2,
            name: 'Ervin Howell',
            username: 'Antonette',
            status: '1',
            phone: '010-692-6593 x09125',
            website: 'anastasia.net',
          },
          {
            id: 3,
            name: 'Clementine Bauch',
            username: 'Samantha',
            status: '0',
            phone: '1-463-123-4447',
            website: 'ramiro.info',
          },
          {
            id: 4,
            name: 'Patricia Lebsack',
            username: 'Karianne',
            status: '1',
            phone: '493-170-9623 x156',
            website: 'kale.biz',
          },
          {
            id: 5,
            name: 'Chelsey Dietrich',
            username: 'Kamren',
            status: '0',
            phone: '(254)954-1289',
            website: 'demarco.info',
          },
        ],
        columns: [
          { key: 'id', label: '序号', sortable: true },
          { key: 'username', label: '姓名', sortable: true },
          { key: 'name', label: '提交时间', sortable: true },
          { key: 'status', label: '状态', name: 'status', sortable: true },
          { key: 'phone', label: '学生作业' },
          { key: 'phone', label: '附件' },
          { key: 'phone', label: '辅助评分分数' },
          { key: 'phone', label: '学生作业' },
          { key: 'phone', label: '成绩' },
          { key: 'phone', label: '评语' },
        ],
        perPage: 3,
        currentPage: 1,
        showModal: false,
        options1: ['0.1', '0.2', '0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9', '1'],
        value1: 0.2,
      }
    },
    computed: {
      pages() {
        return Math.ceil(this.perPage)
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
    },
    methods: {
      getCellBind(cell, row, column) {
        if (column.key === 'status') {
          if (cell === '1') {
            return {
              style: { color: '#67C23A' },
              innerHTML: '<span class="status-rounded-commited">已提交</span>',
            }
          } else {
            return {
              style: { color: '#dF476F' },
              innerHTML: '<span class="status-rounded-uncommited">未提交</span>',
            }
          }
        }
      },
      cpDetect() {
        this.showModal = true
        this.ifUProgress = true
        sleep(2000).then(() => {
          this.$router.push({ name: 'tree-view' })
          this.ifUProgress = false
          this.showModal = false
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
