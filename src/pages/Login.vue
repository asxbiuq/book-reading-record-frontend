<script lang="ts" setup>
import { useRequest } from 'vue-request'
// data
const email = $ref('')
const password = $ref('')
const url = import.meta.env.VITE_AUTH_URL + '/login'

// composables
const router = useRouter()
const state = $(useSession())
const { error, login } = $(useLogin(url))
let isScrollToTop = $(useScrollToTop())
const {posts} = $(usePost()) 
const {setLocal} = useLocal()

watchEffect(() => {
  isScrollToTop = true
})

// function
const handleLogin = async () => {
  state.isPending = true
  const { open, close } = $(useLoading())
  open()
  const resData: any = await login(email, password)
  // const { data, run } = useRequest(getUser)
  // run(email,password)
  // console.log('useRequest',data.value)
  // state.token = resData.token
  // state.expiryDate = resData.expiryDate

  // state.userId = resData.userId
  // state.name = resData.name
  if (!error) {
    assign(state, resData)
    setLocal(JSON.stringify(state))
    router.push('/')
  } else {
    const { open } = $(useAlert())
    open(error)
    console.log(error)
  }
  close()
  state.isPending = false
}
</script>
<template>
  <LoginForm
    v-model:email="email"
    v-model:password="password"
    novalidate
    :delay="1000"
    @login="handleLogin"
    class="form"
    :isPending="state.isPending"
  />
</template>
<route lang="yaml">
{ meta: { layout: 'login' } }
</route>

<style ></style>
