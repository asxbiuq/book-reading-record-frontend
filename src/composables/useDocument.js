import useStore from 'store/index.js'

const error = $ref(null)
const isPending = $ref(false)
const { userId, token, expiryDate } = $(useStore())


const useDocument = (col, docId) => {

    const addDoc = async (postData) => {

        const formData = new FormData()
        formData.append('title', postData.title)
        formData.append('author', postData.author)
        formData.append('isFav', postData.isFav)
        formData.append('userUid', postData.userUid)
        // formData.append('image', postData.image)
        let url = 'http://localhost:8080/feed/post'
        let method = 'POST'

        fetch(url, {
            method: method,
            body: formData,
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
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
            })
    }

    const getDoc = async (page, order = 'createdAt') => {
        let docs
        // console.log('in useDocument token: ', token)
        await fetch('http://localhost:8080/feed/posts', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
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

            })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
                error = 'get posts failed!'
            })
        return { docs }
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

    const deleteDoc = async (postId) => {
        isPending = true
        error = null

        fetch('http://localhost:8080/feed/post/' + postId, {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('Deleting a post failed!');
                }
                return res.json();
            })
            .then(resData => {
                console.log('delete success')
                console.log('resData: ', resData);
                isPending = false
                error = null
            })
            .catch(err => {
                console.log(err);
                error = 'Deleting a post failed!'
            });
    }


    watchEffect(() => {
        if (error) {
            console.log('error:', error)
        }
    })

    return $$({ getDoc, addDoc, updateDoc, deleteDoc, error, isPending })
}

export default useDocument