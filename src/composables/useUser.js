
const user = $ref(auth.currentUser)


// 监听用户身份更改变换,只需一个监听器
auth.onAuthStateChanged(_user => {
  console.log('User state change. Current user is:', _user)
  user = _user
});

const useUser = () => {
  return $$({ user }) 
}

export default useUser