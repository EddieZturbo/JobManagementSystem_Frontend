<template>
  <div v-if="showModal" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaButton text-color="#fffff0" class="mr-3 mb-2" @click="showModal = !showModal"> Esc </VaButton>
  </div>

  <div v-if="!showModal">
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
              <VaButton preset="primary" @click="showModal = !showModal"> 查看相似内容 </VaButton>
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

  <div v-if="showModal">
    <div style="display: flex; width: 100%">
      <vue-pdf-embed v-if="state.pdf" :source="state.pdf" style="width: 100%; min-width: 600px; margin-right: 10px" />
      <vue-pdf-embed v-if="state.pdf" :source="state.pdf" style="width: 100%; min-width: 600px" />
    </div>
  </div>
</template>

<script>
  import VuePdfEmbed from 'vue-pdf-embed'
  export default {
    components: {
      VuePdfEmbed,
    },
    inject: ['$axios'],
    data() {
      return {
        showModal: false,
        state: { pdf: 'http://127.0.0.1:5173/upload/1729480862809071656.pdf' },
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
          { key: 'phone', label: '成绩' },
          { key: 'phone', label: '评语' },
          { key: 'id', label: '最高相似度' },
          { key: 'actions', label: '详情' },
        ],
      }
    },
    computed: {
      pages() {
        return Math.ceil(this.perPage)
      },
    },
  }
</script>
