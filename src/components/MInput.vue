<template>
  <div :data-tip="dataTip">
    <input
      :type="type"
      :name="label"
      :value="data"
      :placeholder="placeholder"
      @keydown="handleKeydown($event)"
      @change="checkSelectedFile"
      @input="$emit('update:data', $event.target.value)"
    />
  </div>
</template>

<script setup>
const props = defineProps([
  'label',
  'reg',
  'data',
  'type',
  'size',
  'dataTip',
  'fileType',
  'placeholder',
  'dataConfirm',
  'inputStyle',
  'isPending'
])

const emits = defineEmits(['update:data', 'emit_file', 'fileTypeError'])


const checkSelectedFile = (e) => {
  if (props.type === 'file') {
    const selected = e.target.files[0]

    if (selected && props.fileType.includes(selected.type)) {
      e.target.classList.remove('input-error')
      e.target.classList.add('input-info')
      e.target.parentNode.classList.remove('tooltip-error')
      emits('emit_file', selected)
    } else {
      e.target.classList.remove('input-info')
      e.target.classList.add('input-error')
      e.target.parentNode.classList.add('tooltip-error')
      // emits('fileTypeError')
      console.log('fileType  Error')
    }
  }
}

const handleKeydown = (e) => {
  if (e.target.timeout) clearTimeout(e.target.timeout)

  e.target.timeout = setTimeout(() => {
    let value = e.target.value
    if (props.reg) {
      if (!props.reg.test(value) && !props.dataConfirm) {
        e.target.classList.remove('input-info')
        e.target.classList.add('input-error')
        e.target.parentNode.classList.add('tooltip-error')
      } else {
        e.target.classList.remove('input-error')
        e.target.classList.add('input-info')
        e.target.parentNode.classList.remove('tooltip-error')
      }
    }
    if (props.dataConfirm) {
      if (props.dataConfirm !== props.data) {
        e.target.classList.remove('input-info')
        e.target.classList.add('input-error')
        e.target.parentNode.classList.add('tooltip-error')
      } else {
        e.target.classList.remove('input-error')
        e.target.classList.add('input-info')
        e.target.parentNode.classList.remove('tooltip-error')
      }
    }
  }, 1000) // delay
}


</script>

<style scoped>
@layer components {
  .input-info {
    @apply p-input p-input-info rounded-xl w-full;
    background-color: #cffafe;
  }
  .input-error {
    @apply p-input p-input-error rounded-xl w-full;
    background-color: #fce4e4;
  }
  .tooltip-error {
    @apply p-tooltip p-tooltip-open p-tooltip-bottom p-tooltip-error;

    &:before,
    &:after {
      @apply z-20 opacity-100;
    }
  }

}
@tailwind components;
</style>
