<template>
  <div class="card">
    <div class="book-img">
      <img :src="imgUrl" alt="image" class="book-photo cursor-pointer" @click="handleClickImage">
    </div>
    <div class="flex flex-col gap-5">
      <div class="flex justify-between">
        <div class="book-title">{{ title }}</div>
        <div @click="handleClickStar" class="cursor-pointer ">
          <div v-if="isFav">
              <i-emojione:star style="font-size:2em;"/>
          </div>
          <div v-else>
            <i-codicon:star-full style="font-size:2em;"/>
          </div>
        </div>
      </div>
      <div class="book-author"> {{ author }}</div>
      <div class="p-rating">
        <input type="radio" name="rating-2" class="p-mask p-mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" class="p-mask p-mask-star-2 bg-orange-400" checked />
        <input type="radio" name="rating-2" class="p-mask p-mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" class="p-mask p-mask-star-2 bg-orange-400" />
        <input type="radio" name="rating-2" class="p-mask p-mask-star-2 bg-orange-400" />
      </div>
      <div class="book-description">{{ description }}</div>
      <div class="btn-danger" @click="handleClickBtn">{{ btnName }}</div>
    </div>
  </div>  
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '标题', required: false },
  author: { type: String, default: '作者', required: false },
  description: { type: String, default: '简介', required: false },
  imgUrl: { type: String, default: 'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg', required: false },
  btnName: { type: String, default: '阅读', required: false },
  isFav: { type: Boolean, default: false, required: false },
})

const emits = defineEmits(['clickBtn', 'clickStar','clickImage'])

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

<style lang="css" scoped>
* {
  color: #ffffff;
}
.book-card {
  @apply container mx-auto bg-teal-400 rounded-2xl  w-[95vw] flex flex-col items-center  p-8 gap-5 max-w-2xl transition-all duration-150 ease-out hover:ease-in
  sm:flex-row sm:w-[90vw] sm:h-[40vh]
}

.book-title {
  @apply truncate font-bold;
}
.book-photo {
  @apply w-[80%] transition-all shadow-lg hover:scale-105 duration-[.3s]  object-cover h-full;
}
.book-img{
  @apply  w-full h-40 flex justify-center content-between 
  sm:w-full sm:h-full
}
</style>