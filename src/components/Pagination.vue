<script setup lang="ts">
const emits = defineEmits(['PagePre', 'PageNext'])

const handlePageNext = () => {
  emits('PageNext')
}

const handlePagePre = () => {
  emits('PagePre')
}
</script>
<template>
  <div class="btn-group grid grid-cols-2">
    <button
      @click="handlePagePre"
      class="pagination"
    >
      «
    </button>
    <button
      @click="handlePageNext"
      class="pagination"
    >
      »
    </button>
  </div>
</template>

<style scoped>
.pagination {
  @apply btn bg-sky-400 hover:bg-sky-600 text-4xl border-0
  hover:opacity-70 overflow-visible w-[45vw] sm:w-[16rem];
}
</style>
