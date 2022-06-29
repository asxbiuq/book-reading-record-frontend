<script setup>
import { themeChange } from 'theme-change'
onMounted(() => {
      themeChange(false)
    })
</script>

<template>
  <Navbar />
  <router-view />
  
</template>

<style>
#app {
  height: 100vh;
}
</style>
