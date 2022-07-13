import { defineStore } from 'pinia'
import { Ref } from 'vue'

interface User {
  isPending: boolean,
  token: string,
  expiryDate: string,
  postId:string,
  userId:string,
  name:string
}

export const useUser = defineStore('user', () => {
  
  const user :User= $ref({
    isPending: false,
    token: '',
    expiryDate: '',
    postId:'',
    userId:'',
    name:''
  })

  const clearUser = () => {
    user.isPending= false,
    user.token= '',
    user.expiryDate= '',
    user.postId='',
    user.userId='',
    user.name=''
  }
  watch(user,()=>{
    console.log('user: ',user)
  })

  return $$({
    user,
    clearUser
  })
})
