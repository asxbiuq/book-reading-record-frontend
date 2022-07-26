<script lang="ts" setup>
import avatar from '/public/assets/default_avatar.jpg'
// const avatar = new URL('/public/assets/default_avatar.jpg', import.meta.url)
//   .href
let postId: string

const state = $(useLocalState())
const Route = useRoute()
const { replies, getReplies, addReply, deleteReply } = $(useReply())
const { comments, addComment, deleteComment, getComments, clearComment } = $(
  useComment()
)
const { clearReplies } = useReply()
let isScrollToTop = $(useScrollToTop())

clearComment()
clearReplies()

// 获取路由传递的postId , 如果没有就从本地存储里找
if (Route.params.id && typeof Route.params.id == 'string' && !comments.length) {
  postId = Route.params.id
  await getComments(postId)
  isScrollToTop = true
} else {
  const state = $(useLocalState())
  postId = state.postId
  await getComments(postId)
  isScrollToTop = true
}

const handleAddComment = async (content: string) => {
  const { open, close } = useLoading()
  open()

  try {
    await addComment(content, postId)
  } catch (error: any) {
    console.log(error)
    const { open } = useAlert()
    open(error)
  }

  content = ''
  close()
}

const handleDeleteComment = async (commentId: string, content: string) => {
  const { open, close } = useLoading()
  open()

  try {
    await deleteComment(commentId)
  } catch (error: any) {
    console.log(error)
    const { open } = useAlert()
    open(error)
  }

  content = ''
  close()
}

const handleAddReply = async (content: string, commentId: string) => {
  const { open, close } = useLoading()
  open()

  try {
    await addReply(content, commentId)
  } catch (error: any) {
    console.log(error)
    const { open } = useAlert()
    open(error)
  }

  content = ''
  close()
  // await GetAndFormat()
}

const handleDeleteReply = async (reply: Reply) => {
  const { open, close } = useLoading()
  open()

  try {
    await deleteReply(reply)
  } catch (error: any) {
    console.log(error)
    const { open } = useAlert()
    open(error)
  }

  // await GetAndFormat()
  close()
}
</script>

<template>
  <main class="p-4 min-h-screen w-[80vw] max-w-3xl">
    <div
      class="max-w-screen-xl mx-auto p-8 rounded-xl shadow-2xl bg-opacity-25"
    >
      <h2 class="text-3xl my-6">评论</h2>
      <CommentBox @submit="handleAddComment" />
      <!-- 分隔线 -->
      <DividerHorizontal />
      <div v-for="comment in comments" :key="comment._id">
        <!-- 留言 -->
        <CommentItem
          :user="comment.creator"
          :avatar="avatar"
          :time="comment.time"
          :content="comment.content"
          @deleteComment="handleDeleteComment(comment._id, comment.content)"
        />
        <!-- 留言列表 -->
        <ReplyContainer v-if="comment.replies">
          <CommentItem
            v-for="reply in comment.replies"
            :key="reply._id"
            :user="reply.creator"
            :avatar="avatar"
            :time="reply.time"
            :content="reply.content"
            @deleteComment="handleDeleteReply(reply)"
          />
        </ReplyContainer>
        <ReplyBox @submit="handleAddReply($event, comment._id)" />
      </div>
    </div>
  </main>
</template>

<route lang="yaml">
{ meta: { layout: 'comment' } }
</route>

<style></style>
