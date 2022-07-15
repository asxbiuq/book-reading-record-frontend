import { defineStore } from 'pinia'

export const useGlobalState = defineStore('globalState', () => {
  const globalState = $ref({ isOpenAlert: false })

  watch($$(globalState), () => {
    console.log('globalState: ', globalState)
  })

  return $$({
    globalState,
  })
})
