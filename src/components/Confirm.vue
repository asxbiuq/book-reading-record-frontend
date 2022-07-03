<template>
  <!-- 对话框组件 -->
  <teleport to="body">

    <transition name="confirm-fade">

      <div class="confirm " v-show="isModelOpen">
        <div class="confirm-wrapper drop-shadow-xl">
          <div class="confirm-content  overflow-hidden shadow-2xl border-2">

            <p class="text">{{ text }}</p>

            <div class="operate">
              <div class="operate-btn  hover:bg-stone-800 hover:text-white" @click="confirm">
                {{ confirmBtnText }}
              </div>
              <div class="operate-btn hover:bg-stone-800 hover:text-white" @click="cancel">
                {{ cancelBtnText }}
              </div>
            </div>

          </div>
        </div>
      </div>

    </transition>

  </teleport>
</template>

<script setup>
// 父组件传来的Props值为只读,无法更改
const props = defineProps({
  text: { type: String, default: '' },
  confirmBtnText: { type: String, default: '确定' },
  cancelBtnText: { type: String, default: '取消' },
  isModelOpen: { type: Boolean, default: false },
})




const emit = defineEmits(['confirm', 'cancel'])

const confirm = () => {
  emit('confirm')
  console.log('emit(confirm)')
}
// 取消
const cancel = () => {
  emit('cancel')
  console.log('emit(cancel)')
}
</script>

<style scoped lang="scss">
$color-background-d: rgba(87, 88, 88, 0.244);
$color-highlight-background: rgb(201, 199, 196);
$font-size-large: 1rem;
$color-text-l: 2rem;
$color-text: black;

.confirm {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 996;
  background-color: $color-background-d;

  &.confirm-fade-enter-active {
    animation: confirm-fadein .3s;

    .confirm-content {
      animation: confirm-zoom-in .3s;
    }
  }

  // &.confirm-fade-leave-active {
  //   animation: confirm-fadeout .3s;

  //   .confirm-content {
  //     animation: confirm-zoom-out .3s;
  //   }
  // }

  .confirm-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 997;

    .confirm-content {
      width: 270px;
      border-radius: 13px;
      background: $color-highlight-background;

      .text {
        padding: 19px 15px;
        line-height: 22px;
        text-align: center;
        font-size: $font-size-large;
        color: $color-text-l;
      }

      .operate {
        display: flex;
        align-items: center;
        text-align: center;
        font-size: $font-size-large;

        .operate-btn {
          flex: 1;
          line-height: 22px;
          padding: 10px 0;
          border-top: 1px solid $color-background-d;
          color: $color-text-l;

          &.left {
            border-right: 1px solid $color-background-d;
            color: $color-text;
          }
        }
      }
    }
  }

  @keyframes confirm-fadein {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes confirm-fadeout {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  @keyframes confirm-zoom-in {
    0% {
      transform: scale(0);
    }

    50% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

  @keyframes confirm-zoom-out {
    0% {
      transform: scale(1);
    }

    100% {
      transform: scale(0);
    }
  }
}
</style>