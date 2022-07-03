<template>
  <MForm :form-label="'注册'" :btn-name="'注册'" :isPending="isPending">
    <MInput
      v-model:data="name"
      :placeholder="'用户名'"
      :reg="/^\S{1,10}$/"
      :type="'text'"
      :data-tip="'用户名长度在1-10'"
      :value="name"
      @input="$emit('update:name', $event.target.value)"
    />

    <MInput
      v-model:data="email"
      :placeholder="'邮箱'"
      :reg="
        /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
      "
      :type="'email'"
      :data-tip="'请输入正确的邮箱地址'"
      :value="email"
      @input="$emit('update:email', $event.target.value)"
    />

    <MInput
      v-model:data="password"
      :placeholder="'密码'"
      :type="'password'"
      :reg="/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/"
      :data-tip="'密码至少包含 数字和英文,长度6-20'"
      :value="password"
      @input="$emit('update:password', $event.target.value)"
    />

    <MInput
      v-model:data="pswRepeat"
      v-model:dataConfirm="password"
      :placeholder="'确认密码'"
      :type="'password'"
      :data-tip="'请再次确认密码'"
    />

    <div>
      <input type="checkbox" checked="checked" class="checkbox checkbox-xs" />
      <span class="label-text text-sm"
        >创建帐户即表示您同意我们的条款和隐私</span
      >
    </div>
  </MForm>
</template>

<script setup>
const props = defineProps({
  email: String,
  password: String,
  name: String,
  isPending: Boolean,
})

const pswRepeat = $ref('')
const emits = defineEmits(['update:email', 'update:password', 'update:name'])
</script>

<style scoped></style>
