import { ref } from 'vue'
import { db } from '@/firebase/config'
import { getAuth } from 'firebase/auth';
import { doc, setDoc, getDoc as getDocRaw, addDoc as addDocRaw } from "firebase/firestore";
import getUser from './getUser';
import { collection, query, where, getDocs } from "firebase/firestore";
import { getDoc } from "firebase/firestore";

let error = $ref(null)
const isPending = $ref(false)

const useCollection = (col) => {
  // 因为我们可能会使用多个集合,所以生成一个全局的error没有意义,需要每次都生成一个

  const addDoc = async (docData) => {
    error = null
    isPending = true

    try {
      const auth = getAuth()
      const { user } = $(getUser())


      console.log('uid', user.uid)
      const playlist = Math.floor(Math.random() * 1000000000000000).toString()
      console.log('playlist:', playlist)

      // await addDocRaw(collection(db, col), { ...docData, playlistId: playlist })
      await setDoc(doc(db, col, playlist),{ ...docData, playlistId: playlist })
      await addDocRaw(collection(db, 'users'), {
        userId: user.uid,
        playlistId: [playlist]
      })
      // 向playlists里添加playlist
      // await setDoc(doc(db, col, user.uid), docData)
      //并将该playlist添加到users里
      // await setDoc(doc(db, 'users', user.uid), {
      //   userId: user.uid,
      //   playlist: [playlist]
      // })

      isPending = false
    }
    catch (err) {
      console.log(err.message)
      error = 'could not send the message'
      isPending = false
    }
  }
  const getDoc = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const uid = user.uid;
    const docRef = doc(db, col, uid + '');
    const docSnap = await getDocRaw(docRef);

    return docSnap
  }

  return $$({ error, addDoc, isPending, getDoc })
}

export default useCollection