import { defineStore } from 'pinia'

export const useUser = defineStore('user', () => {
  const user = $ref({})




  watch(user,()=>{
    console.log('user: ',user)
  })
  return $$({
    user,
  })
})
