import {enCrypt,deCrypt} from '@/utils/cryptLocalStorage'

const key = import.meta.env.VITE_KEY



export const setLocal = (data:string) => {
  const cipherText = enCrypt(data,key)
  console.log('cipherText: ',cipherText)
  window.localStorage.setItem('post-bar-LocalStorage', cipherText)
}

export const getLocal = () => {
  let cipherText = window.localStorage.getItem('post-bar-LocalStorage');
  try {
    if (cipherText) {
      let originalText  = deCrypt(cipherText, key);
      console.log('originalText: ',originalText)
      return originalText
    } else {
      throw new Error("can not get localState");
    }
  } catch (error) {
    console.log(error)
  }
}

export const clearLocal = () => {
  window.localStorage.removeItem('post-bar-LocalStorage')
}

const useLocal = () => {
  return {
    setLocal,
    getLocal,
    clearLocal
  }
}

export default useLocal
