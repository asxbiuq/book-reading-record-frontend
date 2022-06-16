let error = $ref(null)
const isPending = $ref(false)

const useCollection = (db) => {
  // 因为我们可能会使用多个集合,所以生成一个全局的error没有意义,需要每次都生成一个

  const Collection = async (doc) => {
    error = null
    isPending = true

    try {


      isPending = false
    }
    catch (err) {
      console.log(err.message)
      error = 'could not get Collection'
      isPending = false
    }
  }


  return $$({ error, isPending, Collection })
}

export default useCollection