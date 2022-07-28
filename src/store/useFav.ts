export const useFav = defineStore('favs', () => {
  // const { deletePost, UpdatePost,posts } = $(usePost())

  const favs: Post[] = $ref([])
  const gets = async (page = 1) => {
    console.log('page: ', page)
    const { error, data } = $(await useFetchFav(`fav/${page}`).json())
    // const { data } = $(await useGets(`/posts/${page}`).json())
    if (data.favs) {
      assign(favs, data.favs)
    } else {
      throw new Error('没有更多的数据了!')
    }
  }
  const addFav = async (book: Post) => {
    const { deletePost, UpdatePost,posts } = $(usePost())
    const {data,error}=$(await useFetchFav(`fav/${book._id}`).post().json())
    if (!error) {
      favs.push(data.fav)
    }
    const newPost = posts.map((post:Post)=>{
      if (post._id == book._id) {
        post.isFav = true
      }
      return post
    })
    assign(posts,newPost)
  }
  const deleteFav = async (book: Post) => {
    const { deletePost, UpdatePost,posts } = $(usePost())
    const {data,error} = $(await useFetchFav(`fav/${book._id}`).delete())
    if (!error) {
      remove(favs, (fav) => {
        return fav._id === book._id
      })
      const newPosts = posts.map((post:Post)=>{
        if (post._id === book._id) {
          post.isFav = false
        }
        return post
      })
      assign(posts,newPosts)
      // posts.forEach((post:Post)=>{
      //   if (post._id === book._id) {
      //     post.isFav = false
      //   }

      // })
    }
  }

  const clearFav = () => {
    remove(favs, (fav) => true)
  }
  return $$({
    gets,
    favs,
    addFav,
    deleteFav,
    clearFav
  })
})
