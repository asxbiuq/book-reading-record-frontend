<template>
  <!-- top 定位 向上滚动 -->
  <div id="top"></div>
  <div ref="el" class="relative top-[5rem]">
    <div v-if="state.token" class="flex justify-center">
      <ul class="flex flex-col gap-10 justify-center">
        <li v-for="book in posts" :key="book._id">
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
            class="book-card hover:scale-105 duration-200"
          />
        </li>
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
    @click="handleToTop"
  >
    <i-bi:arrow-up-circle-fill style="font-size: 2em" />
  </div>
  <!-- <Loading/> -->
</template>

<script lang="ts" setup>
interface Post {
  title: string
  imageUrl: string
  content: string
  creator: string
  author: string
  isFav: boolean
  time: string
  avatar: string
  comments: any
  _id: string
}
interface Book extends Post {}
// data
// const baseUrl = import.meta.env.VITE_POST_URL
// let posts : Post[]   = reactive([])
const target = ref(null)


// composables
const state = useLocalState()
const { posts, getPosts, deletePost, UpdatePost } = usePost()
const router = useRouter()
// const { useGets, useDelete, usePut } = useFetch(baseUrl, state.value.token)
// const { isFetching, data: newData } = await useGets('/posts').json()
  watch(posts,()=>{
    console.log('posts: ',posts)
  })

// function
const handleGetBooks = async() => {
  await getPosts()
}

await handleGetBooks()
  // await handleGetBooks()
// watchEffect(()=>{
//   handleGetBooks()
// })

// posts = [...newData.value.posts]

// const getBooks = async () => {
//   const { data: newData } = await useGets('/posts').json()
//   posts = [...newData.value.posts]
// }

const handleDelete = async (book: Post) => {
  state.value.isPending = true

  deletePost(book._id)

  state.value.isPending = false
}

const handleUpdate = async (book: Post) => {
  state.value.isPending = true

  UpdatePost(book)

  state.value.isPending = false
}
const handleDetails = (_book: { _id: string }) => {
  router.push({
    name: 'Comments',
    params: {
      id: _book._id,
    },
  })
}
onMounted(() => {
  hideElementOnScroll(target.value)
})
const throttledFn = useThrottleFn(() => {
  // do something, it will be called at most 1 time per second
  console.log('Throttle')
}, 1000)
document.addEventListener('scroll', throttledFn)

const handleToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

if (!state.value.token) {
  router.push({ name: 'Login' })
}
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
}

.home ul {
  padding: 0;
}

.home li {
  list-style-type: none;
  background: #fff;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  display: flex;
}

.home li .details {
  margin-right: auto;
}

.home li h3 {
  margin: 0;
  margin-bottom: 4px;
}

.home li h3:hover {
  cursor: pointer;
  text-decoration: line-through;
}

.home li p {
  margin: 0;
}

.icon {
  color: #bbbbbb;
  cursor: pointer;
}

.icon.fav {
  color: #f83f5e;
}
</style>
