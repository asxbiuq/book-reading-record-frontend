import dayjs from 'dayjs'

export const useComment = defineStore('comment', () => {
  const comments: Comment[] = $ref([])
  const commentBaseUrl = import.meta.env.VITE_COMMENT_URL
  const state = $(useLocalState())

  const getComments = async (postId: string) => {
    const { useGets } = $(useFetch(commentBaseUrl, state.token))
    const { isFetching, error, data } = $(
      await useGets(postId + '/comments').json()
    )

    if (!error) {
      const { getReplies } = useReply()
      data.comments.forEach((comment: Comment) => {
        comments.push(comment)
        getReplies(comment._id)
      })
      formatTime(comments)
    } else {
      throw `getComments failed, ${data.message}`
    }
  }

  const addComment = async (content: string, postId: string) => {
    const { usePost } = $(useFetch(commentBaseUrl, state.token))
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
      data.comment.time = dayjs().to(data.comment.time)
      // console.log(data.comment)
      comments.push(data.comment)
    } else {
      throw new Error(` ${data.message}`)
    }
  }

  const deleteComment = async (commentId: string) => {
    const { useDelete } = $(useFetch(commentBaseUrl, state.token))
    const { error, data } = $(await useDelete(commentId).delete().json())

    if (!error) {
      remove(comments, (comment: Comment) => comment._id == commentId)
      // comments = comments.filter((comment) => comment._id !== commentId)
    } else {
      throw new Error(` ${data.message}`)
    }
  }

  const clearComment = () => {
    remove(comments, (comment: Comment) => true)
  }

  watchEffect(() => {
    console.log('comments: ', comments)
  })

  // watch(
  //   comments,
  //   (state) => {
  //     // 每当它发生变化时，将整个状态持久化到本地存储
  //     localStorage.setItem('piniaState', JSON.stringify(state))
  //   },
  //   { deep: true }
  // )

  return $$({
    comments,
    addComment,
    deleteComment,
    getComments,
    clearComment,
  })
})
