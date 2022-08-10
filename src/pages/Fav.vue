<script lang="ts" setup>
let pageIndex = 1

const { favs, gets, deleteFav } = useFav()
const router = useRouter()
const state = $(useSession())
const {  deletePost } = $(usePost())
// console.log(data)
gets()

const handleUnfav = async (post: Post) => {
  const { open, close } = useLoading()
  open()

  try {
    deleteFav(post)
  } catch (error: any) {
    console.log(error)
    const { open } = useAlert()
    open(error)
  }

  close()
}
const handleDelete = async (post: Post) => {
  const { open, close } = useLoading()
  open()
  state.isPending = true

  try {
    await deletePost(post._id)
  } catch (error: any) {
    console.log(error)
    const { open } = useAlert()
    open(error)
  }
  state.isPending = false
  close()
}
const handleDetails = (_post: { _id: string }) => {
  const state = $(useSession())

  state.postId = _post._id
  router.push({
    name: 'Comments',
    params: {
      id: _post._id,
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
watchEffect(()=>{
  console.log('favs: ',favs)
})
</script>

<template>
  <div class="flex flex-col justify-center items-center gap-7">
    <ul class="flex flex-col gap-10 justify-center">
      <li v-for="post in favs" :key="post._id">
        <PostCard
          :creatorId="post.creator"
          :title="post.title"
          :author="post.author"
          :description="post.content"
          :btn-name="'删除'"
          :img-url="post.imageUrl || 'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg'"
          :is-fav="post.isFav"
          @click-btn="handleDelete(post)"
          @click-star="handleUnfav(post)"
          @click-image="handleDetails(post)"
          class="post-card hover:scale-105 duration-200 drop-shadow-2xl shadow-2xl bg-blend-color-burn"
        />
      </li>
      <div v-if="favs.length !== 0">
        <Pagination @PagePre="handlePagePre" @PageNext="handlePageNext" />
      </div>
    </ul>
  </div>
</template>

<style scoped></style>
