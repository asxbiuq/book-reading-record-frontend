
export const useAlertState = defineStore('alertState', () => {
  const alertState = $ref({ isOpenAlert: false, info: '发生了错误' })

  const open = (info='发生了错误',time=1000) => {
    alertState.info = info
    alertState.isOpenAlert = true
    setTimeout(()=>{
      alertState.isOpenAlert = false
      alertState.info = '发生了错误'
    },time)
  }
  watch($$(alertState), () => {
    console.log('alertState: ', alertState)
  })

  return $$({
    alertState,
    open
  })
})
