<template>
  <!-- top 定位 向上滚动 -->
  <div id="top"></div>
  <div ref="el" class="relative top-[5rem]">
    <div v-if="state.userId" class="flex justify-center">
      <ul class="flex flex-col gap-10 justify-center">
        <li v-for="book in data.posts" :key="book._id">
          <BookCard
            :title="book.title"
            :author="book.author"
            :description="book.description"
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

      <div
        ref="target"
        class="flex justify-center bottom-6 fixed"
      >
        <CreateBookForm @created="getBooks" />
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

<script setup>
// data
const baseUrl = import.meta.env.VITE_POST_URL
const data = reactive({})
const target = ref(null)

// composables
const state = $(useState())
const router = useRouter()
const { useGets, useDelete, usePut } = $(
  useFetch(baseUrl, state.token)
)
const {
  isFetching,
  error: useFetchDocsAllError,
  data: newData,
} = $(await useGets('/posts/' + state.userId).json())

// function
data.posts = [...newData.posts]

const getBooks = async () => {
  const { data: newData } = $(
    await useGets('/posts/' + state.userId).json()
  )
  data.posts = [...newData.posts]
}

const handleDelete = async (book) => {
  state.isPending = true
  const { error } = $(
    await useDelete('/'+ book._id + '/' + state.userId).delete()
  )

  if (!error) {
    data.posts = data.posts.filter((post) => post._id != book._id)
  }
  state.isPending = false
}

const handleUpdate = async (book) => {
  state.isPending = true
  book.isFav = !book.isFav
  console.log(book)
  const { data: UpdatedData, error } = $(
    await usePut('/' + book._id  + '/' + state.userId)
      .put(book)
      .json()

  )

  if (!error) {
    data.posts.forEach((post) => {
      if (post._id === UpdatedData.post._id) {
        post = UpdatedData.post
      }
    })
  }
  state.isPending = false
}
const handleDetails = (_book) => {
  const { book } = useBook()
  book.id = _book._id
  router.push({ name: 'Comments' })
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

if (!state.userId) {
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
