const error = ref(null)
const isPending = ref(false)

const useSignup = (url:string) => {

  const signup = async (email:string, password:string, name:string) => {

    let userId :string, token :string, expiryDate :string
    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          name: name,
        }),
      })

      if (res.status !== 200 && res.status !== 201) {
        const resData = await res.json()
        throw new Error('创建用户失败!', resData.message)
      }

      const resData = await res.json()
      console.log('resData: ', resData)
      const remainingMilliseconds = 24 * 60 * 60 * 1000
      expiryDate = new Date(new Date().getTime() + remainingMilliseconds).toString()
      userId = resData.userId
      token = resData.token
      error.value = null
      isPending.value = false
      return { userId, token, expiryDate }
    } catch (err:any) {
      console.log(err.message)
      error.value = err.message
      isPending.value = false
    }

  }

  return { error, signup, isPending }
}
export default useSignup
