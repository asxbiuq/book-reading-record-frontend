

export const useLoadingState = defineStore('loadingState', () => {
  const loadingState = $ref({isLoading:false})

  const state = $(useLocalState())


  watchEffect(()=>{
    loadingState.isLoading = state.isPending
  })
  watch($$(loadingState), () => {
    console.log('isLoading: ', loadingState.isLoading)
  })
  return $$({
    loadingState,
  })
})
