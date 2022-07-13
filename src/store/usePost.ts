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
  const state = $(useLocalState())
  const { useGets, useDelete, usePut } = $(useFetch(baseUrl, state.token))
  const { clearComment} = useComment()

  const posts :Post[] = $ref([])
  
  const getPosts = async () => {
    const { data } = $(await useGets('/posts').json())
    if (data.posts) {
      data.posts.forEach((post:Post) => {
        posts.push(post)
      })
    }
  }


  const deletePost = async (postId: string) => {
    const { error } = $(await useDelete(postId).delete())
  
    if (!error && posts) {
      remove(posts,(post) => post._id == postId)
    }
  }

  const UpdatePost = async (post: Post) => {

    post.isFav = !post.isFav
    const { data, error }  = $(await usePut(post._id).put(post).json())
  
    if (!error && posts) {
      posts.forEach((post) => {
        if (post._id === data.post._id) {
          post = data.post
        }
      })
    }
  }

  const clearPosts = () => {
    remove(posts,(post) => true)
  }

  watch($$(posts),()=>{
    console.log('posts: ',posts)
  })

  return $$({
    posts,
    deletePost,
    getPosts,
    UpdatePost,
    clearPosts
  })
})
