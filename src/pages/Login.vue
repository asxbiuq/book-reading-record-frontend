<template>
  <div class="loginform-shell">
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

const { error, login, isPending } = $(useLogin('http://localhost:8080/auth/login/'))
const  router  = useRouter()

const handleLogin = async () => {
  await login(email, password)

  if (!error) {
    router.push('/')
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
.loginform-shell {
  @apply flex justify-center items-center  w-1/2
}
</style>