<template>
  <div ref="el" class="relative top-[5rem]">
    <div v-if="userId">
      <ul class="flex gap-10 justify-center">
        <li v-for="book in data.posts" :key="book._id">
          <BookCard
            :title="book.title" 
            :author="book.author" 
            :description="book.description" 
            :btnName="'删除'"
            :imgUrl = "book.imageUrl"
            :isFav="book.isFav"
            @clickBtn="handleDelete(book)" 
            @clickStar="handleUpdate(book)" 
            @clickImage="handleDetails"
          />

        </li>
      </ul>

      <div class="container mx-auto flex justify-center bottom-6 fixed" ref="target">
        <CreateBookForm @created="getBooks" />
      </div>
    </div>
    <div v-else>
      <p>请登录</p>
    </div>
  </div>

</template>

<script setup>
const baseUrl = import.meta.env.VITE_FEED_URL
const data = reactive({})
const target = ref(null)
const { userId, token } = $(useStore())
const router = useRouter()
const { useFetch_GetDocsAll, useFetch_DeleteDoc, useFetch_UpdateDoc } = $(useFetchDoc(baseUrl,token))

const { isFetching, error: useFetchDocsAllError, data : newData } = $(
  await useFetch_GetDocsAll(
      '/posts/' + userId
    )
    .json())

data.posts = [...newData.posts]

const getBooks = async () => {
  const { data: newData } = $(
    await useFetch_GetDocsAll(
        '/posts/' + userId
      )
      .json())
  data.posts = [...newData.posts]
}

const handleDelete = async (book) => {
  const { error: useFetchDeleteDocError } = $(
    await useFetch_DeleteDoc(
        '/post/' + book._id
      )
      .delete())

  if (!useFetchDeleteDocError) {
    data.posts = data.posts.filter((post) =>
      post._id != book._id
    )
  }
}

const handleUpdate = async (book) => {
  book.isFav = !book.isFav
  console.log(book.imageUrl.toString())
  const { data: UpdatedData, error: useFetchUpdateDocError } = $(
    await useFetch_UpdateDoc(
        '/post/' + book._id
      )
      .put({
          title: book.title,
          author: book.author,
          isFav: book.isFav,
          userUid: book.userId,
          imageUrl: book.imageUrl
      })
      .json())

  if (!useFetchUpdateDocError) {
    data.posts.forEach(post => {
      if (post._id === UpdatedData.post._id) {
        post = UpdatedData.post
      }
    })
  }
}
const handleDetails = () => {
  console.log('handleDetails')
}
onMounted(() => {
  hideElementOnScroll(target.value)
})
if (!userId) {
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