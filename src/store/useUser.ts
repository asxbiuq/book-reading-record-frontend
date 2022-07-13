import { defineStore } from 'pinia'
import { Ref } from 'vue'

interface User {
  userId:string,
  name:string
}

export const useUser = defineStore('user', () => {
  
  const user :Ref<User>= ref({
    userId:'',
    name:''
  })

  watch(user,()=>{
    console.log('user: ',user)
  })

  return {
    user,
  }
})
