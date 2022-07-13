interface resData {
  token:string,
  userId:string,
  name:string,
  expiryDate:string
}


const error = ref(null)
const isPending = ref(false)
let resData :resData = {
  token:'',
  userId:'',
  name:'',
  expiryDate:''
}

const useLogin = (url:string) => {
  
  const login = async (email:string, password:string) => {
    error.value = null
    isPending.value = true

    // let token, userId, expiryDate

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })

      if (res.status !== 200 && res.status !== 201) {
        const resData :{message:string}= await res.json()
        throw new Error(resData.message)
      }

      resData = await res.json()
      // token = resData.token
      // userId = resData.userId
      // const remainingMilliseconds = 24 * 60 * 60 * 1000
      // expiryDate = new Date(new Date().getTime() + remainingMilliseconds)

      error.value = null
      isPending.value = false
      return  resData 
    } catch (err:any) {
      console.log(err.message)
      error.value = err.message
      isPending.value = false
    }
  }


  return { error, login, isPending }
}


export default useLogin
