import { defineStore } from 'pinia'
import { useState } from './useState'

const replyBaseUrl = import.meta.env.VITE_REPLY_URL

const state = $(useState())
const { useGets, usePost, useDelete } = $(useFetch(replyBaseUrl, state.token))

export const useReply = defineStore('reply', () => {
  const replies = $ref([])

  const getReplies = async (commentId) => {
    const { isFetching, error, data } = $(
      await useGets(commentId + '/replies').json()
    )
    if (!error) {
      replies = data.replies
    } else {
      console.log(error)
    }
  }
  const addReply = async (content, commentId) => {
    const newReply = {
      creator: state.name,
      creatorId: state.userId,
      content: content,
      time: new Date(),
      commentId: commentId,
    }

    const { error } = await usePost(commentId).post(newReply)
  }

  const deleteReply = async (replyId) => {
    const { error } = $(await useDelete(replyId).delete())
    if (!error) {
      replies = replies.filter((reply) => reply._id !== replyId)
    } else {
      console.log(error)
    }
  }

  watchEffect(() => {
    console.log('replies: ', replies)
  })

  return $$({
    replies,
    getReplies,
    addReply,
    deleteReply,
  })
})
