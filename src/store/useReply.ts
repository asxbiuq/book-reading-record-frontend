import { nanoid } from "nanoid"


export const useReply = defineStore('reply', () => {
  const replyBaseUrl = import.meta.env.VITE_REPLY_URL
  const state = $(useLocalState())
  const { useGets, usePost, useDelete } = $(useFetch(replyBaseUrl, state.token))

  const replies: Reply[] = $ref([])

  const getReplies = async (commentId: string) => {
    const { isFetching, error, data } = $(
      await useGets(commentId + '/replies').json()
    )
    const {comments} = useComment()
    // let replies:Reply[] = []
    if (!error && data.replies) {
      console.log(`get data : ${data}`)
      comments.forEach((comment:Comment)=>{
        if (comment._id === commentId) {
          formatTime(data.replies)
          comment.replies = data.replies
        }
      })
    } else {
      throw new Error(`getReplies failed, error: ${error}`);
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

    const { error,data } = $(await usePost(commentId).post(newReply).json())
    if (!error) {
      const {comments} = $(useComment())
      comments.forEach((comment)=>{
        if (comment._id === commentId) {
          comment.replies.push(data.reply)
        }
      })
    }
  }

  const deleteReply = async (reply: Reply) => {
    const { error } = $(await useDelete(reply._id).delete())
    if (!error) {
      const {comments} = $(useComment())
      comments.forEach((comment)=>{
        if (comment._id === reply.commentId) {
          remove(comment.replies, (item: Reply) => item._id === reply._id)
        }
      })
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
