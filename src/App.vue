<script setup>
const state = useState()
</script>

<template>
  <div v-if="state.isPending">
    <Loading />
  </div>
  <Navbar />
  <router-view />
</template>

<style>
#app {
  height: 200vh;
}
</style>
