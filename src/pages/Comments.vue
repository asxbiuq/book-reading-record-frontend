<template>
  <main class="p-4 bg-gray-50 min-h-screen w-[80vw] max-w-3xl">
    <div class="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
      <h2 class="text-3xl my-6">评论</h2>
      <CommentBox @submit="addNewComment" @deleteComment="deleteComment"/>
      <!-- 分隔线 -->
      <DividerHorizontal />
      <div v-for="comment in comments" :key="comment._id">
        <!-- 留言 -->
        <CommentItem
          :user="comment.name"
          :avatar="'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg'"
          :time="comment.time"
          :content="comment.content"
          @deleteComment="deleteComment(comment._id)"
        />
        <!-- 留言列表 -->
        <ReplyContainer v-if="comment.replies">
          <CommentItem
            v-for="reply in comment.replies"
            :key="reply.id"
            :user="reply.user"
            :avatar="'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg'"
            :time="reply.time"
            :content="reply.content"
            @deleteComment="deleteComment(reply.replyId)"
          />
        </ReplyContainer>
        <ReplyBox
          @submit="addNewComment($event, comment._id)"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { nanoid } from 'nanoid'
import { find } from 'lodash-es'
import face1 from 'assets/face1.png'
import face2 from 'assets/face2.png'
import face3 from 'assets/face3.png'
import face4 from 'assets/face4.png'

// data
const baseUrl = import.meta.env.VITE_COMMENT_URL //http://localhost:8080/feed/post
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
  useFetch(baseUrl, state.token)
)
// const { reply } = useReply()
// watchEffect(()=>{
//   console.log(content)
// })
// async function getAllComments() {
//   const res = await fetch('/api/comments')
//   comments.value = await res.json()props.postId
// }

// function
const handleContent = (el) => {
  console.log(el)
}
const getAllComments = async () => {
  const {
    isFetching,
    error: useGetsError,
    data: res,
  } = $(await useGets(postId + '/comments').json())
  comments = res.comments
  console.log(comments)
}
getAllComments()

const addNewComment = async (content, commentId) => {
  // const { content } = useContent()
  console.log('addNewComment')
  // console.log(commentId)
  let newComment
  if (!commentId) {
    // 增加评论
    newComment = {
      creator: user.name,
      content: content,
      time: new Date(),
      postId: postId,
      replies: [],

      // ...(replyTo && { replyTo }),
    }
    await usePost(postId).post(newComment)
  } else {
    // 更新回复
    const newReply = {
      creator: user.name,
      content: content,
      time: new Date(),
      commentId: commentId,
      replyId: nanoid()
    }
    // const newComment = find(comments, (comment) => {
    //   return comment._id == commentId
    // })
    // const newComment = comments.find((comment)=>{
    //     return comment._id == commentId
    // })
    console.log(newReply)

    // newComment.replies.push(newReply)
    await usePost(postId + '/' + commentId).post(newReply)
  } 

  content = ''

  // console.log('newComments', newComments)

  await getAllComments()
}

// const addReply = async (comment) => {
//   const { content } = useContent()
//   console.log('addReply')
//   console.log('content:', content)
//   const newReply = {
//     creator: user.name,
//     content: content,
//     time: new Date(),
//     applyTo: comment._id,
//   }
//   console.log('newReply', newReply)

//   content = ''

//   await usePost(postId + '/comment').post(newReply)

//   await getAllComments()
// }

// const addNewComment = async (content, replyTo) => {
//   const res = await fetch(`/api/comments`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       content,
//       ...(replyTo && { replyTo }),
//     }),
//   })

//   const newComment = await res.json()
//   if (!replyTo) {
//     comments.value.unshift(newComment)
//   } else {
//     comments.value.find((c) => c.id === replyTo).replies.unshift(newComment)
//   }

//   // 新增完评论后，自动获取新的评论列表
//   // Notion API 有延迟，在添加完 page 之后，需要过一会才能获取到新的评论列表
//   // setTimeout(async () => {
//   //   await getAllComments();
//   // }, 1000);
// }

const deleteComment = async (commentId) => {
  console.log('delete')
  const { error } = $(
    await useDelete(postId + '/' + commentId).delete()
  )
  await getAllComments()
  // if (!error) {
  //   data.posts = data.posts.filter((post) => post._id != book._id)
  // }
}
</script>
<route lang="yaml">
{ meta: { layout: 'comment' } }
</route>

<style></style>
