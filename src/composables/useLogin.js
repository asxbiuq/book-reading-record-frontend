const error = $ref(null)
const isPending = $ref(false)


const useLogin = (url) => {

  const login = async (email, password) => {
    error = null
    isPending = true
    let token, userId, expiryDate

    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.')
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!')
          throw new Error('Could not authenticate you!')
        }
        return res.json()
      })
      .then(resData => {
        token = resData.token
        userId = resData.userId
        const remainingMilliseconds = 60 * 60 * 1000
        expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        )  

        

        // console.log('resData: ',resData)
        error = null
        isPending = false
      })
      .catch(err => {
        console.log(err.message)
        error = 'Incorrect login credentials'
        isPending = false
      })
      return { token, userId, expiryDate }
  }



  return $$({ error, login, isPending })
}

export default useLogin