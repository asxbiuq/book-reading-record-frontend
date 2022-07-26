export const useUser = defineStore('user', () => {
  const user: User = $ref({
    userId: '',
    name: '',
    posts: [],
    comments: [],
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
