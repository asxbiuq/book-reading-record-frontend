<template>
  <main class="p-4 bg-gray-50 min-h-screen w-[80vw] max-w-3xl">
    <div class="max-w-screen-xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
      <h2 class="text-3xl my-6">评论</h2>
      <CommentBox @submit="handleAddComment" />
      <!-- 分隔线 -->
      <DividerHorizontal />
      <div v-for="comment in comments" :key="comment._id">
        <!-- 留言 -->
        <CommentItem
          :user="comment.creator"
          :avatar="'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg'"
          :time="comment.time"
          :content="comment.content"
          @deleteComment="handleDeleteComment(comment._id,comment.content)"
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

<script lang="ts" setup>
import { forEach } from 'lodash-es'

const Route = useRoute()
let postId: string
const { replies, getReplies, addReply, deleteReply } = useReply()
const { comments, addComment, deleteComment, getComments } = useComment()

// watchEffect(async()=>{
// async()=>{

if (Route.params.id && typeof Route.params.id == 'string') {
  postId = Route.params.id
  await getComments(postId)
}
// }()
// })

const GetAndFormat = async () => {
  formatTime(comments)

  forEach(comments, async (comment) => {
    await getReplies(comment._id)
    formatTime(replies)
    comment.replies = replies
  })
}
await GetAndFormat()

const handleAddComment = async (content : string) => {
  await addComment(content, postId)

  content = ''
}

const handleDeleteComment = async (commentId : string,content:string) => {
  await deleteComment(commentId)

  content = ''
}

const handleAddReply = async (content : string, commentId : string) => {
  await addReply(content, commentId)

  content = ''

  await GetAndFormat()
}

const handleDeleteReply = async (replyId : string) => {
  await deleteReply(replyId)

  await GetAndFormat()
}
</script>
<route lang="yaml">
{ meta: { layout: 'comment' } }
</route>

<style></style>
