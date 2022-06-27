<template>

  <m_form :formLabel="'添加新的书籍'" :btnName="'添加'" @submit.prevent="handleSubmit">
    <input type="text" @keydown="handleInput2($event)">


    <!-- 作者输入栏 -->
    <m_input :label="'作者'" :reg="/^\S{4,10}$/" v-model:data="author" :type="'text'" :dataTip="'长度需要为4-10'" />

    <!-- 作图片输入栏 -->
    <!-- file_type 需要为数组 -->
    <m_input :label="'图片'" :type="'file'" :file_type="file_type" @emit_file="handleFile" />

  </m_form>

</template>

<script setup>
const handleSubmit = async (e) => {
  if (!e.target.t1) {
    e.target.t1 = 0
  }
  let t1 = e.target.t1
  let t2 = new Date()
  //delay time : 1000
  if (t2 - t1 > 1000) {
    const formData = new FormData()
    formData.append('title', title)
    formData.append('author', author)
    formData.append('isFav', false)
    formData.append('userUid', userId)
    formData.append('image', file)

    await useFetch_AddDoc(
      'feed/post/'
    )
      .post(formData)

    e.target.t1 = t2
    emits('created')

    // title = ''
    // author = ''
    // file = null
  }
}
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
    /* border: 1px solid black; */
    padding: 10px;
    outline: none;
    display: block;
    width: 100%;
    height: 10rem;
    box-sizing: border-box;
    margin: 20px auto;
  }
}

// .active {
//   background-color: red;
// }
// .error {
//   background-color: #fce4e4;
//   border: 1px solid #cc0033;
//   outline: none;
// }
</style>