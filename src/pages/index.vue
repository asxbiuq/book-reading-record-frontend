<template>
  <!-- top 定位 向上滚动 -->
  <div id="top"></div>
  <div ref="el" class="relative top-[5rem]">
    <div v-if="userId">
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
            @click-image="handleDetails"
            class="card"
          />
        </li>

      </ul>

      <div
        ref="target"
        class="container mx-auto flex justify-center bottom-6 fixed"
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
</template>

<script setup>
const baseUrl = import.meta.env.VITE_FEED_URL;
const data = reactive({});
const target = ref(null);
const { userId, token } = $(useStore());
const router = useRouter();
const { useFetch_GetDocsAll, useFetch_DeleteDoc, useFetch_UpdateDoc } = $(
  useFetchDoc(baseUrl, token)
);

const {
  isFetching,
  error: useFetchDocsAllError,
  data: newData,
} = $(await useFetch_GetDocsAll("/posts/" + userId).json());

data.posts = [...newData.posts];

const getBooks = async () => {
  const { data: newData } = $(
    await useFetch_GetDocsAll("/posts/" + userId).json()
  );
  data.posts = [...newData.posts];
};

const handleDelete = async (book) => {
  const { error: useFetchDeleteDocError } = $(
    await useFetch_DeleteDoc("/post/" + book._id).delete()
  );

  if (!useFetchDeleteDocError) {
    data.posts = data.posts.filter((post) => post._id != book._id);
  }
};

const handleUpdate = async (book) => {
  book.isFav = !book.isFav;
  console.log(book.imageUrl.toString());
  const { data: UpdatedData, error: useFetchUpdateDocError } = $(
    await useFetch_UpdateDoc("/post/" + book._id)
      .put({
        title: book.title,
        author: book.author,
        isFav: book.isFav,
        userUid: book.userId,
        imageUrl: book.imageUrl,
      })
      .json()
  );

  if (!useFetchUpdateDocError) {
    data.posts.forEach((post) => {
      if (post._id === UpdatedData.post._id) {
        post = UpdatedData.post;
      }
    });
  }
};
const handleDetails = () => {
  console.log("handleDetails");
};
onMounted(() => {
  hideElementOnScroll(target.value);
});
const throttledFn = useThrottleFn(() => {
  // do something, it will be called at most 1 time per second
  console.log("Throttle");
}, 1000);
document.addEventListener("scroll", throttledFn);

const handleToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  // scrollToTop()
};
// var oDiv = document.getElementById('top');
// oDiv.onclick = function() {
//     window.scrollTo({
//         top:0,
//         behavior:"smooth"
//     })
// }

if (!userId) {
  router.push({ name: "Login" });
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
