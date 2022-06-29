<template>
  <m_form 
    :formLabel="'注册'"
    :btnName="'注册'"
  >
      <m_input 
        :placeholder="'用户名'"
        :reg="/^\S{1,10}$/"
        v-model:data="name"
        :type="'text'"
        :dataTip="'用户名长度在1-10'"
        :value="name"
        @input="$emit('update:name', $event.target.value)"
      />

      <m_input 
        :placeholder="'邮箱'"
        :reg="/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/"
        v-model:data="email"
        :type="'email'"
        :dataTip="'请输入正确的邮箱地址'"
        :value="email"
        @input="$emit('update:email', $event.target.value)"
      />

      <m_input 
        :placeholder="'密码'"
        v-model:data="password"
        :type="'password'"
        :reg="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/"
        :dataTip="'密码至少包含 数字和英文,长度6-20'"
        :value="password"
        @input="$emit('update:password', $event.target.value)"
      />

      <m_input 
        :placeholder="'确认密码'"
        v-model:data="pswRepeat"
        v-model:dataConfirm="password"
        :type="'password'"
        :dataTip="'请再次确认密码'"
      />
      
      <div class="flex justify-between w-full">
        <span>
          <input type="checkbox" checked="checked" name="remember"><a href="#" style="color:dodgerblue">创建帐户即表示您同意我们的条款和隐私</a>
        </span>
      </div>

  </m_form>
</template>

<script setup>
const props = defineProps({
  email: String,
  password: String,
  name: String
})

const pswRepeat = $ref('')
const emits = defineEmits(['update:email', 'update:password','update:name'])
</script>

<style lang="scss" scoped>
.title {
  @apply text-xl text-gray-900 text-center
}

* {
  box-sizing: border-box
}
form {
  border: 3px solid #f1f1f1;
  @apply flex flex-col items-center
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