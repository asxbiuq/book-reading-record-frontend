export const useFav = defineStore('favs', () => {
  const { deletePost, UpdatePost } = $(usePost())

  const favs: Post[] = $ref([])
  const gets = async (page = 1) => {
    console.log('page: ', page)
    const { error, data } = $(await getFav(`fav/${page}`).json())
    // const { data } = $(await useGets(`/posts/${page}`).json())
    if (data.posts.length) {
      assign(favs, data.posts)
    } else {
      throw new Error('没有更多的数据了!')
    }
  }
  // const gets =async() => {
  //   const { error, data } = $(await getFav('fav').json())
  //   assign(favs,data.posts)
  // }

  const unfav = async (book: Post) => {
    await UpdatePost(book)
    remove(favs, (fav) => {
      return fav._id === book._id
    })
  }
  return $$({
    gets,
    favs,
    unfav,
  })
})
