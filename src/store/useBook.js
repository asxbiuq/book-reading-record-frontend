import { defineStore } from 'pinia'

export const useBook = defineStore('book', () => {
  const book = $ref({
    id: 0,
    name: '',
  })

  const changeBook = () => {
    book.name = 'book two'
  }

  watch(book,()=>{
    console.log('book: ',book)
  })

  return $$({
    book,
    changeBook,
  })
})
