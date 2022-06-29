<template>
  <div class="input_title w-full flex gap-5 justify-between items-center ">

    <!-- <label class="title">{{ label }}:</label> -->


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
          :placeholder="placeholder"
        >

      </div>

  </div>
</template>

<script setup>
const props = defineProps(['label', 'reg', 'data', 'type', 'size', 'dataTip', 'file_type','placeholder','dataConfirm'])

const emits = defineEmits(['update:data', 'emit_file', 'fileTypeError'])


// 允许上传的数据类型
const fileTypes = props.file_type
const checkSelectedFile = (e) => {
  if (props.type === 'file') {
    const selected = e.target.files[0]

    if (selected && fileTypes.includes(selected.type)) {
      emits('emit_file', selected)
    } else {
      emits('fileTypeError')
      console.log('fileType  Error')
    }
  }
}

const handleKeydown = (e) => {
  if (e.target.timeout) 
    clearTimeout(e.target.timeout); 

  e.target.timeout = setTimeout(() => {
    let value = e.target.value
    if (props.reg && !props.reg.test(value) && !props.dataConfirm) {
      e.target.classList.remove("input--info")
      e.target.classList.add("input--error")
      e.target.parentNode.classList.add("tooltip--error")
    } else {
      e.target.classList.remove("input--error")
      e.target.classList.add("input--info")
      e.target.parentNode.classList.remove("tooltip--error")
    }
    if (props.dataConfirm && props.dataConfirm !== props.data) {
        e.target.classList.remove("input--info")
        e.target.classList.add("input--error")
        e.target.parentNode.classList.add("tooltip--error")
    } else {
        e.target.classList.remove("input--error")
        e.target.classList.add("input--info")
        e.target.parentNode.classList.remove("tooltip--error")
    }
  }, 1000); // delay

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