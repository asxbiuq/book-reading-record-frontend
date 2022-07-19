<script lang="ts" setup>
let pageIndex = 1

const { favs, gets, unfav } = useFav()
const router = useRouter()
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

  state.postId = _book._id
  router.push({
    name: 'Comments',
    params: {
      id: _book._id,
    },
  })
}
const handlePageNext = async () => {
  const { open, close } = useLoading()
  open()
  try {
    pageIndex++
    await gets(pageIndex)
  } catch (error: any) {
    pageIndex--
    console.log(pageIndex)
    const { open } = useAlert()
    open(error)
  }
  close()
}
const handlePagePre = async () => {
  const { open, close } = useLoading()
  open()
  if (pageIndex <= 1) {
    console.log('The first page!')
    const { open } = useAlert()
    open('已经是第一页!')
    return
  } else {
    pageIndex--
    await gets(pageIndex)
    console.log('CurrentPage:', pageIndex)
  }
  close()
}
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-7">
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
      <div v-if="favs.length !== 0">
        <Pagination @PagePre="handlePagePre" @PageNext="handlePageNext" />
      </div>
    </ul>
  </div>
</template>

<style scoped></style>
