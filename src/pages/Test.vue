<script setup>
//通过这种方式,事件本身获取不到,得到的是event.target
function handleClick() {
  console.log('1')
}
</script>

<template>
<div class="flex justify-center items-center">
  <!-- <button 
    @click="handleClick(this)"
  >
  click
  </button> -->
    <button 
      onclick="handleClick()"
    >
    click
    </button>
</div>
</template>
<style>
div {
  height: 100vh;
}
button {
  @apply btn-info
}
</style>
