<template>
  <div class="profile-dropdown-wrapper">
    <va-dropdown v-model="isShown" class="profile-dropdown" stick-to-edges :offset="[13, 0]">
      <template #anchor>
        <span class="profile-dropdown__anchor">
          <slot />
          <va-icon class="px-2" :name="isShown ? 'angle_up' : 'angle_down'" :color="colors.primary" />
        </span>
      </template>
      <va-dropdown-content class="profile-dropdown__content">
        <va-list-item v-for="option in students" :key="option.studentCode" class="p-2">
          <button @click="changeStudent(option.userName, option.studentCode)">{{ t(option.userName) }}</button>
        </va-list-item>
      </va-dropdown-content>
    </va-dropdown>
  </div>
</template>

<script setup lang="ts">
  import { ref, inject, onMounted } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useColors } from 'vuestic-ui'
  import { storeToRefs } from 'pinia'
  import { useGlobalStore } from '../../../..//stores/global-store'

  const GlobalStore = useGlobalStore()
  const { userName, studentCode } = storeToRefs(GlobalStore)

  const { t } = useI18n()
  const { colors } = useColors()
  const students = ref([{ userName: '', studentCode: 0 }])

  const $axios: any = inject('$axios')
  import { AxiosResponse } from 'axios'

  onMounted(() => {
    $axios.post('/api/student/list').then((res: AxiosResponse) => {
      res.data.forEach((item: any) => {
        students.value.push({ userName: item.name, studentCode: item.studentCode })
      })
    })
  })

  const changeStudent = (name: string, code: number) => {
    studentCode.value = code
    userName.value = name
  }

  withDefaults(
    defineProps<{
      options?: { name: string; redirectTo: string }[]
    }>(),
    {
      options: () => [
        {
          name: 'logout',
          redirectTo: 'login',
        },
      ],
    },
  )

  const isShown = ref(false)
</script>

<style lang="scss" scoped>
  .profile-dropdown {
    cursor: pointer;

    &__anchor {
      display: inline-block;
    }

    &__item {
      display: block;
      color: var(--va-gray);

      &:hover,
      &:active {
        color: var(--va-primary);
      }
    }
  }
</style>
