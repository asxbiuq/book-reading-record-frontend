const { userId, token, expiryDate } = $(useStore())
const error = $ref(null)
const isPending = $ref(false)

const logout = async () => {
  error = null
  isPending = true

  try {
    token = null
    expiryDate = null
    userId = null
    isPending = false
    console.log('logout!')
  } catch (err) {
    console.log(err.message)
    error = err.message
    isPending = false
  }
}

const useLogout = () => {
  return $$({ error, logout, isPending })
}

export default useLogout
