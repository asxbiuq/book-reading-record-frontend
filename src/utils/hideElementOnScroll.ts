import { HtmlHTMLAttributes } from 'vue'

const hideElementOnScroll = (el: HTMLElement) => {
  let prevScrollpos = window.pageYOffset

  window.addEventListener('scroll', () => {
    let currentScrollPos = window.pageYOffset
    if (prevScrollpos > currentScrollPos) {
      el.style.opacity = '100%'
      // el.style.top = "0"
    } else {
      // el.classList.toggle("0")
      el.style.opacity = '0'
      // el.style.top = "-100%"
    }
    prevScrollpos = currentScrollPos
  })
}
export default hideElementOnScroll
