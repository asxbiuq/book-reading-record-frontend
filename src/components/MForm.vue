<template>
  <form>
    <slot name="above_label"></slot>
    <!-- 表单标题 -->
    <label>{{ formLabel }}</label>
    <slot name="under_label"></slot>
    <slot></slot>
    <slot name="above_button"></slot>
    <!-- 添加按钮 -->
    <div v-if="!isPending">
      <button>{{ btnName }}</button>
    </div>
    <div v-else>
      <button disabled>加载中...</button>
    </div>
    <slot name="under_button"></slot>
  </form>
</template>

<script setup>
const props = defineProps(['formLabel', 'btnName','isPending'])
</script>

<style scoped>
@import 'styles/utilities.css';
@import 'styles/components/btn.css';
@tailwind utilities;
@tailwind components;
</style>
