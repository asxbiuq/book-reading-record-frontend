<template>
  <form>
    <slot name="above_label"></slot>
    <!-- 表单标题 -->
    <label>{{ formLabel }}</label>
    <slot name="under_label"></slot>
    <slot></slot>
    <slot name="above_button"></slot>
    <!-- 添加按钮 -->
    <button>{{  btnName }}</button>
    <slot name="under_button"></slot>
  </form>
</template>

<script setup>
const props = defineProps(['formLabel','btnName'])
</script>

<style lang="scss" scoped>
form {
  @apply flex flex-col gap-5 items-center p-5 shadow-2xl bg-slate-100 shadow-slate-50 justify-between;
  
  label {
    @apply font-medium text-gray-800 text-2xl;
  }
  input {
     @apply input w-full input-bordered;
   }
  button {
    @apply btn w-full bg-red-500;
  }
  textarea {
    @apply border-slate-200 border-2;

    padding: 10px;
    outline: none;
    display: block;
    width: 100%;
    height: 10rem;
    box-sizing: border-box;
    margin: 20px auto;
  }
}
</style>