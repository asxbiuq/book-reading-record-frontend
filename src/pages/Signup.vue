<template>
  <div class="signupform-shell">
    <SignupForm 
      v-model:email="email" 
      v-model:password="password" 
      v-model:name="name" 
      @signup="handleSignup"
      @pswError="handlePswError" 
      novalidate
    />
  </div>
</template>

<script setup>
const email = $(ref(''))
const password = $(ref(''))
const name = $(ref(''))
const login_url = import.meta.env.VITE_AUTH_URL + '/login'
const signup_url = import.meta.env.VITE_AUTH_URL + '/signup'
const { login, error : login_error, isPending :login_isPending} = $(useLogin(login_url))
const { signup, error : signup_error , isPending: signup_isPending} = $(useSignup(signup_url))
const router = useRouter()
const { userId : store_userId, token : store_token, expiryDate : store_expiryDate } = $(useStore())

const handleSignup = async () => {
  const { token, userId, expiryDate } = await signup(email, password, name)

  store_userId = userId
  store_token = token
  store_expiryDate = expiryDate

  if (!(login_error && signup_error)) {
    router.push('/')
  }
}
const handlePswError = () => {
  alert('请再次确认密码')
}
</script>
<route lang="yaml">
{
  meta: {
    layout: "signup",
  }
}
</route>
<style>
.signupform-shell {
  @apply flex justify-center items-center w-1/2
}
</style>