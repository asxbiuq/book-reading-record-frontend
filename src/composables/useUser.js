const { userId } = $(useLogin())

const useUserId = () => {
  return $$({ userId })
}

export default useUserId