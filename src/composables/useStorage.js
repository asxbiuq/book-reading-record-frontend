import { storage } from '@/firebase/config'
import { ref } from "vue"
import getUser from "composables/getUser"
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import { getStorage, ref as fireRef, deleteObject } from "firebase/storage";


const { user } = $(getUser())
const isPending = $ref(false)
const error = $ref(null)
// let url = $ref(null)
const filePath = $ref(null)

const useStorage = () => {

    const uploadImage = async (file) => {
        isPending = true
        filePath = `covers/${user.uid}/${file.name}`
        const storageRef = fireRef(storage, filePath);
        try {
            //需要先上传,所以这里需要阻塞一下
            await uploadBytes(storageRef, file)
                .then((snapshot) => {
                    console.log('Uploaded file!')
                })
            const url = $(await getDownloadURL(storageRef)
                .then(url => {
                    console.log('Gated Uploaded file Url: ',url)
                    return url
                }))
            error = null
            isPending = false
            // return url
            return $$({ url })
        } catch (err) {
            console.log(err.message)
            error = err
        }
        
    }

    const deleteImage = async (filePath) => {
        isPending = true
        // filePath = `covers/${user.uid}/${file.name}`
        const desertRef = fireRef(storage, filePath);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully

            console.log(filePath, " is delete success")
            error = null
            isPending = false
        }).catch((err) => {
            // Uh-oh, an error occurred!
            console.log(err.message)
            error = err.message
        })
    }

    const uploadMusic = async (file) => {
        isPending = true
        filePath = `musics/${user.uid}/${file.name}`
        const storageRef = fireRef(storage, filePath);
        try {
            //需要先上传,所以这里需要阻塞一下
            await uploadBytes(storageRef, file)
                .then((snapshot) => {
                    console.log('Uploaded file!')
                })
            const url = $(await getDownloadURL(storageRef)
                .then(url => {
                    console.log('Gated Uploaded file Url: ',url)
                    return url
                }))
            error = null
            isPending = false
            // return url
            return $$({ url })
        } catch (err) {
            console.log(err.message)
            error = err
        }
        
    }
    const deleteMusic = async (filePath) => {
        isPending = true
        // filePath = `covers/${user.uid}/${file.name}`
        const desertRef = fireRef(storage, filePath);
        // Delete the file
        deleteObject(desertRef).then(() => {
            // File deleted successfully

            console.log(filePath, " is delete success")
            error = null
            isPending = false
        }).catch((err) => {
            // Uh-oh, an error occurred!
            console.log(err.message)
            error = err.message
        })
    }
    watchEffect(() => {
        console.log('error:', error)
    })

    return $$({  filePath, error, isPending,uploadImage, deleteImage,  uploadMusic, deleteMusic })
}

export default useStorage








