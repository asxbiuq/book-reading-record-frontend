<template>
  <form @submit.prevent="handleSubmit">

    <label>添加新的书籍</label>

    <!-- 书名输入栏 -->
      <m_input 
        :label="'书名'"
        :reg="/^\S{4,10}$/"
        v-model:data="title"
        :type="'text'"
        :dataTip="'长度需要为4-10'"
      />

    <!-- 作者输入栏 -->
      <m_input 
        :label="'作者'"
        :reg="/^\S{4,10}$/"
        v-model:data="author"
        :type="'text'"
        :dataTip="'长度需要为4-10'"
      />

    <!-- 作图片输入栏 -->
    <!-- file_type 需要为数组 -->
      <m_input 
        :label="'图片'"
        :type="'file'"
        :file_type="file_type"
        @emit_file="handleFile"
      />
    
    <!-- 添加按钮 -->
    <button>添加</button>

  </form>

</template>

<script setup>
const baseUrl = import.meta.env.VITE_LOCATION_ORIGIN
const { userId, token } = $(useStore())
const { useFetch_AddDoc } = $(useFetchDoc(baseUrl, token))
const title = $ref('')
const author = $ref('')
const file = $ref(null)


const emits = defineEmits(['created'])

// 允许上传的数据类型
const file_type = ['image/png', 'image/jpeg']

  const handleSubmit = async () => {

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
  
    emits('created')
  
    title = ''
    author = ''
    file = null
  }
const handleFile = (f) => {
  file = f
}


// const debounce = (fn, delay) => {
//     let timer; // 维护一个 timer
//     return  function () {
//         let _this = this; // 取debounce执行作用域的this
//         let args = arguments;
//         if (timer) {
//             clearTimeout(timer);
//         }
//         timer = setTimeout(() => {
//             fn.apply(_this, args); // 用apply指向调用debounce的对象，相当于_this.fn(args);
//         }, delay);
//     };
// }


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