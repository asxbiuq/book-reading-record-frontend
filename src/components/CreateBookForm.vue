<template>
  <form @submit.prevent="handleSubmit">

    <label>添加新的书籍</label>

    <div class="flex flex-row items-center gap-5">
      <label for="title">书名:</label>
      <input type="text" name="title" v-model="title" required class="h-10">
    </div>

    <div class="flex flex-row items-center gap-5">
      <label for="author">作者:</label>
      <input type="text" name="author" v-model="author" required class="h-10">
    </div>

    <div class="w-full text-center">
      <button class="w-1/3">添加</button>
    </div>

  </form>
</template>

<script setup>
const { addDoc, isPending } = $(useDocument())
const { userId } = $(useStore())
const title = $ref('')
const author = $ref('')
const emits = defineEmits(['created'])

const handleSubmit = async () => {

  await addDoc({
    title: title,
    author: author,
    isFav: false,
    userUid: userId
  })

  emits('created')

  title = ''
  author = ''
}
</script>

<style lang="scss">
form {
  @apply flex flex-col gap-5 items-center p-5 shadow-2xl bg-slate-100 shadow-slate-50 justify-between
}

form label {
  @apply font-medium text-gray-800 text-2xl
}

form input {
  @apply input rounded-none
}

form button {
  @apply btn w-4/12 min-w-fit bg-red-500
}

form textarea {
  @apply border-slate-200 border-2;
  /* border: 1px solid black; */
  padding: 10px;
  outline: none;
  display: block;
  width: 100%;
  height: 10rem;
  box-sizing: border-box;
  margin: 20px auto;
}

form input[type="file"] {
  @apply max-w-full
}
</style>