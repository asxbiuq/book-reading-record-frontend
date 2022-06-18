<template>
  <div class="signupform-shell">
    <SignupForm 
      v-model:email="email" 
      v-model:password="password" 
      v-model:name="name" 
      @signup="handleSignup"
      @pswError="handlePswError" 
    />
  </div>
</template>

<script setup>
const email = $(ref(''))
const password = $(ref(''))
const name = $(ref(''))

const { signup, error, isPending } = $(useSignup())
const router = useRouter()

const handleSignup = async () => {
  await signup(email, password, name)

  if (!error) {
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