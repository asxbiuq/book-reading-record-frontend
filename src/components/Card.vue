<template>
  <div class="card w-96 bg-primary text-primary-content">
    <div class="card-body">
      
      <h2 class="card-title" @click="handleClickTitle"> {{ title || 'title' }} </h2>
      <p>作者: {{ description || 'description' }}</p>
      <div class="card-actions justify-end">
        <button class="btn btn-error" @click="handleClickBtn">{{ btnName || 'btnName' }}</button>
      </div>
    </div>
    

  </div>
  <div class="Display">
        <p> {{title||'Book Titles'}} </p>
    <div style="float: left">
    <button onclick="Original()">ORIGINAL</button>
    </div>
    <div style="float: left">
    <button onclick="Sort()">ALPHABETICAL</button>
    </div>
    <div style="float: left">
    <button onclick="Reverse()">REVERSE</button>
    </div>
      <h2 id = "Display">Select a Button</h2>
    </div>
</template>

<script setup>
defineProps(['title', 'description', 'btnName'])
const emits = defineEmits(['clickBtn', 'clickTitle'])
const handleClickBtn = () => {
  emits('clickBtn')
}
const handleClickTitle = () => {
  emits('clickTitle')
}
var bookTitles = ["Lord of the Rings", "Heartstopper", "Solitaire", "Normal People"];

function Original() {
  var bookTitlesOG = ["Lord of the Rings", "Heartstopper", "Solitaire", "Normal People"];
 document.getElementById("Display").innerHTML = "Original: " + bookTitlesOG.join(" - ");
}
function Sort() {
 bookTitles.sort();
 document.getElementById("Display").innerHTML = "Alphabetical: " + bookTitles.join(" - ");
}
function Reverse() {
 bookTitles.reverse();
 document.getElementById("Display").innerHTML = "Reverse: " + bookTitles.join(" - ");
}
</script>

<style lang="scss" scoped>
.Display{
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2%;
  background: #1dab98;
  padding: 45px;
  border-radius: 25px;
  position: center;
}

p{
  position: center;
  font-size: 30px;
  font-weight: 900;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center;
  color: #ffffff;
}
button{
  border-radius: 25px;
  width: 260px;
  border: 2px solid #1dab98;
  background: #ffffff;
  padding: 20px;
  font-size: 17px;
  font-family: Arial, Helvetica, sans-serif;
  color: #000000;
  margin-bottom: 20px;
  position: center;
}
button:hover, button:active,button:focus {
  background: #07544f;
  color: #ffffff;
}
h2{
  text-align: center;
}
</style>