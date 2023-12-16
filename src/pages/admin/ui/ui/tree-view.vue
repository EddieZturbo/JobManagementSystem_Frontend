<!-- eslint-disable prettier/prettier -->
<template>
  <div v-if="showModal" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-end">
    <VaButton text-color="#fffff0" class="mr-3 mb-2" @click="showModal = !showModal"> Esc </VaButton>
  </div>

  <div v-if="!showModal">
    <VaButton text-color="#fffff0" class="mr-3 mb-2" @click="returnDetectPage"> 返回超级检测 </VaButton>
    <VaDataTable
      :items="similarities"
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
          @click="
            homeworkAId = row.rowData.homeworkId;
            row.toggleRowDetails()
          "
        >
          {{ isExpanded ? '隐藏详情' : '查看详情' }}
        </VaButton>
      </template>
      <template #expandableRow="{ rowData }">
        <div class="flex gap-2">
          <form>
            <tr>
              <td>
                <h3>账号：</h3>
              </td>
              <td>
                <h3>姓名：</h3>
              </td>
              <td>
                <h3>相似度：</h3>
              </td>
            </tr>
            <tr v-for="(item, index) in rowData.similarList" :key="index">
              <td>
                <h3 style="color: rgb(110, 133, 200)">{{ item.account }}</h3>
              </td>
              <td>
                <h3 style="color: rgb(110, 133, 200)">{{ item.name }}</h3>
              </td>
              <td>
                <Button class="button" @click="showSimilarContent(item.homeworkId)"
                  >{{ item.similarity }} 查看相似内容
                </Button>
              </td>
            </tr>
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
      <vue-pdf-embed v-if="fileA.pdf" :source="fileA.pdf" style="width: 100%; min-width: 600px; margin-right: 10px" />
      <vue-pdf-embed v-if="fileB.pdf" :source="fileB.pdf" style="width: 100%; min-width: 600px" />
    </div>
  </div>
</template>

<script>
  import VuePdfEmbed from 'vue-pdf-embed'
  import { storeToRefs } from 'pinia'
  import { useGlobalStore } from '../../../../stores/global-store'
  const GlobalStore = useGlobalStore()
  const { matrix } = storeToRefs(GlobalStore)
  export default {
    components: {
      VuePdfEmbed,
    },
    inject: ['$axios'],
    data() {
      return {
        showModal: false,
        fileA: { pdf: '' },
        fileB: { pdf: '' },
        homeworkAId: '',
        homeworkBId: '',
        similarities: matrix.value,
        columns: [
          { key: 'account', label: '账号', sortable: true },
          { key: 'name', label: '姓名' },
          { key: 'maxSimilarity', label: '最高相似度' },
          { key: 'actions', label: '详情' },
        ],
      }
    },
    computed: {
      pages() {
        return Math.ceil(this.perPage)
      },
    },
    methods: {
      returnDetectPage() {
        this.$router.push({ name: 'lists' })
      },
      showSimilarContent(homeworkBId) {
        this.homeworkBId = homeworkBId
        console.log(this.homeworkAId, this.homeworkBId)
        this.fileA.pdf = 'http://127.0.0.1:5173/upload/' + this.homeworkAId + '.pdf'
        this.fileB.pdf = 'http://127.0.0.1:5173/upload/' + this.homeworkBId + '.pdf'
        console.log(this.fileA.pdf, this.fileB.pdf)
        // this.$axios
        //   .post('/api/mark_similarity?homeworkIdOne=' + this.homeworkAId + '&homeworkIdTwo=' + this.homeworkBId)
        //   .then((res) => {
        //     console.log(res)
        //     this.homeworkAId = res.data.highlightPdf[0]
        //     this.homeworkBId = res.data.highlightPdf[0]
        // this.fileA.pdf = 'http://127.0.0.1:5173/upload/' + this.homeworkAId + '.pdf'
        // this.fileB.pdf = 'http://127.0.0.1:5173/upload/' + this.homeworkBId + '.pdf'
        //   })
        this.showModal = !this.showModal
      },
    },
  }
</script>
<style scoped>
  .button {
    padding: 0px 0px;
    background-color: transparent;
    /* No background */
    color: rgb(110, 133, 200);
    /* Change text color as per your requirement */
    border: rgb(110, 133, 200);
    /* No border */
    cursor: pointer;
    transition: background-color 0.3s ease;
    height: 30px;
    text-decoration: underline;
    /* Add underline */
    font-style: italic;
    margin-bottom: 2px;
  }

  .button:hover {
    background-color: transparent;
    /* No background on hover */
    color: #0056b3;
    /* Change text color on hover */
  }
</style>
