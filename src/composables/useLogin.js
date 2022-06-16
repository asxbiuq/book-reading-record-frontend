const error = $ref(null)
const isPending = $ref(false)

const login = (email, password) => {
  error = null
  isPending = true

  fetch('http://localhost:8080/auth/login', {
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
      console.log(resData)

      localStorage.setItem('token', resData.token)
      localStorage.setItem('userId', resData.userId)
      const remainingMilliseconds = 60 * 60 * 1000
      const expiryDate = new Date(
        new Date().getTime() + remainingMilliseconds
      )
      localStorage.setItem('expiryDate', expiryDate.toISOString());

      error = null
      isPending = false
    })
    .catch(err => {
      console.log(err.message)
      error = 'Incorrect login credentials'
      isPending = false
    })
}
// const login = async (email, password) => {
//   error = null
//   isPending = true

//   try {
//     const auth = getAuth()
//     const res = await signInWithEmailAndPassword(auth, email, password)
//     error = null
//     isPending = false
//     return res
//   }
//   catch (err) {
//     console.log(err.message)
//     error = 'Incorrect login credentials'
//     isPending = false
//   }
// }

const useLogin = () => {
  return $$({ error, login, isPending })
}

export default useLogin