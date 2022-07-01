<template>
  <form>
    <slot name="above_label"></slot>
    <!-- 表单标题 -->
    <label>{{ formLabel }}</label>
    <slot name="under_label"></slot>
    <slot></slot>
    <slot name="above_button"></slot>
    <!-- 添加按钮 -->
    <button>{{ btnName }}</button>
    <slot name="under_button"></slot>
  </form>
</template>

<script setup>
const props = defineProps(["formLabel", "btnName"]);
</script>

<style scoped></style>
