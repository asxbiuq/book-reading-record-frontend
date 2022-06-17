<template>
  <form @submit.prevent="handleSubmit">

    <label>Add a New Book</label>

    <div class="flex flex-row items-center gap-5">
      <label for="title">Book title:</label>
      <input type="text" name="title" v-model="title" required class="h-10">
    </div>

    <div class="flex flex-row items-center gap-5">
      <label for="author">Book author:</label>
      <input type="text" name="author" v-model="author" required class="h-10">
    </div>

    <div>
      <button>Add Book</button>
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

<style>
form {
  padding: 10px;
  margin-top: 10px;
  border: 1px dashed #c3c8ce;
}
</style>