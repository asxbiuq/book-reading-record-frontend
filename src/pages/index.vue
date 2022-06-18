<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="userId">
      <ul  class="flex gap-10">
        <li v-for="book in docs.posts" :key="book.id">
          <!-- <card
            :title="book.title"
            :description="book.author"
            :btnName="'删除'"
            @clickTitle=""
            @clickBtn=""
          /> -->
          <BookCell
            :title="book.title"
            :description="book.author"
            :btnName="'删除'"
            @clickBtn="handleDelete(book)"
          />
        </li>
      </ul>



      <div class="flex items-center justify-center">
        <CreateBookForm @created="getBooks" class="p-10" />
      </div>
    </div>
    <div v-else>
      请登录
    </div>
  </div>
  
</template>

<script setup>
undefined
const { deleteDoc, getDoc, updateDoc, isPending, error } = $(useDocument())
const { docs } = $(await getDoc())
const { userId } = $(useStore())
console.log('userId',userId)
const getBooks = async () => {
  const { docs: data } = $(await getDoc())
  docs = data
}


const handleDelete = async (book) => {
  await deleteDoc(book._id)
  const { docs: data } = $(await getDoc())
  docs = data
}

const handleUpdate = (book) => {
  // console.log(book)
  book.isFav = !book.isFav
  console.log(book)
  updateDoc(book._id, {
    title: book.title,
    author: book.author,
    isFav: book.isFav,
    userUid: userId
  })
}

if (error) {
  console.log(error)
}
</script>

<style>
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