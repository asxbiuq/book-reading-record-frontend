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

<script lang="ts" setup>
// data
const email = ref('')
const password = ref('')
const url = import.meta.env.VITE_AUTH_URL + '/login'

// composables
const router = useRouter()
const state = useLocalState()
const { user } = useUser()
const { error, login } = useLogin(url)

// function
const handleLogin = async () => {
  state.value.isPending = true
  const resData: any = await login(email.value, password.value)

  state.value.token = resData.token
  state.value.expiryDate = resData.expiryDate

  user.userId = resData.userId
  user.name = resData.name

  if (!error.value) {
    router.push('/')
  } else {
    console.log(error.value)
  }

  state.value.isPending = false
}
</script>

<route lang="yaml">
{ meta: { layout: 'login' } }
</route>

<style></style>
