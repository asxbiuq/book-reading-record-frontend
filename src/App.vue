<script setup>
const state = useState()
const isOpenAlert = $ref(null)
isOpenAlert = true
</script>

<template>
  <Alert :isOpenAlert="isOpenAlert" />
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
