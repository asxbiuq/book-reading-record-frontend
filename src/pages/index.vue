<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="userId">
      <ul class="flex gap-10">
        <li v-for="book in docs.posts" :key="book.id">
          <BookCell :title="book.title" :author="book.author" :description="book.description" :btnName="'删除'"
            @clickBtn="handleDelete(book)" />
        </li>
      </ul>

      <div class="flex items-center justify-center">
        <CreateBookForm @created="getBooks" class="p-10" />
      </div>
    </div>
    <div v-else>
      <p>请登录</p>
    </div>
  </div>

</template>

<script setup>
const { deleteDoc, getDoc, getAllDocs, updateDoc, isPending, error } = $(useDocument('http://localhost:8080/feed/post/'))
const { userId } = $(useStore())
const router = useRouter()

const { docs } = $(await getAllDocs('http://localhost:8080/feed/posts/'))


const getBooks = async () => {
  const { docs: dadas } = $(await getAllDocs('http://localhost:8080/feed/posts/'))
  docs = dadas
}

const handleDelete = async (book) => {
  await deleteDoc(book._id)
  if (!error) {
    console.log(docs.posts)
    docs.posts = docs.posts.filter((post) => {
      post._id = book._id
    })
  }
}

const handleUpdate = (book) => {
  book.isFav = !book.isFav
  console.log(book)
  updateDoc(book._id, {
    title: book.title,
    author: book.author,
    isFav: book.isFav,
    userUid: userId
  })
}

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