type UserId = string
type Name = string
interface Post {
  title: string
  imageUrl: string
  content: string
  creator: string
  author: string
  isFav: boolean
  time: string
  avatar: string
  comments: any
  _id: string
}
interface User {
  posts:Post[]
  comments:Comment[]
  userId: UserId
  name: Name
}

export const useUser = defineStore('user', () => {
  const user: User = $ref({
    userId: '',
    name: '',
    posts:[],
    comments:[]
  })

  const clearUser = () => {
    ;(user.userId = ''),
      (user.name = ''),
      (user.posts = []),
      (user.comments = [])
  }
  watch(user, () => {
    console.log('user: ', user)
  })

  return $$({
    user,
    clearUser,
  })
})
