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
      class="btn text-4xl hover:opacity-70 overflow-visible"
    >
      «
    </button>
    <button
      @click="handlePageNext"
      class="btn text-4xl hover:opacity-70 overflow-visible"
    >
      »
    </button>
  </div>
</template>

<style></style>
