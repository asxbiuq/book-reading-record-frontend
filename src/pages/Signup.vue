<script lang="ts" setup>
import { assign } from 'lodash-es'

// data
const email = $ref('')
const password = $ref('')
const name = $ref('')
const url = import.meta.env.VITE_AUTH_URL + '/signup'

// composables
const { signup, error } = $(useSignup(url))
const router = useRouter()
const state = $(useLocalState())

// function
const handleSignup = async () => {
  state.isPending = true

  const result = await signup(email, password, name)

  if (result) {
    assign(state, result)
    // const { token, userId, expiryDate } = result
    // user.userId = userId
    // state.token = token
    // state.expiryDate = expiryDate
  }

  if (!error) {
    router.push('/')
  }

  state.isPending = false
}
</script>
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
<route lang="yaml">
{ meta: { layout: 'signup' } }
</route>

<style></style>
