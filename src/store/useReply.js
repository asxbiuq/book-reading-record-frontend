import { defineStore } from 'pinia'
import { useState } from './useState'

const replyBaseUrl = import.meta.env.VITE_REPLY_URL

const state = $(useState())
const { useGets, usePost, useDelete } = $(useFetch(replyBaseUrl, state.token))
const { user } = $(useUser())

export const useReply = defineStore('reply', () => {
  const replies = $ref({})

  const getReplies = async (commentId) => {
    const { isFetching, error, data } = $(
      await useGets(commentId + '/replies').json()
    )

    replies = data.replies
  }
  const addReply = async (content, commentId) => {
    const newReply = {
      creator: state.name,
      creatorId: state.userId,
      content: content,
      time: new Date(),
      commentId: commentId,
    }

    await usePost(commentId).post(newReply)
  }

  const deleteReply = async (replyId) => {
    const { error } = $(await useDelete(replyId).delete())
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
