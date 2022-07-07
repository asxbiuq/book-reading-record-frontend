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
      <!-- <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-gray-500"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"
          />
        </svg> -->

      <div class="p-dropdown p-dropdown-left flex">
        <label tabindex="0" class="m-1 cursor-pointer"><i-eva:more-vertical-fill /></label>
        <ul
          tabindex="0"
          class="p-dropdown-content p-menu shadow  relative truncate top-20"
        >
          <li><a class=" py-2 active:bg-red-600" @click="handleDeleteComment">删除</a></li>
        </ul>
      </div>
    </span>
  </div>
  <p class="text-gray-600 py-4">
    {{ content }}
  </p>
</template>

<script setup>
defineProps(['user', 'avatar', 'time', 'content'])

const emits = defineEmits(['deleteComment'])

const handleDeleteComment = () => {
  emits('deleteComment')
}
</script>

<style></style>
