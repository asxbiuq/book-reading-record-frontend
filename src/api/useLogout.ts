let error = $ref(null)
let isPending = $ref(false)

const logout = () => {
  const state = $(useLocalState())
  const { clearPosts } = $(usePost())

  error = null
  isPending = true

  try {
    state.token = ''
    state.expiryDate = ''
    ;(state.isPending = false),
      (state.token = ''),
      (state.expiryDate = ''),
      (state.postId = ''),
      (state.userId = ''),
      (state.name = '')
    isPending = false
    clearPosts()
    console.log('logout!')
  } catch (err: any) {
    console.log(err.message)
    error = err.message
    isPending = false
  }
}

const useLogout = () => {
  return $$({ error, logout, isPending })
}

export default useLogout
