<template>
  <div class="app-navbar-actions">
    <color-dropdown class="app-navbar-actions__item" />
    <profile-dropdown class="app-navbar-actions__item app-navbar-actions__item--profile">
      <va-avatar loading />
      <va-avatar>{{ userName }}</va-avatar>
    </profile-dropdown>
  </div>
</template>

<script setup lang="ts">
  import ProfileDropdown from './dropdowns/ProfileDropdown.vue'
  import ColorDropdown from './dropdowns/ColorDropdown.vue'

  withDefaults(
    defineProps<{
      userName?: string
      isTopBar?: boolean
    }>(),
    {
      userName: '',
      isTopBar: false,
    },
  )

  defineEmits<{
    (e: 'update:isTopBar', isTopBar: boolean): void
  }>()
</script>

<style lang="scss" scoped>
  .app-navbar-actions {
    display: flex;
    align-items: center;

    &__item {
      padding: 0;
      margin-left: 1.25rem;
      margin-right: 1.25rem;

      svg {
        height: 24px;
      }

      &:last-of-type {
        margin-right: 0;
      }

      &--profile {
        display: flex;
        justify-content: center;
        margin: auto 0 auto 1.25rem;
      }

      @media screen and (max-width: 640px) {
        margin-right: 0;

        &:first-of-type {
          margin-left: 0;
        }

        &--profile {
          position: absolute;
          right: 0.75rem;
          top: 1.25rem;
          height: fit-content;
          margin: auto;
        }
      }
    }
  }
</style>
