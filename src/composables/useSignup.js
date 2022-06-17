const error = $ref(null)
const isPending = $ref(false)

const signup = (email, password, name) => {

    fetch('http://localhost:8080/auth/signup', {
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
          console.log('Error!');
          throw new Error('创建用户失败!');
        }
        return res.json()
      })
      .then(resData => {
        console.log('resData: ',resData)
        error = null
        isPending = false
      })
      .catch(err => {
        console.log(err.message);
        error = err.message
        isPending = false
      })
  }
const useSignup = () => {
    return $$({ error, signup, isPending })
}
export default useSignup  