<template>
  <div class="top-nav">
    <div v-if="userId">
      <router-link to="/" class="active">首页</router-link>
    </div>
    <div v-if="!userId">
      <router-link to="/login">登陆</router-link>
      <router-link to="/signup">注册</router-link>
    </div>
    <div v-if="userId">
      <a @click="handleLogout">登出</a>
    </div>
  </div>
</template>

<script setup>
const { logout } = $(useLogout())
const { userId } = $(useStore())
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push({ name: 'login' })
}
</script>

<style>
/* Add a black background color to the top navigation */
.top-nav {
  background-color: #333;
  overflow: hidden;
  @apply flex justify-between
}

/* Style the links inside the navigation bar */
.top-nav a {
  float: left;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Change the color of links on hover */
.top-nav a:hover {
  background-color: #ddd;
  color: black;
}

/* Add a color to the active/current link */
.top-nav a.active {
  background-color: #04AA6D;
  color: white;
}
</style>