<script lang="ts" setup></script>

<template>
  <Alert />
  <Loading />

  <Navbar />
  <router-view />
</template>

<style>
#app {
  height: 200vh;
  background-image: linear-gradient(#c1ffd7, #b5deff, #cab8ff, #fcffa6);
}
*::-webkit-scrollbar {
  @apply w-[2vw] sm:w-[10px] xl:w-[12px];
  /* width: 2vw; */
  height: 5px;
}
*::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 1rem;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  @apply bg-blue-400;
}
*::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
}
</style>
