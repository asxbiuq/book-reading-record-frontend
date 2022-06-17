<template>
  <form @submit.prevent="handleSubmit">
    <h3>Add a New Book</h3>

    <label for="title">Book title:</label>
    <input type="text" name="title" v-model="title" required>

    <label for="author">Book author:</label>
    <input type="text" name="author" v-model="author" required>

    <button>Add Book</button>
  </form>
</template>

<script setup>
const { addDoc, isPending } = $(useDocument())
const { userId } = $(useStore())
const title = $ref('')
const author = $ref('')

const handleSubmit = async () => {

  await addDoc({
    title: title,
    author: author,
    isFav: false,
    userUid: userId
  })

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