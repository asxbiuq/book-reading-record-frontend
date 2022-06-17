let userId
let token
let expiryDate
// 先判断是否有先前留下来的状态
const loadStorage = () => {
  if (localStorage.getItem('userId')) {
    userId = useStorage('userId', localStorage.getItem('userId'))
    token = useStorage('token', localStorage.getItem('token'))
    expiryDate = useStorage('expiryDate', localStorage.getItem('expiryDate'))
  } else {
    userId = useStorage('userId', localStorage.setItem('userId', null))
    token = useStorage('token', localStorage.setItem('token', null))
    expiryDate = useStorage('expiryDate', localStorage.setItem('expiryDate', null))
  }
}
loadStorage()

const useStore = () => {
  return $$({ userId, token, expiryDate })
}

watchEffect(() => {
  console.log('token is change, now is :  ', token.value)
})

export default useStore