import { defineStore } from 'pinia'

export const useReply = defineStore('reply', () => {
  const reply = $ref('')

  watchEffect(()=>{
    console.log('reply: ',reply)
  })

  return $$({
    reply,
  })
})
