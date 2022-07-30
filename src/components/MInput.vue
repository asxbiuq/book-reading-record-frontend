<script lang="ts" setup>
const props = defineProps<{
  label?: string
  reg?: RegExp
  data?: string
  type: string
  size?: string
  dataTip: string
  fileType?: Array<string>
  placeholder?: string
  dataConfirm?: string
  inputStyle?: string
  isPending?: boolean
}>()

const emits = defineEmits(['update:data', 'emit_file', 'fileTypeError'])

const checkSelectedFile = (e: any) => {
  if (props.type === 'file' && e.target && props.fileType) {
    const selected = e.target.files[0]

    if (props.fileType.includes(selected.type)) {
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

const handleKeydown = (e: any) => {
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
  }, 500) // delay
}
</script>
<template>
  <div :data-tip="dataTip">
    <input
      :type="type"
      :name="label"
      :placeholder="placeholder"
      @keydown="handleKeydown($event)"
      @change="checkSelectedFile"
      :value="data"
      @input="$emit('update:data', $event.target.value)"
    />
  </div>
</template>
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
