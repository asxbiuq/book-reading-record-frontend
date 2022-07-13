import { createGlobalState, useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

interface LocalState{
  isPending:boolean,
  token:string,
  expiryDate:string
}
const state = useStorage('vue-use-locale-storage', {
  isPending: false,
  token: '',
  expiryDate: '',
})

const useLocalState = () => {
  return state
}

export default useLocalState



// export const useLocaleState = defineStore('localeState', () => {
  
//   const state = useStorage('localeState', {
//     isPending: false,
//     token: '',
//     expiryDate: '',
//   })

//   watch(state,()=>{
//     console.log('user: ',state)
//   })

//   return {
//     state,
//   }
// })

