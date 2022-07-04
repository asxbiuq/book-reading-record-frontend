import { defineStore } from 'pinia'

export const useBook = defineStore('book', () => {
  const book = $ref({
    id: 0,
    name: '',
  })

  const changeBook = () => {
    book.name = 'book two'
  }

  watchEffect(()=>{
    console.log(book)
  })

  return $$({
    book,
    changeBook,
  })
})
