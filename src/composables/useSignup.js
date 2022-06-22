const error = $ref(null)
const isPending = $ref(false)

const useSignup = (url) => {

  const signup = async (email, password, name) => {
    let userId, token,expiryDate

    await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(res => {
        // 错误处理
        if (res.status === 422) {
          throw new Error(
            "注册失败。确保注册信息尚未使用！"
          )
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!')
          throw new Error('创建用户失败!')
        }
        return res.json()
      })
      .then(resData => {
        console.log('resData: ', resData)
        const remainingMilliseconds = 24 * 60 * 60 * 1000
        expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        )  
        userId = resData.userId
        token = resData.token
        error = null
        isPending = false
      })
      .catch(err => {
        console.log(err.message)
        error = err.message
        isPending = false
      })
      return { userId, token,expiryDate } 
  }

  return $$({ error, signup, isPending })
}
export default useSignup  