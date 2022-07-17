

export const useComment = defineStore('comment', () => {
  const commentBaseUrl = import.meta.env.VITE_COMMENT_URL
  const state = $(useLocalState())
  const { useGets, usePost, useDelete } = $(
    useFetch(commentBaseUrl, state.token)
  )

  const comments: Comment[] = $ref([])

  const getComments = async (postId: string) => {
    const { isFetching, error, data } = $(
      await useGets(postId + '/comments').json()
    )

    if (!error) {
      const {getReplies} = useReply()
      data.comments.forEach((comment: Comment) => {
        comments.push(comment)
        getReplies(comment._id)
      })
    } else {
      throw(`getComments failed, ${data.message}`)
    }
  }

  const addComment = async (content: string, postId: string) => {
    const newComment = {
      creatorId: state.userId,
      creator: state.name,
      content: content,
      time: new Date(),
      postId: postId,
      replies: [],
    }
    const { error, data } = $(await usePost(postId).post(newComment).json())

    if (!error) {
      console.log(data.comment)
      comments.push(data.comment)
    } else {
      throw new Error(` ${data.message}`);
    }
  }

  const deleteComment = async (commentId: string) => {
    const { error,data } = $(await useDelete(commentId).delete().json())

    if (!error) {
      remove(comments, (comment: Comment) => comment._id == commentId)
      // comments = comments.filter((comment) => comment._id !== commentId)
    } else {
      throw new Error(` ${data.message}`);
    }
  }

  const clearComment = () => {
    remove(comments, (comment: Comment) => true)
  }

  watchEffect(() => {
    console.log('comments: ', comments)
  })

  return $$({
    comments,
    addComment,
    deleteComment,
    getComments,
    clearComment,
  })
})
