import getDocRef from 'composables/getDocRef'
import { getDoc as getDocRaw, updateDoc as updateDocRaw } from 'firebase/firestore'
import { db } from '@/firebase/config'
import { auth } from '@/firebase/config'
import getPlaylistIds from './getPlaylistsIds'
import { doc, deleteDoc as deleteDocRaw } from "firebase/firestore";
import { ref, watchEffect } from "vue";
import { collection, onSnapshot } from "firebase/firestore"
import { reactive } from "vue";
import { query, where, orderBy } from "firebase/firestore";
import { getDocs } from "firebase/firestore";


const error = $ref(null)
const isPending = $ref(false)
const useDocument = (col, docId) => {

    // 状态 与 行为 相分离
    let docRef = getDocRef(col, docId)

    const deleteDoc = async () => {
        isPending = true
        error = null

        try {
            await deleteDocRaw(doc(db, col, docId));
            const res = await docRef.delete()
            isPending = false
            return res
        } catch (err) {
            console.log(err.message)
            isPending = false
            error = 'could not delete the document'
        }
    }

    const updateDoc = async (PlaylistId, updates) => {
        isPending = true
        error = null
        const uid = auth.currentUser.uid

        const PlaylistRef = doc(db, 'playlists', PlaylistId)

        try {
            const res = await updateDocRaw(PlaylistRef, updates)
            isPending = false
            return res
        } catch (err) {
            console.log(err.message)
            isPending = false
            error = 'could not update the document'
        }
    }

    const getDocData = async () => {
        isPending = true
        error = null
        const docSnap = await getDocRaw(docRef);
        const docData = $ref(null)


        if (docSnap.exists()) {
            docData = docSnap.data()
            isPending = false
            // console.log(docData.userId)
        } else {
            isPending = false
            error = 'that document does not exist'
            console.log("No such document!");
        }

        return $$({ docData })
    }

    const getDoc = async (col, que, order = 'createdAt') => {

        const data = reactive([])

        try {
          const q = query(collection(db, col), where(...que), orderBy(order));
      
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            data.push({ ...doc.data(), id: doc.id })
            error = null
          })
        } catch (err) {
          console.log(err)
          error = 'could not fetch data (getDoc.js)'
        }
      
        // 追踪Snapshot状态和依赖,在其变更时关闭并重新运行
        // watchEffect((onInvalidate) => {
        //   onInvalidate(() => unsub())
        // })
      
        //返回reactive类型数据
        // console.log(data)
        return $$({ data })
      }

    // 追踪Snapshot状态和依赖,在其变更时关闭并重新运行,这样可以防止内存溢出

    watchEffect(() => {
        console.log('error:', error)
    })
    
    return $$({ error, isPending, deleteDoc, updateDoc, getDocData,getDoc })
}

export default useDocument