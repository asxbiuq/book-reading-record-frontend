<script lang="ts" setup>
const state = useState()
const isOpenAlert = ref(false)

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
