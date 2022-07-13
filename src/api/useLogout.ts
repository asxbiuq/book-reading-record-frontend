const state = useLocalState()

const error = ref(null)
const isPending = ref(false)

const logout =  () => {
  error.value = null
  isPending.value = true

  try {
    state.value.token = null
    state.value.expiryDate = null
    isPending.value = false
    console.log('logout!')
  } catch (err:any) {
    console.log(err.message)
    error.value = err.message
    isPending.value = false
  }
}

const useLogout = () => {
  return { error, logout, isPending }
}

export default useLogout
