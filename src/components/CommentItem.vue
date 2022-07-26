<script lang="ts" setup>
interface Props {
  user: string
  avatar: string
  time: string
  content: string
}
const {
  user = '匿名用户',
  avatar = 'https://images-na.ssl-images-amazon.com/images/I/81WcnNQ-TBL.jpg',
  time = '未知时间',
  content = '',
} = defineProps<Props>()

const emits = defineEmits(['deleteComment'])

const handleDeleteComment = () => {
  emits('deleteComment')
}
</script>
<template>
  <div class="flex">
    <!-- 即使在 public 文件夹下，也需要使用 / 绝对路径引用它下面的文件，省略 Public -->
    <img :src="avatar" alt="" class="w-12 h-12 mr-4 rounded-full" />
    <div>
      <p>{{ user }}</p>
      <p class="text-gray-600 text-sm">{{ time }}</p>
    </div>

    <!-- 菜单考右对齐 -->

    <span class="ml-auto">
      <div class="p-dropdown p-dropdown-left flex">
        <label tabindex="0" class="m-1 cursor-pointer"
          ><i-eva:more-vertical-fill
        /></label>
        <ul
          tabindex="0"
          class="p-dropdown-content p-menu shadow relative truncate top-20"
        >
          <li>
            <a
              class="py-2 hover:bg-red-400 bg-slate-200"
              @click="handleDeleteComment"
              >删除</a
            >
          </li>
        </ul>
      </div>
    </span>
  </div>
  <p class="text-gray-600 py-4">
    {{ content }}
  </p>
</template>

<style></style>
