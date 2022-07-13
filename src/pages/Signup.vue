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

<script lang="ts" setup>
// data
const email = ref('')
const password = ref('')
const name = ref('')
const url = import.meta.env.VITE_AUTH_URL + '/signup'

// composables
const {signup,error} = useSignup(url)
const router = useRouter()
const state = useLocalState()
const { user } = useUser()

// function
const handleSignup = async () => {

  state.value.isPending = true

  const result = await signup(email.value, password.value, name.value)

  if (result) {
    const { token, userId, expiryDate } = result
    user.userId = userId
    state.value.token = token
    state.value.expiryDate = expiryDate
  }


  if (! error.value) {
    router.push('/')
  }

  state.value.isPending = false
}
</script>

<route lang="yaml">
{ meta: { layout: 'signup' } }
</route>

<style></style>
