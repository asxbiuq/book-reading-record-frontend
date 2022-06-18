<template>
  <!-- <div>
    <nav>
      <h1>My Book List</h1>

      
      <div v-if="userId">
        <router-link to="/showlist">showlist</router-link>
        <button @click="handleClick">Logout</button>
      </div>

      
      <div v-if="!userId">
        <router-link to="/">Login</router-link>
        <router-link to="/signup">Signup</router-link>
      </div>
    </nav>

    
    <p v-if="userId">logged in as {{ userId }}</p>
  </div> -->
  <div class="nav">
    <!-- Add icon library -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

    <div class="icon-bar">
      <a class="active" href="#"><i class="fa fa-home"></i></a>
      <a href="#"><i class="fa fa-search"></i></a>
      <a href="#"><i class="fa fa-envelope"></i></a>
      <a href="#"><i class="fa fa-globe"></i></a>
      <a href="#"><i class="fa fa-trash"></i></a>
    </div>
  </div>
</template>

<script setup>
const { logout } = $(useLogout())
const { userId } = $(useStore())
const router = useRouter()


const handleClick = () => {
  logout()
  router.push('/')
}

</script>

<style>
/* nav {
  display: flex;
  align-items: center;
}

nav h1 {
  margin-right: auto;
  margin-bottom: 0;
}

nav a {
  margin-left: 16px;
  color: #2c3e50;
}

nav button {
  margin-left: 16px;
}

nav a.router-link-exact-active {
  color: #0ec58e;
}

nav+p {
  margin-top: 0;
  margin-bottom: 30px;
} */

.nav .icon-bar{
  display: flex;
  flex-direction: row;
}
.icon-bar {
  width: 100%;
  /* Full-width */
  background-color: #555;
  /* Dark-grey background */
  overflow: auto;
  /* Overflow due to float */
}

.icon-bar a {
  float: left;
  /* Float links side by side */
  text-align: center;
  /* Center-align text */
  width: 20%;
  /* Equal width (5 icons with 20% width each = 100%) */
  padding: 12px 0;
  /* Some top and bottom padding */
  transition: all 0.3s ease;
  /* Add transition for hover effects */
  color: white;
  /* White text color */
  font-size: 36px;
  /* Increased font size */
}

.icon-bar a:hover {
  background-color: #000;
  /* Add a hover color */
}

.active {
  background-color: #04AA6D;
  /* Add an active/current color */
}
</style>