const error = $ref(null)
const isPending = $ref(false)

const useDocument = (col, docId) => {



    const addDoc = async () => {

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


        return $$({ data })
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


    watchEffect(() => {
        console.log('error:', error)
    })

    return $$({ getDoc, addDoc, updateDoc, deleteDoc, error, isPending })
}

export default useDocument