import { createGlobalState, useStorage } from '@vueuse/core'

export const useState = createGlobalState(() =>
  useStorage('vue-use-locale-storage', {
    isPending: false,
    userId: null,
    token: null,
    expiryDate: null,
    name:''
  })
)
