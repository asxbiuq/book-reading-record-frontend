<template>
    <div class="input_title w-full flex gap-5 justify-between items-center">
      <label class="title flex-none">{{ label }}:</label>
      <div class="flex-1">
        <div 
          class="w-full" 
          :data-tip="dataTip"
        >
          <input 
            :type="type" 
            :name="label" 
            :value="data"
            class="h-10 w-full"
            @keydown="handleKeydown($event)"
            @change="checkSelectedFile"
            @input="$emit('update:data', $event.target.value)"
          >
        </div>
      </div>
    </div>
</template>

<script setup>
const props = defineProps(['label','reg','data','type','size','dataTip','file_type'])

const emits = defineEmits(['update:data','emit_file','fileTypeError'])

const handleKeydown = (e) => {
  let value =  e.target.value

  if (!props.reg.test(value)) {
    e.target.classList.remove("input--info")
    e.target.classList.add("input--error")
    e.target.parentNode.classList.add("tooltip--error")
  } else {
    e.target.classList.remove("input--error")
    e.target.classList.add("input--info")
    e.target.parentNode.classList.remove("tooltip--error")                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
  }
}

// 允许上传的数据类型
const fileTypes = props.file_type
const checkSelectedFile = (e) => {
  if (props.type === 'file') {
    const selected = e.target.files[0]

    if (selected && fileTypes.includes(selected.type)) {
      emits('emit_file',selected)
    } else {
      emits('fileTypeError')
      console.log('fileType  Error')
    }
  }
}
</script>

<style lang="scss" scoped>
.input--info {
  @apply input input-bordered input-info;
  background-color: #cffafe;
}
.input--error {
  @apply input input-bordered input-error;
  background-color: #fce4e4;
}
.tooltip--error {
  @apply tooltip tooltip-open tooltip-right tooltip-error;
  &:before, 
  &:after {
    opacity: 1;
  }
}
input {
  @apply input input-bordered;
}
</style>