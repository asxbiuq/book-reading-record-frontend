<template>
  <!-- <form @submit.prevent="handleSubmit">
    <h2>Login</h2>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required>

    <label for="password">Password:</label>
    <input type="password" name="password" v-model="password" required>

    <button>Login</button>
    <div v-if="error">{{ error }}</div>
  </form> -->
  <div class="loginform">
    <LoginForm 
      v-model:email="email"
      v-model:password="password"
      @login="handleLogin"
    />
  </div>
</template>

<script setup>
const email = $ref('')
const password = $ref('')

const { error, login, isPending } = $(useLogin())
const  router  = useRouter()

const handleLogin = async () => {
  await login(email, password)

  if (!error) {
    router.push({ name: 'ShowList' })
  }
}
  
</script>
<route lang="yaml">
{
  meta: {
    layout: "home",
  }
}
</route>
<style>
.loginform {
  @apply flex justify-center items-center  w-1/2
}
</style>