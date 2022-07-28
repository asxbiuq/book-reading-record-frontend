<script setup lang="ts">
// composables
const { logout } = $(useLogout())
const state = $(useLocalState())
const router = useRouter()

// function
const handleLogout = () => {
  router.push({ name: 'Login' })
  logout()
}
const el = $ref<HTMLInputElement | null>(null)

onMounted(() => {
  if (el) {
    hideElementOnScroll(el)
  } else {
    throw new Error(`el is ${el}`)
  }
})
</script>

<template>
  <div
    ref="el"
    class="p-navbar bg-info text-primary-content fixed top-[0%] duration-700 z-10"
  >
    <div class="flex-1">
      <div v-if="state.token">
        <router-link to="/" class="p-btn p-btn-ghost normal-case text-xl"
          ><i-ant-design:home-twotone style="color: white; font-size: 1.5rem"
        /></router-link>
      </div>
      <div v-if="!state.token">
        <router-link to="/login" class="p-btn p-btn-ghost normal-case text-xl"
          >登陆</router-link
        >
        <router-link to="/signup" class="p-btn p-btn-ghost normal-case text-xl"
          >注册</router-link
        >
      </div>
    </div>
    <div class="flex-none items-align">
      <div v-if="state.token" class="flex">
        <router-link to="/fav" class="p-btn p-btn-ghost normal-case text-xl"
          >收藏夹</router-link
        >
        <router-link to="/mypost" class="p-btn p-btn-ghost normal-case text-xl"
          >我的书单</router-link
        >
        <button class="p-btn p-btn-square p-btn-ghost">
          <i-bytesize:sign-out
            style="color: white; font-size: 1.5rem"
            @click="handleLogout"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
