export const useFav = defineStore('favs', () => {
  // const { deletePost, UpdatePost,posts } = $(usePost())

  const favs: Post[] = $ref([])

  const gets = async (page = 1) => {
    console.log('page: ', page)
    const { error, data } = $(await useFetchFav(`fav/${page}`).json())
    // const { data } = $(await useGets(`/posts/${page}`).json())
    if (data.favs.length !== 0) {
      assign(favs, data.favs)
    } else {
      throw new Error('没有更多的数据了!')
    }
  }

  const addFav = async (_post: Post) => {
    const { posts } = $(usePost())
    const {error}=$(await useFetchFav(`fav/${_post._id}`).post().json())
    if (!error) {
      favs.push(_post)
    } else {
      throw new Error(`${error}`);
    }
    const newPost = posts.map((post:Post)=>{
      if (post._id === _post._id) {
        post.isFav = true
      }
      return post
    })
    assign(posts,newPost)
  }
  const deleteFav = async (_post: Post) => {
    const { posts } = $(usePost())
    const {error} = $(await useFetchFav(`fav/${_post._id}`).delete().json())
    if (!error) {
      remove(favs, (fav) => {
        return fav._id === _post._id
      })
      const newPosts = posts.map((post:Post)=>{
        if (post._id === _post._id) {
          post.isFav = false
        }
        return post
      })
      assign(posts,newPosts)
    } else {
      throw new Error(`${error}`);
    }
  }

  const clearFav = () => {
    remove(favs, (fav) => true)
  }

  watchEffect(()=>{
    console.log('favs: ',favs)
  })
  return $$({
    gets,
    favs,
    addFav,
    deleteFav,
    clearFav
  })
})
