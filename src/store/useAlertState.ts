import { defineStore } from 'pinia'


export const useAlertState = defineStore('alertState',  () => {

  const alertState = $ref({isOpenAlert:false,info:'发生了错误'})

  watch($$(alertState),()=>{
    console.log('alertState: ',alertState)
  })

  return $$({
    alertState,
  })
})
