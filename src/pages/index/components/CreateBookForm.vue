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

<script lang="ts" setup>
import { Ref } from 'vue';

// data
const baseUrl = import.meta.env.VITE_POST_URL
const title = ref('')
const author = ref('')
const file:Ref<Blob|string> = ref('')
const isOpen = ref(false)
const target = ref(null)
const fileType = ['image/png', 'image/jpeg'] // 允许上传的数据类型

// composables
const state = useLocalState()
const { usePost } = useFetch(baseUrl, state.value.token)
const {user} = useUser()
// event
const emits = defineEmits(['created'])

// function
onClickOutside(target, () => closeModal())

const closeModal = () => {
  isOpen.value = false
}
const openModal = () => {
  isOpen.value = true
}
const handleFile = (f:File) => {
  file.value = f
}
const handleSubmit = async (e :any) => {
  state.value.isPending = true
  // 节流
  if (!e.target.t1) {
    e.target.t1 = Date.now()
  }
  let t1 = e.target.t1
  let t2 = Date.now()
  if (t2 - t1 > 1000) {
    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('author', author.value)
    formData.append('isFav', 'false')
    formData.append('creator', user.userId)
    formData.append('image', file.value)
    formData.append('time', new Date().toString())

    await usePost('/').post(formData)

    emits('created')

    title.value = ''
    author.value = ''
    file.value = ''
    // 节流的时间重置
    e.target.t1 = t2

    closeModal()
  }

  state.value.isPending = false
}
</script>

<style scoped></style>
