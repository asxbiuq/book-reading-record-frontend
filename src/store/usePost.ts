import { chunk, pull, pullAll, remove } from 'lodash-es'
import { defineStore } from 'pinia'
import { Ref } from 'vue'

interface Post {
  title: string,
  imageUrl: string,
  content: string,
  creator: string,
  author: string,
  isFav: boolean,
  time: string,
  avatar: string,
  comments: any,
  _id: string,
}



export const usePost = defineStore('post',  () => {
  const baseUrl = import.meta.env.VITE_POST_URL
  const state = useLocalState()
  const { useGets, useDelete, usePut } = useFetch(baseUrl, state.value.token)

  const posts :Ref<Post[]> = ref([])
  
  const getPosts = async () => {
    const { data } = await useGets('/posts').json()
    if (data.value.posts) {
      data.value.posts.forEach((post:Post)=>{
        posts.value.push(post)
      })
    }
  }


  const deletePost = async (postId: string) => {
    const { error } = await useDelete(postId).delete()
  
    if (!error.value && posts.value) {
      remove(posts.value,(post) => post._id == postId)
    }
  }

  const UpdatePost = async (post: Post) => {

    post.isFav = !post.isFav
    const { data, error }  = await usePut( post._id)
      .put(post)
      .json()
  
    if (!error.value && posts.value) {
      posts.value.forEach((post) => {
        if (post._id === data.value.post._id) {
          post = data.value.post
        }
      })
    }
  }

  watch(posts,()=>{
    console.log('posts: ',posts.value)
  })

  return {
    posts,
    deletePost,
    getPosts,
    UpdatePost
  }
})
