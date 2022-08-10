import { ComputedVariable } from "vue/macros"

export const useMyPost = defineStore('myPost', () => {
  const baseUrl = import.meta.env.VITE_POST_URL
  const state = $(useSession())
  const { posts } = usePost()

  
  const myPosts: Post[] = $ref([])
  // let myPosts = $computed(()=>{
  //       return posts.map((_post)=>{
  //         _post.creator === state.userId
  //       })
  //   })
    // watchEffect(()=>{
    //   const _myPost = posts.map((_post)=>{
    //     _post.creator === state.userId
    //   })
    //   assign(myPosts,_myPost)
    //   console.log('myPosts',myPosts)
    // })

  // 默认得到第一页的数据,一页的数据为3
  const getMyPosts = async (page = 1) => {
    const { useGets } = $(useFetch(baseUrl, state.token))

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
  const addMyPostFav = async (_post: Post) => {
    const newPost = myPosts.map((post:Post)=>{
      if (post._id === _post._id) {
        post.isFav = true
      }
      return post
    })
    assign(myPosts,newPost)
  }
  const deleteMyPostFav = async (_post: Post) => {
      const newPosts = myPosts.map((post:Post)=>{
        if (post._id === _post._id) {
          post.isFav = false
        }
        return post
      })
      assign(myPosts,newPosts)
  }
  const deleteMyPost = async (post: Post) => {
    const { deletePost } = $(usePost())
    try {
      await deletePost(post._id)
      remove(myPosts, (_post) => _post._id === post._id)
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  const clearMyPosts = () => {
    remove(myPosts, (post) => {
      return true
    })
    console.log('clearPosts: ',myPosts)
  }

  return $$({
    getMyPosts,
    myPosts,
    deleteMyPostFav,
    addMyPostFav,
    deleteMyPost
  })
})
