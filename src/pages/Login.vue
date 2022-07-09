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

<script setup>
import { useUser } from '../store/useUser'

// data
const email = $ref('')
const password = $ref('')
const url = import.meta.env.VITE_AUTH_URL + '/login'

// composables
const { error, login, isPending: isPending_login } = $(useLogin(url))
const router = useRouter()
const state = $(useState())

// function
const handleLogin = async () => {
  state.isPending = true
  const { resData } = await login(email, password)

  state.userId = resData.userId
  state.token = resData.token
  state.expiryDate = resData.expiryDate
  state.name = resData.name
  console.log(resData)
  const { user } = useUser()
  user.userId = resData.userId
  user.name = resData.name
  // console.log(resData)
  if (!error) {
    router.push('/')
  }

  state.isPending = false
}
</script>

<route lang="yaml">
{ meta: { layout: 'login' } }
</route>

<style></style>
