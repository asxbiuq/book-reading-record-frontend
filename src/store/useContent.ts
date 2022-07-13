import { defineStore } from 'pinia'

export const useContent = defineStore('content', () => {
  const content = ref({msg:''})



  watchEffect(()=>{
    console.log('content: ',content)
  })

  return {
    content,
  }
})
