<template>
  <form @submit.prevent="handleSubmit">
    <h2>Sign up</h2>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required>

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required>

    <label for="password">name:</label>
    <input type="text" name="name" v-model="name" required>

    <button>Sign up</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script setup>
const email = $(ref(''))
const password = $(ref(''))
const name = $(ref(''))

const { signup, error, isPending } = $(useSignup())
const router = useRouter()

const handleSubmit = async () => {
  await signup(email, password, name)

  if (!error) {
    router.push('/')
  }
}
</script>