<template>
  <div class="comment-layout">
    <RouterView v-slot="{ Component }">
      <template v-if="Component">
        <!-- <Transition mode="out-in"> -->
        <!-- <KeepAlive> -->
        <Suspense>
          <!-- 主要内容 -->
          <component :is="Component"></component>

          <!-- 加载中状态 -->
          <template #fallback> 正在加载... </template>
        </Suspense>
        <!-- </KeepAlive> -->
        <!-- </Transition> -->
      </template>
    </RouterView>
  </div>
</template>
<style>
.comment-layout {
  @apply flex justify-center items-center relative top-24 flex-col;
}
</style>
