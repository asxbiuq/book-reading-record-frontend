import { defineStore } from 'pinia'
import { Ref } from 'vue'


interface Reply {
  _id:string,
  creator: string,
  creatorId: string,
  content: string,
  time: Date,
  commentId: string,
}

const replyBaseUrl = import.meta.env.VITE_REPLY_URL

const state = useLocalState()
const { useGets, usePost, useDelete } = useFetch(replyBaseUrl, state.value.token)

export const useReply = defineStore('reply', () => {
  const replies : Ref<Reply[]> = ref([])

  const getReplies = async (commentId :string) => {
    const { isFetching, error, data } = await useGets(commentId + '/replies').json()
    
    if (!error.value) {
      replies.value = data.replies
    } else {
      console.log(error.value)
    }
  }
  const addReply = async (content : string, commentId :string) => {
    const newReply = {
      creator: state.value.name,
      creatorId: state.value.userId,
      content: content,
      time: new Date(),
      commentId: commentId,
    }

    const { error } = await usePost(commentId).post(newReply)
  }

  const deleteReply = async (replyId : string) => {
    const { error } = await useDelete(replyId).delete()
    if (!error.value) {
      replies.value = replies.value.filter((reply) => reply._id !== replyId)
    } else {
      console.log(error.value)
    }
  }

  watchEffect(() => {
    console.log('replies: ', replies.value)
  })

  return {
    replies,
    getReplies,
    addReply,
    deleteReply,
  }
})
