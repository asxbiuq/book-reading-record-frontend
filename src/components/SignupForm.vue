<template>
  <form @submit.prevent="handleSubmit">
    <div class="container">
      <label class="title">注册</label>

      <hr>
      <label for="name"><b>用户名</b></label>
      <input 
        :value="name" 
        @input="$emit('update:name', $event.target.value)" 
        type="text" 
        placeholder="输入用户名"
        name="name" 
        required
      >
      <label for="email"><b>邮箱</b></label>
      <input 
        :value="email" 
        @input="$emit('update:email', $event.target.value)" 
        type="text" 
        placeholder="输入邮箱"
        name="email" 
        required
      >

      <label for="psw"><b>密码</b></label>
      <input 
        :value="password" 
        @input="$emit('update:password', $event.target.value)" 
        type="password" placeholder="输入密码"
        name="psw" 
        required
      >

      <label for="psw-repeat"><b>确认密码</b></label>
      <input 
        v-model="pswRepeat" 
        type="password" 
        placeholder="输入密码" 
        name="psw-repeat" 
        required
      >

      <label>
        <input 
          type="checkbox" 
          checked="checked" 
          name="remember" 
          style="margin-bottom:15px"
        >
        记住密码
      </label>

      <p><a href="#" style="color:dodgerblue">创建帐户即表示您同意我们的条款和隐私</a></p>

      <div class="clearfix">
        <button type="button" class="cancelbtn">
          取消
        </button>
        <button type="submit" class="signupbtn">
          注册
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  email: String,
  password: String,
  name: String
})
const pswRepeat = $ref('')

const emits = defineEmits(['update:email', 'update:password','update:name','pswError'])

const confirm = $computed(() => {
  if (pswRepeat === props.password) {
    return true
  } else {
    return false
  }
})

const handleSubmit = async () => {
  if (confirm) {
    emits('signup')
  }else{
    emits('pswError')
  }
}
</script>

<style lang="scss" scoped>
.title {
  @apply text-xl text-gray-900
}

* {
  box-sizing: border-box
}

/* Full-width input fields */
input[type=text],
input[type=password] {
  width: 100%;
  padding: 15px;
  margin: 5px 0 22px 0;
  display: inline-block;
  border: none;
  background: #f1f1f1;
}

input[type=text]:focus,
input[type=password]:focus {
  background-color: #ddd;
  outline: none;
}

hr {
  border: 1px solid #f1f1f1;
  margin-bottom: 25px;
}

/* Set a style for all buttons */
button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
  opacity: 0.9;
}

button:hover {
  opacity: 1;
}

/* Extra styles for the cancel button */
.cancelbtn {
  padding: 14px 20px;
  background-color: #f44336;
}

/* Float cancel and signup buttons and add an equal width */
.cancelbtn,
.signupbtn {
  float: left;
  width: 50%;
}

/* Add padding to container elements */
.container {
  padding: 16px;
}

/* Clear floats */
.clearfix::after {
  content: "";
  clear: both;
  display: table;
}

/* Change styles for cancel button and signup button on extra small screens */
@media screen and (max-width: 300px) {

  .cancelbtn,
  .signupbtn {
    width: 100%;
  }
}
</style>