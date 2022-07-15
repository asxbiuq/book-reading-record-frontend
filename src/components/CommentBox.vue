<script lang="ts" setup>
let content = $ref('')

const emit = defineEmits(['submit'])

const handleSubmit = () => {
  emit('submit', content)
  content = ''
}
</script>
<template>
  <form class="grid" @submit.prevent="handleSubmit">
    <textarea
      v-model="content"
      name="comment"
      id=""
      placeholder="请输入你的评论"
      class="bg-[#d6d6cb] p-2 rounded bg-opacity-[30%] h-[10rem] border-sky-300 border-[2px] focus-visible:outline-none focus-visible:border-sky-500"
    ></textarea>
    <fieldset class="py-4">
      <input
        type="submit"
        value="评论"
        class="px-4 py-1 bg-sky-600 bg-opacity-[90%] text-white cursor-pointer rounded-2xl"
      />
      <input
        type="reset"
        value="取消"
        class="px-4 py-1 bg-white bg-opacity-[90%] border ml-3 cursor-pointer rounded-2xl"
      />
    </fieldset>
  </form>
</template>
<style></style>
