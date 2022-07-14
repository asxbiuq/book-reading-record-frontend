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
  background-image:  linear-gradient( #C1FFD7,#B5DEFF,#CAB8FF,#FCFFA6);
}
</style>
