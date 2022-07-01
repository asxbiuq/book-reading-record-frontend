<template>
  <div class="btn-info" @click="openModal">添加书籍</div>
  <m_Dialog :is-open="isOpen" class="dialog">
    <m_form
      ref="target"
      :form-label="'添加新的书籍'"
      :btn-name="'添加'"
      class="form"
      @submit.prevent="handleSubmit($event)"
    >
      <!-- 书名输入栏 -->
      <m_input
        v-model:data="title"
        :input="'h-10 w-full input'"
        :tooltip="'w-full'"
        :label="'书名'"
        :reg="/^\S{4,10}$/"
        :type="'text'"
        :data-tip="'长度需要为4-10'"
        :placeholder="'书名'"
      />

      <!-- 作者输入栏 -->
      <m_input
        v-model:data="author"
        :input="'h-10 w-full input'"
        :tooltip="'w-full'"
        :label="'作者'"
        :reg="/^\S{4,10}$/"
        :type="'text'"
        :data-tip="'长度需要为4-10'"
        :placeholder="'作者'"
      />

      <!-- 作图片输入栏 -->
      <!-- file_type 需要为数组 -->

      <m_input
        :input="'h-10 w-full input'"
        :tooltip="'w-full'"
        :label="'图片'"
        :type="'file'"
        :fileType="fileType"
        :data-tip="'选择的文件类型错误,应为 png 或 jpeg'"
        @emit_file="handleFile"
      />
    </m_form>
  </m_Dialog>
</template>

<script setup>
const baseUrl = import.meta.env.VITE_LOCATION_ORIGIN;
const { userId, token } = $(useStore());
const { useFetch_AddDoc } = $(useFetchDoc(baseUrl, token));
const title = $ref("");
const author = $ref("");
const file = $ref(null);
const isOpen = $ref(false);
// const addbtn = ref(null)
const target = ref(null);

onClickOutside(target, () => closeModal());

function closeModal() {
  isOpen = false;
}
function openModal() {
  isOpen = true;
}

const emits = defineEmits(["created"]);

// 允许上传的数据类型
const fileType = ["image/png", "image/jpeg"];

const handleSubmit = async (e) => {
  // 节流
  if (!e.target.t1) {
    e.target.t1 = Date.now();
  }
  let t1 = e.target.t1;
  let t2 = Date.now();
  if (t2 - t1 > 1000) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("isFav", false);
    formData.append("userUid", userId);
    formData.append("image", file);

    await useFetch_AddDoc("feed/post/").post(formData);

    emits("created");

    title = "";
    author = "";
    file = null;
    // 节流的时间重置
    e.target.t1 = t2;

    closeModal();
  }
};
const handleFile = (f) => {
  file = f;
};
</script>

<style scoped></style>
