<template>
  <SignupForm
    v-model:email="email"
    v-model:password="password"
    v-model:name="name"
    novalidate
    @submit.prevent="handleSignup"
    class="form"
    :isPending="state.isPending"
  />
</template>

<script setup>
// data
const email = $ref('')
const password = $ref('')
const name = $ref('')
const login_url = import.meta.env.VITE_AUTH_URL + '/login'
const signup_url = import.meta.env.VITE_AUTH_URL + '/signup'

// composables
const {
  login,
  error: login_error,
  isPending: login_isPending,
} = $(useLogin(login_url))
const {
  signup,
  error: signup_error,
  isPending: signup_isPending,
} = $(useSignup(signup_url))
const router = useRouter()
const state = $(useState())

// function
const handleSignup = async () => {
  state.isPending = true
  const { token, userId, expiryDate } = await signup(email, password, name)

  state.userId = userId
  state.token = token
  state.expiryDate = expiryDate

  if (!(login_error || signup_error)) {
    router.push('/')
  }

  state.isPending = false
}


</script>

<route lang="yaml">
{ meta: { layout: 'signup' } }
</route>

<style></style>
