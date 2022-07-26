export const useLoading = defineStore('loadingState', () => {
  const loadingState = $ref({ isLoading: false, info: '' })

  const open = (info = '正在加载中...', time = 5000) => {
    loadingState.info = info
    loadingState.isLoading = true
    setTimeout(() => {
      loadingState.isLoading = false
      loadingState.info = ''
    }, time)
  }

  const close = () => {
    loadingState.info = ''
    loadingState.isLoading = false
  }

  return $$({
    loadingState,
    open,
    close,
  })
})
