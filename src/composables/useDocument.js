const error = $ref(null)
const isPending = $ref(false)
const { userId, token } = $(useStore())


const useDocument = (col, docId) => {

    const addDoc = async (postData) => {
        isPending = true
        error = null

        const formData = new FormData()
        formData.append('title', postData.title)
        formData.append('author', postData.author)
        formData.append('isFav', postData.isFav)
        formData.append('userUid', postData.userUid)
        // formData.append('image', postData.image)


        fetch('http://localhost:8080/feed/post', {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: 'Bearer ' + token
            }})
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Creating a post failed!')
                } else {
                    console.log('Creating a post success!')
                }
                isPending = false
            })
            .catch(err => {
                console.log(err)
                error = 'Creating a post failed!'
                isPending = false
            })
    }

    const getDoc = async (page, order = 'createdAt') => {
        isPending = true
        error = null
        const docs = $ref(null)
        // console.log('in useDocument token: ', token)
        await fetch('http://localhost:8080/feed/posts/' + userId, {
                method: 'GET',
                headers: {
                    Authorization: 'Bearer ' + token
                }})
                .then(res => {
                    if (res.status !== 200) {
                        throw new Error('Failed to fetch posts.')
                    }
                    return res.json()
                })
                .then(resData => {

                    docs = {
                        posts: resData.posts,
                        totalPosts: resData.totalItems,
                    }
                    console.log('get docs: ', docs)
                    isPending = false
                })
                .catch(err => {
                    if (err) {
                        console.log(err)
                    }
                    isPending = false
                    error = 'get posts failed!'
                })

        return $$({ docs })
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

        await fetch('http://localhost:8080/feed/post/' + postId, {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                })
                .then(res => {
                    if (res.status !== 200 && res.status !== 201) {
                        throw new Error('Deleting a post failed!')
                    }
                    return res.json()
                })
                .then(resData => {
                    console.log('delete success')
                    console.log('resData: ', resData)
                    isPending = false
                })
                .catch(err => {
                    console.log(err)
                    error = 'Deleting a post failed!'
                    isPending = false
                })
    }


    watchEffect(() => {
        if (error) {
            console.log('error:', error)
        }
    })

    return $$({ getDoc, addDoc, updateDoc, deleteDoc, error, isPending })
}

export default useDocument