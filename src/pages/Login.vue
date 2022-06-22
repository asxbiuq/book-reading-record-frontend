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
const url = $ref('http://localhost:8080/auth/login/')
const { userId : store_userId, token : store_token, expiryDate : store_expiryDate } = $(useStore())
const { error, login, isPending } = $(useLogin(url))

const  router  = useRouter()

const handleLogin = async () => {
  const { token, userId, expiryDate } = await login(email, password)

  store_userId = userId
  store_token = token
  store_expiryDate = expiryDate

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