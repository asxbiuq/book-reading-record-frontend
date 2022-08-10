import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import useSession from '@/store/useSession'

const routes = setupLayouts(generatedRoutes)
const state = useSession()

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'Signup' && !state.value.token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})
router.beforeEach((to, from, next) => {
  // 404页面
  if (!to.matched.length) {
    next({ name: '404page' })
  } else {
    next()
  }
})
// console.log(router)

export default router
