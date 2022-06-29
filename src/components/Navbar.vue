<template>
  <div class="p-navbar bg-info text-primary-content fixed top-[0%] duration-700 z-10" ref="el">
    <div class="flex-1">
      <div v-if="userId">
        <router-link to="/" class="p-btn p-btn-ghost normal-case text-xl"><i-ant-design:home-twotone  /></router-link>
      </div>
      <div v-if="!userId">
        <router-link to="/login" class="p-btn p-btn-ghost normal-case text-xl">登陆</router-link>
        <router-link to="/signup" class="p-btn p-btn-ghost normal-case text-xl">注册</router-link>
      </div>
    </div>
    <div class="flex-none">
      <div v-if="userId">
        <button class="p-btn p-btn-square p-btn-ghost">
          <i-bytesize:sign-out @click="handleLogout" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { logout } = $(useLogout())
const { userId } = $(useStore())
const router = useRouter()

const handleLogout = () => {
  router.push({ name: 'Login' })
  logout()
}
const el = ref(null)

onMounted(() => {
  hideElementOnScroll(el.value)
})


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