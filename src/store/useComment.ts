import { RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { Ref } from 'vue'

interface Comment {
  _id?:string,
  creatorId: string,
  creator: string,
  content: string,
  time: Date,
  postId: string,
  replies: Array<any>,
}

const commentBaseUrl = import.meta.env.VITE_COMMENT_URL
const state = useLocalState()
const { useGets, usePost, useDelete } = useFetch(commentBaseUrl, state.value.token)

export const useComment = defineStore('comment', () => {
  const comments :Ref<Comment[]> = ref([])

  const getComments = async (postId :string) => {
    const { isFetching, error, data } = await useGets(postId + '/comments').json()
    
    if (!error) {
      comments.value = data.comments
    } else {
      console.log(error)
    }
  }

  const addComment = async (content :string, postId :string) => {
    const newComment = {
      creatorId: state.value.userId,
      creator: state.value.name,
      content: content,
      time: new Date(),
      postId: postId,
      replies: [],
    }
    const { error } = await usePost(postId).post(newComment)

    if (!error) {
      comments.value.push(newComment)
    } else {
      console.log(error)
    }
  }

  const deleteComment = async (commentId:string) => {
    const { error } = await useDelete(commentId).delete()

    if (!error) {
      comments.value = comments.value.filter((comment) => comment._id !== commentId)
    } else {
      console.log(error)
    }
  }

  watchEffect(() => {
    console.log('comments: ', comments.value)
  })

  return {
    comments,
    addComment,
    deleteComment,
    getComments,
  }
})
