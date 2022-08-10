import RC4 from 'crypto-js/rc4'
import CryptoJS from 'crypto-js'

/** 设置本地存储 */
export function setLocalState(key:string,value:string,sec:string) {
  let cipherText  = RC4.encrypt(JSON.stringify(value), sec).toString()
  window.localStorage[key] = cipherText;
}

/** 获取本地存储 */
export function getLocalState(key:string,sec:string) {
  let cipherText = window.localStorage.getItem(key);
  if (cipherText) {
    let bytes  = CryptoJS.AES.decrypt(cipherText, sec);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
  } else {
    throw new Error("can not get localState");
  }
}

export function enCrypt(value:string,key:string) {
  let cipherText  = RC4.encrypt(value, key).toString()
  return cipherText
}

export function deCrypt(cipherText:string,sec:string) {
  if (cipherText) {
    let bytes  = RC4.decrypt(cipherText, sec);
    let originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText
  } else {
    throw new Error("can not get localState");
  }
}

