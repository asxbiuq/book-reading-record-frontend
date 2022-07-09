<template>
  <main class="p-4 bg-gray-50 min-h-screen w-[80vw] max-w-3xl">
    <div class="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
      <h2 class="text-3xl my-6">评论</h2>
      <CommentBox @submit="addNewComment" />
      <!-- 分隔线 -->
      <DividerHorizontal />
      <div v-for="comment in comments" :key="comment._id">
        <!-- 留言 -->
        <CommentItem
          :user="comment.creator"
          :avatar="'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg'"
          :time="comment.time"
          :content="comment.content"
          @deleteComment="deleteComment(comment._id)"
        />
        <!-- 留言列表 -->
        <ReplyContainer v-if="comment.replies">
          <CommentItem
            v-for="reply in comment.replies"
            :key="reply._id"
            :user="reply.creator"
            :avatar="'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg'"
            :time="reply.time"
            :content="reply.content"
            @deleteComment="handleDeleteReply(reply._id)"
          />
        </ReplyContainer>
        <ReplyBox @submit="handleAddReply($event, comment._id)" />
      </div>
    </div>
  </main>
</template>

<script setup>
import moment from 'moment/min/moment-with-locales'
import { nanoid } from 'nanoid'
import { find, assign, forIn, forEach } from 'lodash-es'
import face1 from 'assets/face1.png'
import face2 from 'assets/face2.png'
import face3 from 'assets/face3.png'
import face4 from 'assets/face4.png'

// data
const commentBaseUrl = import.meta.env.VITE_COMMENT_URL
const replyBaseUrl = import.meta.env.VITE_REPLY_URL
const content = $ref('')
const comments = $ref([])
const reply = $ref()
const el = ref(null)

// use
const { book, changeBook } = useBook()
const { user } = useUser()

const state = $(useState())
const router = useRouter()
const route = useRoute()
const postId = book.id
// console.log(postId)
const { useGets, useGet, useDelete, usePost, usePut } = $(
  useFetch(commentBaseUrl, state.token)
)
const { replies, getReplies, addReply, deleteReply } = $(useReply())
// console.log('replies: ', replies)

// const handleContent = (el) => {
//   console.log(el)
// }

const getAllComments = async () => {
  moment.locale('zh-cn')
  const {
    isFetching,
    error: useGetsError,
    data: res,
  } = $(await useGets(postId + '/comments').json())

  comments = res.comments

  await comments.forEach(async (comment) => {
    await getReplies(comment._id)
    forEach(replies, (reply) => {
      if (reply.time) {
        reply.time = moment(reply.time).format('llll')
        // console.log(reply)
      }
    })
    forIn(comments, (comment) => {
      if (comment.time) {
        comment.time = moment(comment.time).format('llll')
      }
    })
    comment.replies = replies
    // comment.replies.push(...replies)
  })
  console.log('comments:  ', comments)
}
await getAllComments()

const addNewComment = async (content, commentId) => {
  // const { content } = useContent()
  console.log('addNewComment')
  // console.log(commentId)
  let newComment
  if (!commentId) {
    // 增加评论
    newComment = {
      creatorId: state.userId,
      creator: user.name,
      content: content,
      time: new Date(),
      postId: postId,
      replies: [],

      // ...(replyTo && { replyTo }),
    }
    console.log(newComment)
    await usePost(postId).post(newComment)
  }


  content = ''

  await getAllComments()
}
const deleteComment = async (commentId) => {
  console.log('delete')
  const { error } = $(await useDelete(commentId).delete())
  await getAllComments()
  // if (!error) {
  //   data.posts = data.posts.filter((post) => post._id != book._id)
  // }
}
const handleAddComment = () => {
  
}
const handleDeleteComment = () => {

}
const handleAddReply = async (content, commentId) => {
  await addReply(content, commentId)

  content = ''

  await getAllComments()
}
const handleDeleteReply = async(replyId) => {
  await deleteReply(replyId)


  await getAllComments()
//   // if (!error) {
//   //   data.posts = data.posts.filter((post) => post._id != book._id)
//   // }
}


</script>
<route lang="yaml">
{ meta: { layout: 'comment' } }
</route>

<style></style>
