import { createFetch } from '@vueuse/core'

const error = $ref(null)
const isPending = $ref(false)
const { userId, token } = $(useStore())
const baseUrl = 'http://localhost:8080'

const useDocument = (url) => {
    const getAllDocs = async (getAllDocsUrl) => {
        isPending = true
        error = null
        const docs = $ref(null)
        // console.log('in useDocument token: ', token)
        await fetch(getAllDocsUrl + userId, {
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
    const useFetchDocsAll = createFetch({
        baseUrl: baseUrl, // 基础路由
        options: {
          immediate: true, // 是否在使用 useMyFetch 时自动运行 (推荐手动运行)
          timeout: 30000, // 请求过期时间
          // 在请求前修改配置，如：注入 token 值
          async beforeFetch({ options }) {
            const { token } = $(useStore())
            options.headers.Authorization = `Bearer ${ token }`
      
            return { options }
          },
          // 在请求后处理数据，如：拦截错误、处理过期
          afterFetch({ data, response }) {
            // code...
            if (response.status !== 200) {
                throw new Error('Failed to fetch posts.')
            }

            return { data, response }
          },
          // 请求错误
          onFetchError({ data, error }) {
            console.error(error)
            return { data, error }
          },
        },
        // fetchOptions: {
        // //   mode: 'cors',
        //   //credentials: 'include', // 请求时携带 cookie 值
        // },
      })


    const addDoc = async (postData) => {
        isPending = true
        error = null

        const formData = new FormData()
        formData.append('title', postData.title)
        formData.append('author', postData.author)
        formData.append('isFav', postData.isFav)
        formData.append('userUid', postData.userUid)
        // formData.append('image', postData.image)

        await fetch(url, {
            method: 'POST',
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
                isPending = false
            })
    }
    const useFetchAddDoc = createFetch({
        baseUrl: baseUrl, // 基础路由
        options: {
          immediate: true, // 是否在使用 useMyFetch 时自动运行 (推荐手动运行)
          timeout: 30000, // 请求过期时间
          // 在请求前修改配置，如：注入 token 值
          async beforeFetch({ options }) {
            const { token } = $(useStore())
            options.headers.Authorization = `Bearer ${ token }`
      
            return { options }
          },
          // 在请求后处理数据，如：拦截错误、处理过期
          afterFetch({ data, response }) {
            // code...
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Creating a post failed!')
            } else {
                console.log('addDoc success')
            }
            return { data, response }
          },
          // 请求错误
          onFetchError({ data, error }) {
            console.error(error)
            return { data, error }
          },
        },
        // fetchOptions: {
        // //   mode: 'cors',
        //   //credentials: 'include', // 请求时携带 cookie 值
        // },
      })
    
    const getDoc = async (docId,page, order = 'createdAt') => {
        isPending = true
        error = null
        const doc = $ref(null)
        // console.log('in useDocument token: ', token)
        await fetch(url + docId, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error('Failed to fetch post.')
                }
                return res.json()
            })
            .then(resData => {

                doc = {
                    post: resData.post,
                    totalPost: resData.totalItem,
                }
                console.log('get doc: ', doc)
                isPending = false
            })
            .catch(err => {
                if (err) {
                    console.log(err)
                }
                isPending = false
                error = 'get post failed!'
            })

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
    const useFetchUpdateDoc = createFetch({
        baseUrl: baseUrl, // 基础路由
        options: {
          immediate: true, // 是否在使用 useMyFetch 时自动运行 (推荐手动运行)
          timeout: 30000, // 请求过期时间
          // 在请求前修改配置，如：注入 token 值
          async beforeFetch({ options }) {
            const { token } = $(useStore())
            options.headers.Authorization = `Bearer ${ token }`
      
            return { options }
          },
          // 在请求后处理数据，如：拦截错误、处理过期
          afterFetch({ data, response }) {
            // code...
            if (response.status !== 200 ) {
                console.log(response)
                throw new Error('Could not update the document')

            } else {
                console.log('Update the document')
            }
            return { data, response }
          },
          // 请求错误
          onFetchError({ data, error }) {
            console.error(error)
            return { data, error }
          },
        },
        // fetchOptions: {
        // //   mode: 'cors',
        //   //credentials: 'include', // 请求时携带 cookie 值
        // },
      })
    const deleteDoc = async (postId) => {
        isPending = true
        error = null

        await fetch(url + postId, {
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
    const useFetchDeleteDoc = createFetch({
        baseUrl: baseUrl, // 基础路由
        options: {
          immediate: true, // 是否在使用 useMyFetch 时自动运行 (推荐手动运行)
          timeout: 30000, // 请求过期时间
          // 在请求前修改配置，如：注入 token 值
          async beforeFetch({ options }) {
            const { token } = $(useStore())
            options.headers.Authorization = `Bearer ${ token }`
      
            return { options }
          },
          // 在请求后处理数据，如：拦截错误、处理过期
          afterFetch({ data, response }) {
            // code...
            if (response.status !== 200 && response.status !== 201) {
                throw new Error('Deleting a post failed!')
            } else {
                console.log('delete success')
            }
            return { data, response }
          },
          // 请求错误
          onFetchError({ data, error }) {
            console.error(error)
            return { data, error }
          },
        },
        // fetchOptions: {
        // //   mode: 'cors',
        //   //credentials: 'include', // 请求时携带 cookie 值
        // },
      })

    watchEffect(() => {
        if (error) {
            console.log('error:', error)
        }
    })

    return $$({ useFetchUpdateDoc,getDoc,getAllDocs, useFetchDocsAll,useFetchAddDoc,useFetchDeleteDoc,addDoc, updateDoc, deleteDoc, error, isPending })
}

export default useDocument