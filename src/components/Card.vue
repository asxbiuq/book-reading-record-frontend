<template>
  <div class="card w-96 bg-primary text-primary-content">
    <div class="card-body">
      <h2 class="card-title" @click="handleClickTitle">&lt&lt {{ title || 'title' }} >></h2>
      <p>作者: {{ description || 'description' }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-error" @click="handleClickBtn">{{ btnName || 'btnName' }}</button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['title', 'description', 'btnName'])
const emits = defineEmits(['clickBtn', 'clickTitle'])
const handleClickBtn = () => {
  emits('clickBtn')
}
const handleClickTitle = () => {
  emits('clickTitle')
}
</script>

<style lang="scss" scoped>
</style>