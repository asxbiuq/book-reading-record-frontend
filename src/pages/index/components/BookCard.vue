<template>
  <div>
    <div class="img-shell" @click="handleClickImage">
      <img :src="imgUrl" alt="image" />
    </div>
    <main class="flex flex-col gap-5">
      <div class="flex justify-between">
        <div class="book-title">{{ title }}</div>
        <div class="icon cursor-pointer" @click="handleClickStar">
          <div v-if="isFav">
            <i-emojione:star style="font-size: 2em" />
          </div>
          <div v-else>
            <i-codicon:star-full style="font-size: 2em" />
          </div>
        </div>
      </div>
      <div class="book-author">{{ author }}</div>
      <div class="p-rating">
        <input
          type="radio"
          name="rating-2"
          class="p-mask p-mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="rating-2"
          class="p-mask p-mask-star-2 bg-orange-400"
          checked
        />
        <input
          type="radio"
          name="rating-2"
          class="p-mask p-mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="rating-2"
          class="p-mask p-mask-star-2 bg-orange-400"
        />
        <input
          type="radio"
          name="rating-2"
          class="p-mask p-mask-star-2 bg-orange-400"
        />
      </div>
      <div class="book-description">{{ description }}</div>
      <div class="btn-danger" @click="handleClickBtn">{{ btnName }}</div>
    </main>
  </div>
</template>

<script setup>
// data
const props = defineProps({
  title: { type: String, default: '标题', required: false },
  author: { type: String, default: '作者', required: false },
  description: { type: String, default: '简介', required: false },
  imgUrl: {
    type: String,
    default: 'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg',
    required: false,
  },
  btnName: { type: String, default: '阅读', required: false },
  isFav: { type: Boolean, default: false, required: false },
})

// event
const emits = defineEmits(['clickBtn', 'clickStar', 'clickImage'])

// function
const handleClickBtn = () => {
  emits('clickBtn')
}
const handleClickStar = () => {
  emits('clickStar')
}
const handleClickImage = () => {
  emits('clickImage')
}
</script>

<style scoped></style>
