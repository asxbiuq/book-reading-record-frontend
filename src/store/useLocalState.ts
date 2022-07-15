import { createGlobalState, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

const state = useStorage('vue-use-locale-storage', {
  isPending: false,
  token: '',
  expiryDate: '',
  postId: '',
  userId: '',
  name: '',
})

const clearState = () => {
  ;(state.value.isPending = false),
    (state.value.token = ''),
    (state.value.expiryDate = ''),
    (state.value.postId = ''),
    (state.value.userId = ''),
    (state.value.name = '')
}

const useLocalState = () => {
  return state
}

export default useLocalState
