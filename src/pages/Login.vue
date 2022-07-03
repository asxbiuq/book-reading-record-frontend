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
// data
const email = $ref('')
const password = $ref('')
const url = import.meta.env.VITE_AUTH_URL + '/login'

// composables
const { error, login, isPending: isPending_login } = $(useLogin(url))
const router = useRouter()
const state = $(useState())
console.log(state)
// function
const handleLogin = async () => {
  state.isPending = true
  const { token, userId, expiryDate } = await login(email, password)
  state.userId = userId
  state.token = token
  state.expiryDate = expiryDate

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
