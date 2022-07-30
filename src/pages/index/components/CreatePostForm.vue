<script lang="ts" setup>
// data
const baseUrl = import.meta.env.VITE_POST_URL
let title = $ref('')
let file: Blob | null = $ref(null)
let isOpen = $ref(false)
const target = $ref<HTMLElement | null>(null)
const fileType = ['image/png', 'image/jpeg'] // 允许上传的数据类型
let content = $ref('')

// composables
const state = $(useLocalState())
// const { usePost } = useFetch(baseUrl, state.token)
const { open: openAlert } = useAlert()
const { open: openLoading, close: closeLoading } = useLoading()
const {addPost} = usePost()
// watchEffect(()=>{
//   console.log(content)
// })
// event
const emits = defineEmits(['created'])

// function
onClickOutside($$(target), () => closeModal())

const closeModal = () => {
  isOpen = false
}
const openModal = () => {
  isOpen = true
}
const handleFile = (f: File) => {
  file = f
}

const handleSubmit = useThrottleFn(async (e: any) => {
  openLoading()
  // state.isPending = true

  if (!(title && content )) {
    openAlert('提交错误,标题和内容不能为空,请再次确认!')
    // state.isPending = false
    closeLoading()
    // throw new Error(
    //   `title: ${title ?? null}, content: ${
    //     content ?? null
    //   }`
    // )
  }
  
  // const formData = new FormData()
  // formData.append('title', title)
  // formData.append('author', state.name)
  // formData.append('content', content)
  // formData.append('isFav', 'false')
  // formData.append('creator', state.userId)
  // if (file) {
  //   formData.append('image', file)
  // }
  // formData.append('time', new Date().toString())
  // console.log('formData: ',formData)
  // const { error, data } = $(await usePost('/').post(formData).json())

  try {
    // if (error) {
    //   throw new Error(` ${data.message}`)
    // }
    addPost(title,content,file)
  } catch (error: any) {
    closeLoading()
    openAlert(error)
  }

  emits('created')

  title = ''
  content = ''
  file = null

  closeModal()

  // state.isPending = false
  closeLoading()
}, 100)
// },100)
</script>

<template>
  <div class="create-book-form">
    <div class="btn-info" @click="openModal">添加新的帖子</div>
    <MDialog :is-open="isOpen">
      <MForm
        class="form"
        ref="target"
        :form-label="'添加新的帖子'"
        :btn-name="'添加'"
        @submit.prevent="handleSubmit($event)"
        :isPending="state.isPending"
      >
        <!-- 书名输入栏 -->
        <!-- <MInput
          class="input"
          v-model:data="title"
          :label="'标题'"
          :reg="/^\S{1,10}$/"
          :type="'text'"
          :data-tip="'长度需要为1-10'"
          :placeholder="'标题'"
        /> -->

        <!-- 作者输入栏 -->
        <!-- <MInput
          class="input"
          v-model:data="author"
          :label="'内容'"
          :reg="/^\S{1,100}$/"
          :type="'text'"
          :data-tip="'长度需要为1-100'"
          :placeholder="'内容'"
        /> -->
        <input type="post" v-model="title" placeholder="标题">
        <textarea
          v-model="content"
          name="content"
          id=""
          placeholder="请输入你的内容"
        ></textarea>
        <!-- 作图片输入栏 -->
        <!-- file_type 需要为数组 -->

        <MInput
          class="input"
          :label="'图片'"
          :type="'file'"
          :file-type="fileType"
          :data-tip="'选择的文件类型错误,应为 png 或 jpeg'"
          @emit_file="handleFile"
        />
      </MForm>
    </MDialog>
  </div>
</template>
<style scoped></style>
