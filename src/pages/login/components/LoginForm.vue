<script lang="ts" setup>
// data
interface Props {
  email: string
  password: string
  delay: number
}
const { email, password, delay } = defineProps<Props>()

// event
const emits = defineEmits(['login', 'update:email', 'update:password'])

// function
// 节流 登陆按钮
const handleSubmit = useThrottleFn(() => {
  emits('login')
}, delay)
</script>

<template>
  <MForm
    :form-label="'登陆'"
    :btn-name="'登陆'"
    @submit.prevent="handleSubmit($event)"
  >
    <MInput
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
    <MInput
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
      <a href="#">忘记密码?</a>
    </div>
  </MForm>
</template>

<style scoped></style>
