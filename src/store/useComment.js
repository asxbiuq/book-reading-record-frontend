import { defineStore } from 'pinia'

const commentBaseUrl = import.meta.env.VITE_COMMENT_URL

const state = $(useState())
const { useGets, usePost, useDelete } = $(useFetch(commentBaseUrl, state.token))

export const useComment = defineStore('comment', () => {
  const comments = $ref([])

  const getComments = async (postId) => {
    const { isFetching, error, data } = $(
      await useGets(postId + '/comments').json()
    )
    if (!error) {
      comments = data.comments
    } else {
      console.log(error)
    }
  }

  const addComment = async (content, postId) => {
    const newComment = {
      creatorId: state.userId,
      creator: state.name,
      content: content,
      time: new Date(),
      postId: postId,
      replies: [],
    }
    const { error } = $(await usePost(postId).post(newComment))

    if (!error) {
      comments.push(newComment)
    } else {
      console.log(error)
    }
  }

  const deleteComment = async (commentId) => {
    const { error } = $(await useDelete(commentId).delete())

    if (!error) {
      comments = comments.filter((comment) => comment._id !== commentId)
    } else {
      console.log(error)
    }
  }

  watchEffect(() => {
    console.log('comments: ', comments)
  })

  return $$({
    comments,
    addComment,
    deleteComment,
    getComments,
  })
})
