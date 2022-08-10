import dayjs from 'dayjs'
import { nanoid } from 'nanoid'

export const useReply = defineStore('reply', () => {
  const replyBaseUrl = import.meta.env.VITE_REPLY_URL
  const state = $(useSession())

  const replies: Reply[] = $ref([])

  const getReplies = async (commentId: string) => {
    const { useGets } = $(useFetch(replyBaseUrl, state.token))
    const { isFetching, error, data } = $(
      await useGets(commentId + '/replies').json()
    )
    const { comments } = useComment()
    // let replies:Reply[] = []
    if (!error && data.replies) {
      console.log(`get data : ${data}`)
      comments.forEach((comment: Comment) => {
        if (comment._id === commentId) {
          formatTime(data.replies)
          comment.replies = data.replies
        }
      })
    } else {
      throw new Error(`getReplies failed, error: ${error}`)
    }
  }

  const addReply = async (content: string, commentId: string) => {
    const { usePost } = $(useFetch(replyBaseUrl, state.token))
    const newReply = {
      creator: state.name,
      creatorId: state.userId,
      content: content,
      time: new Date(),
      commentId: commentId,
    }

    const { error, data } = $(await usePost(commentId).post(newReply).json())
    if (!error) {
      const { comments } = $(useComment())
      comments.forEach((comment) => {
        if (comment._id === commentId) {
          data.reply.time = dayjs().to(data.reply.time)
          comment.replies.push(data.reply)
        }
      })
    }
  }

  const deleteReply = async (reply: Reply) => {
    const { useDelete } = $(useFetch(replyBaseUrl, state.token))
    const { error, data } = $(await useDelete(reply._id).delete().json())
    if (!error) {
      const { comments } = $(useComment())
      comments.forEach((comment) => {
        if (comment._id === reply.commentId) {
          remove(comment.replies, (item: Reply) => item._id === reply._id)
        }
      })
    } else {
      throw new Error(data.message)
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
