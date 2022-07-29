<script lang="ts" setup>
import { HtmlHTMLAttributes } from 'vue'
import { useRequest } from 'vue-request'

const target = $ref<HTMLElement | null>(null)

// composables
const state = $(useLocalState())
const {  deletePost } = $(usePost())
const router = useRouter()
let isScrollToTop = $(useScrollToTop())
const { addFav, deleteFav } = useFav()
const { myPosts, getMyPosts, deleteMyPostFav, addMyPostFav } = $(useMyPost())

watch($$(myPosts), () => {
  console.log('myPosts: ', myPosts)
})

// function
if (new Date(state.expiryDate).getTime() - new Date().getTime() < 0) {
  const { open } = useAlert()
  open('登陆认证已失效,请重新登陆')
  router.push({ name: 'Login' })
}
const handleGetBooks = async () => {
  await getMyPosts()
}

if (!state.token) {
  router.push({ name: 'Login' })
}
if (!myPosts.length) {
  handleGetBooks()
}

const handleDelete = async (book: Post) => {
  const { open, close } = useLoading()
  open()
  state.isPending = true

  try {
    await deletePost(book._id)
  } catch (error: any) {
    console.log(error)
    const { open } = useAlert()
    open(error)
  }
  state.isPending = false
  close()
}

const handleUpdate = async (book: Post) => {
  const { open, close } = useLoading()
  open()
  state.isPending = true

  try {
    if (book.isFav) {
      await deleteFav(book)
      await deleteMyPostFav(book)
    } else {
      await addFav(book)
      await addMyPostFav(book)
    }
    // await UpdatePost(book)
  } catch (error: any) {
    console.log(error)
    const { open } = useAlert()
    open(error)
  }
  state.isPending = false
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
onMounted(() => {
  if (target) {
    hideElementOnScroll(target)
  } else {
    throw new Error(`target is ${target || null}`)
  }
})
const handleClickToTop = useThrottleFn(() => {
  // do something, it will be called at most 1 time per second
  isScrollToTop = true
}, 1000)
// 初始化页数，默认为1
let pageIndex = 1

// console.log(showList)

const handlePageNext = async () => {
  const { open, close } = useLoading()
  open()
  try {
    pageIndex++
    await getMyPosts(pageIndex)
  } catch (error: any) {
    pageIndex--
    await getMyPosts(pageIndex)
    console.log(error)
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
  } else {
    pageIndex--
    await getMyPosts(pageIndex)
    console.log('CurrentPage:', pageIndex)
  }
  close()
}
</script>
<route lang="yaml">
meta:
  requiresAuth: true
</route>

<template>
  <!-- top 定位 向上滚动 -->
  <div id="top"></div>
  <div ref="el" class="relative top-[5rem]">
    <div v-if="state.token" class="flex justify-center">
      <ul class="flex flex-col gap-10 justify-center">
        <li v-for="book in myPosts" :key="book._id">
          <BookCard
            :title="book.title"
            :author="book.author"
            :description="book.content"
            :btn-name="'删除'"
            :img-url="book.imageUrl"
            :is-fav="book.isFav"
            @click-btn="handleDelete(book)"
            @click-star="handleUpdate(book)"
            @click-image="handleDetails(book)"
            class="book-card hover:scale-105 duration-200 drop-shadow-2xl shadow-2xl bg-blend-color-burn"
          />
        </li>
        <div v-if="myPosts.length !== 0">
          <Pagination @PagePre="handlePagePre" @PageNext="handlePageNext" />
        </div>
      </ul>

      <div ref="target" class="flex justify-center bottom-6 fixed">
        <CreateBookForm @created="handleGetBooks" />
      </div>
    </div>
    <div v-else>
      <p>请登录</p>
    </div>
  </div>
  <div
    class="fixed bottom-5 right-5 hover:text-blue-700 cursor-pointer click"
    @click="handleClickToTop"
  >
    <i-bi:arrow-up-circle-fill style="font-size: 2em" />
  </div>
  <!-- <div class="container-type-size w-80 h-80 overflow-auto resize">
    <div class="bg-yellow-100 h-full w-full border-4 border-gray-100 cq-w-22:bg-blue-200 cq-h-[111px]:border-red-400 flex justify-end items-end">
      <div class="inline-flex items-end">
        <div class="pb-12">Resize the container</div>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="48" height="48" fill="white" fill-opacity="0.01"/><path d="M37 19V37H19" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M11.5441 11.5442L36.9999 37" stroke="#333" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
    </div>
  </div> -->
  <!-- <div class="test">test</div> -->
</template>

<style scoped>
@media (width < 480px) {
  .test {
    /* background-color: red; */
    @apply bg-red-500;
  }
}

@media (480px < width < 768px) {
  .test {
    background-color: rgb(68, 50, 50);
  }
}

@media (width > 768px) {
  .test {
    background-color: rgb(104, 98, 226);
  }
}
</style>
