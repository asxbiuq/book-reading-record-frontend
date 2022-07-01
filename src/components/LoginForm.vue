<template>
  <m_form
    :form-label="'登陆'"
    :btn-name="'登陆'"
    @submit.prevent="handleSubmit($event)"
  >
    <m_input
      v-model:data="email"
      :placeholder="'邮箱'"
      :reg="
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      "
      :type="'email'"
      :data-tip="'请输入正确的邮箱'"
      :value="email"
      @input="$emit('update:email', $event.target.value)"
    />
    <m_input
      v-model:data="password"
      :placeholder="'密码'"
      :type="'password'"
      :value="password"
      :reg="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/"
      :data-tip="'密码至少包含 数字和英文,长度6-20'"
      @input="$emit('update:password', $event.target.value)"
    />
    <div class="flex justify-between w-full">
      <span>
        <input type="checkbox" checked="checked" name="remember" /> 记住密码
      </span>
      <span><a href="#">忘记密码?</a></span>
    </div>
  </m_form>
</template>

<script setup>
defineProps({
  email: String,
  password: String,
});

const emits = defineEmits(["login", "update:email", "update:password"]);
// 节流 登陆按钮
const handleSubmit = useThrottleFn(() => {
  // do something, it will be called at most 1 time per second
  emits("login");
}, 1000);
</script>

<style lang="scss" scoped>
.title {
  @apply text-xl text-gray-900;
}
/* Bordered form */
form {
  border: 3px solid #f1f1f1;
  @apply flex flex-col items-center;
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

/* Set a style for all buttons */
button {
  background-color: #04aa6d;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Extra style for the cancel button (red) */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

/* Center the avatar image inside this container */
.imgcontainer {
  // text-align: center;
  // margin: 24px 0 12px 0;
  @apply text-center w-[20%] flex justify-center;
}

/* Avatar image */
img.avatar {
  width: 40%;
  border-radius: 50%;
}

/* Add padding to containers */
.container {
  padding: 16px;
}

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }

  .cancelbtn {
    width: 100%;
  }
}
</style>
