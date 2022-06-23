const error = $ref(null)
const isPending = $ref(false)


const useDocument = (url, userId, token) => {

    const getAllDocs = async (getAllDocsUrl) => {
        isPending = true
        error = null
        const docs = $ref(null)

        try {
            const res = await fetch(getAllDocsUrl + userId, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (res.status !== 200) {
                const resData = await res.json()
                throw new Error('Failed to fetch posts.', resData.message)
            }
            const resData = await res.json()
            docs = {
                posts: resData.posts,
                totalPosts: resData.totalItems,
            }
            console.log('get docs: ', docs)
            isPending = false
        } catch (err) {
            console.log(err)
            isPending = false
            error = err.message
        }

        return $$({ docs })
    }

    const addDoc = async (postData) => {
        isPending = true
        error = null

        const formData = new FormData()
        formData.append('title', postData.title)
        formData.append('author', postData.author)
        formData.append('isFav', postData.isFav)
        formData.append('userUid', postData.userUid)
        formData.append('image', postData.image)
        try {
            const res = await fetch(url, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (res.status !== 200 && res.status !== 201) {
                const resData = await res.json()
                throw new Error('Creating a post failed!', resData.message)
            }
            console.log('Creating a post success!')
            isPending = false
        } catch (err) {
            console.log(err)
            error = err.message
            isPending = false
        }
    }

    const getDoc = async (docId, page, order = 'createdAt') => {
        isPending = true
        error = null
        const doc = $ref(null)
        // console.log('in useDocument token: ', token)
        try {
            const res = await fetch(url + docId, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (res.status !== 200) {
                const resData = await res.json()
                throw new Error('Failed to fetch post.',resData.message)
            }
            const resData = await res.json()
            doc = {
                post: resData.post,
                totalPost: resData.totalItem,
            }
            isPending = false
        } catch (err) {
            console.log(err)
            isPending = false
            error = err.message
        }
        
        return $$({ doc })
    }

    const updateDoc = async (postId, updateData) => {
        isPending = true
        error = null

        try {
            await deleteDoc(postId)
            await addDoc(updateData)

            isPending = false
        } catch (err) {
            console.log(err.message)
            isPending = false
            error = 'could not update the document'
        }
    }

    const deleteDoc = async (postId) => {
        isPending = true
        error = null
        try {
            const res =         await fetch(url + postId, {
                method: 'DELETE',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
            if (res.status !== 200 && res.status !== 201) {
                const resData = await res.json()
                throw new Error('Deleting a post failed!',resData.message)
            }
            console.log('delete success')
            isPending = false
        } catch (err) {
            console.log(err)
            error = err.message
            isPending = false
        }
    }     
    
    watchEffect(() => {
        if (error) {
            console.log('error:', error)
        }
    })

    return $$({ getDoc, getAllDocs, addDoc, updateDoc, deleteDoc, error, isPending })
}

export default useDocument