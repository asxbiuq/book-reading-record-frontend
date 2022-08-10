export const usePost = defineStore('post', () => {
  const baseUrl = import.meta.env.VITE_POST_URL
  const state = $(useSession())

  
  const posts: Post[] = $ref([])
  // 默认得到第一页的数据,一页的数据为3
  const getPosts = async (page = 1) => {
    const { useGets } = $(useFetch(baseUrl, state.token))
    clearPosts()
    console.log('page: ', page)
    const { data } = $(await useGets(`/posts/${page}`).json())
    if (data.posts.length) {
      clearPosts()
      data.posts.forEach((post: Post) => {
        posts.push(post)
      })
      console.log('posts: ', posts)
    } else {
      throw new Error('没有更多的数据了!')
    }
  }

  const addPost = async(title:string,content:string,file:any) =>{
    const {getMyPosts} = $(useMyPost())
    const state = $(useSession())
    const { usePost } = useFetch(baseUrl, state.token)

    const formData = new FormData()
    formData.append('title', title)
    formData.append('author', state.name)
    formData.append('content', content)
    formData.append('isFav', 'false')
    formData.append('creator', state.userId)
    if (file) {
      formData.append('image', file)
    }
    formData.append('time', new Date().toString())
    console.log('formData: ',formData)
    const { error, data } = $(await usePost('/').post(formData).json())
    await getMyPosts()
    await getPosts()
  }

  const deletePost = async (postId: string) => {
    const { useDelete } = $(useFetch(baseUrl, state.token))

    const { error } = $(await useDelete(postId).delete().json())

    if (!error) {
      remove(posts, (post) => post._id === postId)
    } else {
      throw new Error(error.message);
    }
  }

  const UpdatePost = async (post: Post) => {
    const { usePut } = $(useFetch(baseUrl, state.token))

    post.isFav = !post.isFav
    const { data, error } = $(await usePut(post._id).put(post).json())

    if (!error) {
      posts.forEach((post) => {
        if (post._id === data.post._id) {
          post = data.post
        }
      })
    } else {
      throw new Error(error.message);
    }
  }

  const clearPosts = () => {
    remove(posts, (post) => true)
    console.log('clearPosts: ',posts)
  }

  watch($$(posts), () => {
    console.log('posts: ', posts)
  })


  return $$({
    addPost,
    posts,
    deletePost,
    getPosts,
    UpdatePost,
    clearPosts,
  })
})
