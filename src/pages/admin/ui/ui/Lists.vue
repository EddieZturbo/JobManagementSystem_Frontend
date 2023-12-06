<template>
  <div class="max-w-xs">
    <VaSelect
      v-model="value"
      label="选择抄袭检测方法"
      :options="options"
      searchable
      highlight-matched-text
      width="100%"
    />
  </div>
</template>

<script>
  export default {
    inject: ['$axios'],
    data() {
      return {
        options: ['fingerprint_jar', 'ppioin_cnn', 'simhash_cnn'],
        value: 'fingerprint_jar',
      }
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
  }
</script>
