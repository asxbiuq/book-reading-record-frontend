<script lang="ts" setup>
// data
const email = $ref('')
const password = $ref('')
const url = import.meta.env.VITE_AUTH_URL + '/login'

// composables
const router = useRouter()
const state = $(useLocalState())
const { error, login } = $(useLogin(url))
let isScrollToTop = $(useScrollToTop())

watchEffect(() => {
  isScrollToTop = true
})

// function
const handleLogin = async () => {
  state.isPending = true
  const resData: any = await login(email, password)

  assign(state, resData)
  // state.token = resData.token
  // state.expiryDate = resData.expiryDate

  // state.userId = resData.userId
  // state.name = resData.name

  if (!error) {
    router.push('/')
  } else {
    console.log(error)
  }

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

<style></style>
