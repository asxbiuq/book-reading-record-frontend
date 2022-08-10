import {getLocal} from '@/store/useLocal'


let state : any
const originalText = getLocal()
if (originalText) {
   state = useSessionStorage('post-bar-SessionStorage', JSON.parse(originalText))
   console.log(state)
} else {
  state = useSessionStorage('post-bar-SessionStorage', {
    isPending: false,
    token: '',
    expiryDate: '',
    postId: '',
    userId: '',
    name: '',
  })
}

const clearState = () => {
  state.value = null
}

const useSession = () => {
  return state
}

export default useSession