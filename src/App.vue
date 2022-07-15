<script lang="ts" setup>
const state = useLocalState()
</script>

<template>
  <Alert />
  <div v-if="state.isPending">
    <Loading />
  </div>
  <Navbar />

  <router-view />
</template>

<style>
#app {
  height: 200vh;
  background-image: linear-gradient(#c1ffd7, #b5deff, #cab8ff, #fcffa6);
}
</style>
