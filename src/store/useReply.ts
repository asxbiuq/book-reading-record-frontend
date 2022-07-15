interface Reply {
  _id: string
  creator: string
  creatorId: string
  content: string
  time: Date
  commentId: string
}

export const useReply = defineStore('reply', () => {
  const replyBaseUrl = import.meta.env.VITE_REPLY_URL
  const state = $(useLocalState())
  const { useGets, usePost, useDelete } = $(useFetch(replyBaseUrl, state.token))

  const replies: Reply[] = $ref([])

  const getReplies = async (commentId: string) => {
    const { isFetching, error, data } = $(
      await useGets(commentId + '/replies').json()
    )

    if (!error && data.replies) {
      data.replies.forEach((reply: Reply) => {
        replies.push(reply)
      })
    } else {
      console.log(error)
    }
  }
  const addReply = async (content: string, commentId: string) => {
    const newReply = {
      creator: state.name,
      creatorId: state.userId,
      content: content,
      time: new Date(),
      commentId: commentId,
    }

    const { error } = $(await usePost(commentId).post(newReply))
  }

  const deleteReply = async (replyId: string) => {
    const { error } = $(await useDelete(replyId).delete())
    if (!error && replies) {
      remove(replies, (reply: Reply) => reply._id == replyId)
    } else {
      console.log(error)
    }
  }

  const clearReplies = () => {
    remove(replies, (reply: Reply) => true)
  }

  watchEffect(() => {
    console.log('replies: ', replies)
  })

  return $$({
    replies,
    getReplies,
    addReply,
    deleteReply,
    clearReplies,
  })
})
