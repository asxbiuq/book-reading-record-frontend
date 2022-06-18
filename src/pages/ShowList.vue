<template>
    <div v-if="userId">
      <ul class="bg-red">
        <li v-for="book in docs.posts" :key="book.id" class="bg-orange-400 w-[50%] flex justify-between">
          <div class="details">
            <h3 @click="handleDelete(book)">{{ book.title }}</h3>
            <p>By {{ book.author }}</p>
          </div>
          <div :class="{ icon: true, fav: book.isFav }" @click="handleUpdate(book)">
            <span class="material-icons">favorite</span>
          </div>
        </li>
      </ul>
      <div  class="flex items-center">

        <CreateBookForm @created="getBooks" class="p-10"/>
      </div>
    </div>
    <div v-else>
      null
    </div>
</template>

<script setup>
const { deleteDoc, getDoc, updateDoc ,isPending, error } = $(useDocument())
const { docs } = $(await getDoc())
const { userId } = $(useStore())
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