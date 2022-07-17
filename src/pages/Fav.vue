<script lang="ts" setup>

const { favs, gets, unfav } = useFav()
// console.log(data)
gets()


const handleUnfav = async (book: Post) => {
  const { open, close } = useLoading()
  open()

  try {
    unfav(book)
  } catch (error: any) {
    console.log(error)
    const { open } = useAlert()
    open(error)
  }

  close()
}
const handleDetails = (_book: { _id: string }) => {
  const state = $(useLocalState())
  const router = useRouter()
  state.postId = _book._id
  router.push({
    name: 'Comments',
    params: {
      id: _book._id,
    },
  })
}
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-7">
    <p class="text-violet-400 text-3xl font-bold">我的收藏</p>
    <ul class="flex flex-col gap-10 justify-center">
      <li v-for="book in favs" :key="book._id">
        <BookCard
          :title="book.title"
          :author="book.author"
          :description="book.content"
          :btn-name="'取消收藏'"
          :img-url="book.imageUrl"
          :is-fav="book.isFav"
          @click-btn="handleUnfav(book)"
          @click-star="handleUnfav(book)"
          @click-image="handleDetails(book)"
          class="book-card hover:scale-105 duration-200 drop-shadow-2xl shadow-2xl bg-blend-color-burn"
        />
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
