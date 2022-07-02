<template>
    <LoginForm
      v-model:email="email"
      v-model:password="password"
      novalidate
      :delay="1000"
      @login="handleLogin"
      class="form"
    />
</template>

<script setup>
const email = $ref("");
const password = $ref("");
const url = import.meta.env.VITE_AUTH_URL + "/login";
const {
  userId: store_userId,
  token: store_token,
  expiryDate: store_expiryDate,
} = $(useStore());
const { error, login, isPending } = $(useLogin(url));

const router = useRouter();

const handleLogin = async () => {
  const { token, userId, expiryDate } = await login(email, password);
  console.log(token);
  store_userId = userId;
  store_token = token;
  store_expiryDate = expiryDate;

  if (!error) {
    router.push("/");
  }
};
</script>

<route lang="yaml">
{ meta: { layout: "login" } }
</route>

<style>

</style>
