
export const getUser = (email:string, password:string) => {
  return axios.post('http://localhost:8080/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify({
    //   email: email,
    //   password: password,
    // }),
    data: JSON.stringify({
      email: email,
      password: password,
    }),
  })
}