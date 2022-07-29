export const useMyPost = defineStore('myPost', () => {
  const baseUrl = import.meta.env.VITE_POST_URL
  const state = $(useLocalState())
  const { clearComment } = useComment()
  
  const myPosts: Post[] = $ref([])
  // 默认得到第一页的数据,一页的数据为3
  const getMyPosts = async (page = 1) => {
    const { useGets, useDelete, usePut } = $(useFetch(baseUrl, state.token))

    const { data } = $(await useGets(`/myposts/${page}`).json())
    if (data.posts.length) {
      clearMyPosts()
      data.posts.forEach((post: Post) => {
        myPosts.push(post)
      })
      console.log('myPosts: ', myPosts)
    } else {
      throw new Error('没有更多的数据了!')
    }
  }
  const addMyPostFav = async (book: Post) => {
    const newPost = myPosts.map((post:Post)=>{
      if (post._id == book._id) {
        post.isFav = true
      }
      return post
    })
    assign(myPosts,newPost)
  }
  const deleteMyPostFav = async (book: Post) => {
      const newPosts = myPosts.map((post:Post)=>{
        if (post._id === book._id) {
          post.isFav = false
        }
        return post
      })
      assign(myPosts,newPosts)
  }
  const clearMyPosts = () => {
    remove(myPosts, (post) => {
      return true
    })
    console.log('clearPosts: ',myPosts)
  }

  return $$({
    myPosts,
    getMyPosts,
    deleteMyPostFav,
    addMyPostFav
  })
})
