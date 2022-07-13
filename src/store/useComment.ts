import { RemovableRef } from '@vueuse/core'
import { defineStore } from 'pinia'
import { Ref } from 'vue'
import { nanoid } from 'nanoid'
import { assign, remove } from 'lodash-es'
interface Comment {
  _id:string,
  creatorId: string,
  creator: string,
  content: string,
  time: Date,
  postId: string,
  replies: Array<any>,
}
interface AddComment {
  creatorId: string,
  creator: string,
  content: string,
  time: Date,
  postId: string,
  replies: Array<any>,
}


export const useComment = defineStore('comment', () => {
  const commentBaseUrl = import.meta.env.VITE_COMMENT_URL
  const state = $(useLocalState())
  const { useGets, usePost, useDelete } = $(useFetch(commentBaseUrl, state.token))


  const comments :Comment[] = $ref([])

  const getComments = async (postId :string) => {
    const { isFetching, error, data } = $(await useGets(postId + '/comments').json())
    
    if (!error) {

      data.comments.forEach((comment:Comment)=>{
        comments.push(comment)
      })

    } else {
      console.log(error)
    }
  }

  const addComment = async (content :string, postId :string) => {
    const newComment = {
      creatorId: state.userId,
      creator: state.name,
      content: content,
      time: new Date(),
      postId: postId,
      replies: [],
    }
    const { error,data } = $(await usePost(postId).post(newComment).json())

    if (!error && data.comment) {
      console.log(data)
      comments.push(data.comment)
    } else {
      console.log(error)
    }
  }

  const deleteComment = async (commentId:string) => {
    const { error } = $(await useDelete(commentId).delete())

    if (!error) {
      remove(comments,(comment:Comment) => comment._id !== commentId)
      // comments = comments.filter((comment) => comment._id !== commentId)
    } else {
      console.log(error)
    }
  }

  const clearComment = () => {
    remove(comments,(comment:Comment) => true)
  }

  watchEffect(() => {
    console.log('comments: ', comments)
  })

  return $$({
    comments,
    addComment,
    deleteComment,
    getComments,
    clearComment
  })
})
