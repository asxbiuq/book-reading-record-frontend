export const usePost = defineStore('post', () => {
  const baseUrl = import.meta.env.VITE_POST_URL
  const state = $(useLocalState())
  const { clearComment } = useComment()
  
  const posts: Post[] = $ref([])
  // 默认得到第一页的数据,一页的数据为3
  const getPosts = async (page = 1) => {
    const { useGets, useDelete, usePut } = $(useFetch(baseUrl, state.token))
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

  const deletePost = async (postId: string) => {
    const { useGets, useDelete, usePut } = $(useFetch(baseUrl, state.token))

    const { error } = $(await useDelete(postId).delete())

    if (!error && posts) {
      remove(posts, (post) => post._id == postId)
    }
  }

  const UpdatePost = async (post: Post) => {
    const { useGets, useDelete, usePut } = $(useFetch(baseUrl, state.token))

    post.isFav = !post.isFav
    const { data, error } = $(await usePut(post._id).put(post).json())

    if (!error && posts) {
      posts.forEach((post) => {
        if (post._id === data.post._id) {
          post = data.post
        }
      })
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
    posts,
    deletePost,
    getPosts,
    UpdatePost,
    clearPosts,
  })
})
