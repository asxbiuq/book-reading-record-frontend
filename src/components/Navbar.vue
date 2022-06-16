<template>
  <div>
    <nav>
      <h1>My Book List</h1>

      <!-- logged in users -->
      <div v-if="userId">
        <router-link to="/">Home</router-link>
        <button @click="handleClick">Logout</button>
      </div>

      <!-- logged out users -->
      <div v-if="!userId">
        <router-link to="/login">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
    </nav>

    <!-- show user email -->
    <p v-if="userId">logged in as {{ userId }}</p>
  </div>
</template>

<script setup>
const { logout } = $(useLogout())
const { userId } = $(useLogin())
const router = useRouter()
// console.log(userId)

const handleClick =  () => {
  logout()
  router.push('/login')
}

</script>

<style>
nav {
  display: flex;
  align-items: center;
}

nav h1 {
  margin-right: auto;
  margin-bottom: 0;
}

nav a {
  margin-left: 16px;
  color: #2c3e50;
}

nav button {
  margin-left: 16px;
}

nav a.router-link-exact-active {
  color: #0ec58e;
}

nav+p {
  margin-top: 0;
  margin-bottom: 30px;
}
</style>