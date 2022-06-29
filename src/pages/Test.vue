<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <button
      type="button"
      @click="openModal"
      class="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
    >
      Open dialog
    </button>
  </div>

  <m_Dialog
    :isOpen="isOpen"
  >
    <m_form
      :formLabel="'添加新的书籍'"
      :btnName="'添加'"
      @submit.prevent="handleSubmit($event)"
      class="rounded-lg scale-[115%] p-[3.25rem]" 
      ref="target"
        
    >

      <!-- 书名输入栏 -->
        <m_input 
          :label="'书名'"
          :reg="/^\S{4,10}$/"
          v-model:data="title"
          :type="'text'"
          :dataTip="'长度需要为4-10'"
          :placeholder="'书名'"
        />

      <!-- 作者输入栏 -->
        <m_input 
          :label="'作者'"
          :reg="/^\S{4,10}$/"
          v-model:data="author"
          :type="'text'"
          :dataTip="'长度需要为4-10'"
          :placeholder="'作者'"
        />

      <!-- 作图片输入栏 -->
      <!-- file_type 需要为数组 -->
        <m_input 
          :label="'图片'"
          :type="'file'"
          :file_type="file_type"
          @emit_file="handleFile"
          :dataTip="'选择的文件类型错误,应为 png 或 jpeg'"
        />

    </m_form>
  </m_Dialog>
</template>

<script setup>
import { ref } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'

const isOpen = $ref(true)

const target = ref(null)

onClickOutside(target, () => closeModal())

function closeModal() {
  isOpen = false
}
function openModal() {
  isOpen = true
}
const baseUrl = import.meta.env.VITE_LOCATION_ORIGIN
const { userId, token } = $(useStore())
const { useFetch_AddDoc } = $(useFetchDoc(baseUrl, token))
const title = $ref('')
const author = $ref('')
const file = $ref(null)


const emits = defineEmits(['created'])

// 允许上传的数据类型
const file_type = ['image/png', 'image/jpeg']

const handleSubmit = async (e) => {
  // 节流
  if (!e.target.t1) {
    e.target.t1 = Date.now()
  }
  let t1 = e.target.t1
  let t2 = Date.now()
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
  
    emits('created')
  
    title = ''
    author = ''
    file = null
    // 节流的时间重置
    e.target.t1 = t2
  }
}
const handleFile = (f) => {
  file = f
}

const handFileTypeError = () => {

}
</script>
