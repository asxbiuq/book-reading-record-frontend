import { defineStore } from 'pinia'

export const useComment = defineStore('comment', () => {
  const comment = $ref({})



  watchEffect(()=>{
    console.log('comment: ',comment)
  })

  return $$({
    comment,
  })
})
