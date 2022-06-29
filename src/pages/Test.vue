<script setup>
const el = ref(null)
onMounted(() => {
  // hideElementOnScroll(el.value)
  const { x, y, isScrolling, arrivedState, directions } = useScroll(el)
  watchEffect(()=>{
    console.log(isScrolling.value)
  })
})

</script>

<template>
<div id="navbar" ref="el">
  <a href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
</div>
</template>
<style>
#navbar {
  background-color: #333; /* Black background color */
  position: fixed; /* Make it stick/fixed */
  top: 0; /* Stay on top */
  width: 100%; /* Full width */
  transition: top 0.3s; /* Transition effect when sliding down (and up) */
}

/* Style the navbar links */
#navbar a {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 15px;
  text-decoration: none;
}

#navbar a:hover {
  background-color: #ddd;
  color: black;
}
</style>