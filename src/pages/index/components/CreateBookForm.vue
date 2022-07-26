<script lang="ts" setup>
// data
const baseUrl = import.meta.env.VITE_POST_URL
let title = $ref('')
let author = $ref('')
let file: Blob | null = $ref(null)
let isOpen = $ref(false)
const target = $ref<HTMLElement | null>(null)
const fileType = ['image/png', 'image/jpeg'] // 允许上传的数据类型

// composables
const state = $(useLocalState())
const { usePost } = useFetch(baseUrl, state.token)
const { open: openAlert } = useAlert()
const { open: openLoading, close: closeLoading } = useLoading()

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

  if (!(title && author && file)) {
    openAlert('书籍表单提交错误,请再次确认!')
    // state.isPending = false
    closeLoading()
    throw new Error(
      `title: ${title ?? null}, author: ${author ?? null}, file: ${
        file ?? null
      }`
    )
  }

  const formData = new FormData()
  formData.append('title', title)
  formData.append('author', author)
  formData.append('isFav', 'false')
  formData.append('creator', state.userId)
  formData.append('image', file)
  formData.append('time', new Date().toString())

  const { error, data } = $(await usePost('/').post(formData).json())

  try {
    if (error) {
      throw new Error(` ${data.message}`)
    }
  } catch (error: any) {
    closeLoading()
    openAlert(error)
  }

  emits('created')

  title = ''
  author = ''
  file = null

  closeModal()

  // state.isPending = false
  closeLoading()
}, 100)
// },100)
</script>

<template>
  <div class="create-book-form">
    <div class="btn-info" @click="openModal">添加书籍</div>
    <MDialog :is-open="isOpen">
      <MForm
        class="form"
        ref="target"
        :form-label="'添加新的书籍'"
        :btn-name="'添加'"
        @submit.prevent="handleSubmit($event)"
        :isPending="state.isPending"
      >
        <!-- 书名输入栏 -->
        <MInput
          class="input"
          v-model:data="title"
          :label="'书名'"
          :reg="/^\S{4,10}$/"
          :type="'text'"
          :data-tip="'长度需要为4-10'"
          :placeholder="'书名'"
        />

        <!-- 作者输入栏 -->
        <MInput
          class="input"
          v-model:data="author"
          :label="'作者'"
          :reg="/^\S{4,10}$/"
          :type="'text'"
          :data-tip="'长度需要为4-10'"
          :placeholder="'作者'"
        />

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
