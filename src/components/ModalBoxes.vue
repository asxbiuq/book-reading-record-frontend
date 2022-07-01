<template>
  <!-- Trigger/Open The Modal -->
  <button id="myBtn" @click="open">Open Modal</button>
  <teleport to="body">
    <!-- The Modal -->
    <div id="myModal" ref="myModal" class="modal">
      <!-- Modal content -->
      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  </teleport>
</template>

<script setup>
// const myModal = ref(null)

// // Get the modal
onMounted(() => {});
const myModal = ref(null);
// let modal = document.getElementById("myModal");
console.log(myModal.value);

// // Get the button that opens the modal
// let btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
const open = () => {
  console.log("open", myModal.value);
  myModal.value.style.display = "block";
  console.log(myModal.value.style.display);
};

// When the user clicks on <span> (x), close the modal
const close = () => {
  myModal.value.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == myModal) {
    myModal.value.style.display = "none";
  }
};
</script>

<style lang="scss" scoped>
/* The Modal (background) */
.modal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
