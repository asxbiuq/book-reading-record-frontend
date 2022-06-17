<template>
  <form @submit.prevent="handleSubmit">
    <h2>Login</h2>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required>

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required>

    <button>Login</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script setup>
const email = $ref('')
const password = $ref('')

const { error, login, isPending } = $(useLogin())
const  router  = useRouter()

const handleSubmit = async () => {
  await login(email, password)

  // if (!error) {
  //   console.log('routeing...')
  //   router.push({ name: 'ShowList' })
  //   console.log('routed')
  // }
}
  
</script>