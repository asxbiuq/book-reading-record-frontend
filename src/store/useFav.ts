

export const useFav = defineStore('favs', () => {


  const { deletePost, UpdatePost } = $(usePost())

  const favs : Post[] = $ref([])

  const gets =async() => {
    const { error, data } = $(await getFav('fav').json())
    assign(favs,data.posts)
  }

  const unfav = async(book:Post) => {
    await UpdatePost(book)
    remove(favs,(fav)=>{
      return fav._id ===book._id
    })
  }
  return $$({
    gets,
    favs,
    unfav
  })
})
