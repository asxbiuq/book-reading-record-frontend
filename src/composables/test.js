function de(fn, delay) {
  let timer
  return function () {
    let a = arguments
    if (timer) {
      clearTimeout(timer)
    }
    setTimeout(() => {
      fn().apply(this, a)//用的是apply,因为a是类数组
    }, delay)
  }
}
function throttle(fun, time) {
  let t1 = 0 //初始时间
  return function () {
    let t2 = new Date() //当前时间
    if (t2 - t1 > time) {
      fun.apply(this, arguments)
      t1 = t2
    }
  }
}


throttle(console.log('32165'),3000)