<template>
  <div class="input_title w-full flex gap-5 justify-between items-center">

      <div 
        :class="tooltip" 
        :data-tip="dataTip"
      >
        <input 
          :type="type" 
          :name="label" 
          :value="data" 
          :class="input"
          @keydown="handleKeydown($event)" 
          @change="checkSelectedFile"
          @input="$emit('update:data', $event.target.value)"
          :placeholder="placeholder"
        >

      </div>

  </div>
</template>

<script setup>
const props = defineProps(
  [
    'label', 'reg', 'data', 'type', 'size', 'dataTip', 'file_type','placeholder','dataConfirm',
    'tooltip','input'
  ])

const emits = defineEmits(['update:data', 'emit_file', 'fileTypeError'])


// 允许上传的数据类型
const fileTypes = props.file_type
const checkSelectedFile = (e) => {
  if (props.type === 'file') {
    const selected = e.target.files[0]

    if (selected && fileTypes.includes(selected.type)) {
        e.target.classList.remove("input-error")
        e.target.classList.add("input-info")
        e.target.parentNode.classList.remove("tooltip-error")
        emits('emit_file', selected)
    } else {
      e.target.classList.remove("input-info")
      e.target.classList.add("input-error")
      e.target.parentNode.classList.add("tooltip-error")
      // emits('fileTypeError')
      console.log('fileType  Error')
    }
  }
}

const handleKeydown = (e) => {
  if (e.target.timeout) 
    clearTimeout(e.target.timeout); 

  e.target.timeout = setTimeout(() => {
    let value = e.target.value
    if (props.reg) {
      if (!props.reg.test(value) && !props.dataConfirm) {
        e.target.classList.remove("input-info")
        e.target.classList.add("input-error")
        e.target.parentNode.classList.add("tooltip-error")
      } else {
        e.target.classList.remove("input-error")
        e.target.classList.add("input-info")
        e.target.parentNode.classList.remove("tooltip-error")
      }
    }
    if (props.dataConfirm) {
      if ( props.dataConfirm !== props.data) {
          e.target.classList.remove("input-info")
          e.target.classList.add("input-error")
          e.target.parentNode.classList.add("tooltip-error")
      } else {
          e.target.classList.remove("input-error")
          e.target.classList.add("input-info")
          e.target.parentNode.classList.remove("tooltip-error")
      }
    }
  }, 1000); // delay

}
</script>

<style lang="css" scoped>
/* .input--info {
  @apply p-input p-input-bordered p-input-info;
  background-color: #cffafe;
}

.input--error {
  @apply p-input p-input-bordered p-input-error;
  background-color: #fce4e4;
}

.tooltip--error {
  @apply p-tooltip p-tooltip-open p-tooltip-bottom p-tooltip-error;

  &:before,
  &:after {
    opacity: 1;
  }
}

input {
  @apply p-input p-input-bordered;
} */
</style>