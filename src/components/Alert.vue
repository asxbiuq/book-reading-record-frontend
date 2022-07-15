<script lang="ts" setup>
// defineProps<{
//   info?:string
//   isOpenAlert: boolean
// }>()
const { alertState } = useAlertState()
</script>

<template>
  <teleport to="body">
    <transition
      enter-active-class="animate__animated animate__fadeIn animate__faster"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <div
        v-if="alertState.isOpenAlert"
        class="w-screen flex justify-center z-20 fixed"
      >
        <div
          class="p-alert p-alert-error shadow-lg w-[70vw] max-w-3xl top-12 z-20 fixed"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ alertState.info }}</span>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped></style>
