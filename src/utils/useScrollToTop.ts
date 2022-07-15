import { Ref } from 'vue'

let isScrollToTop = ref(false)

const useScrollToTop = () => {
  watch(isScrollToTop, () => {
    if (isScrollToTop) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
      isScrollToTop.value = false
    }
  })
  return isScrollToTop
}

export default useScrollToTop
