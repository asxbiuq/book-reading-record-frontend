import { createFetch } from '@vueuse/core'

const useFetch = (baseUrl, token) => {
  const useGets = createFetch({
    baseUrl: baseUrl, // 基础路由
    options: {
      immediate: true, // 是否在使用时自动运行 (推荐手动运行)
      timeout: 30000, // 请求过期时间
      // 在请求前修改配置，如：注入 token 值
      async beforeFetch({ options }) {
        options.headers.Authorization = `Bearer ${token}`

        return { options }
      },
      // 在请求后处理数据，如：拦截错误、处理过期
      async afterFetch({ data, response }) {
        // code...
        if (response.status !== 200) {
          const resData = await data.json()
          throw new Error('Failed to fetch dates.' + ' ' + resData.message)
        }
        return { data, response }
      },
      // 请求错误
      async onFetchError({ data, error }) {
        const resData = await JSON.parse(data)
        console.log(resData.message)
        return { data, error }
      },
    },
    // fetchOptions: {
    // //   mode: 'cors',
    //   //credentials: 'include', // 请求时携带 cookie 值
    // },
  })

  const useGet = createFetch({
    baseUrl: baseUrl, // 基础路由
    options: {
      immediate: true, // 是否在使用 useMyFetch 时自动运行 (推荐手动运行)
      timeout: 30000, // 请求过期时间
      // 在请求前修改配置，如：注入 token 值
      async beforeFetch({ options }) {
        options.headers.Authorization = `Bearer ${token}`

        return { options }
      },
      // 在请求后处理数据，如：拦截错误、处理过期
      async afterFetch({ data, response }) {
        // code...
        if (response.status !== 200 && response.status !== 201) {
          const resData = await data.json()
          console.log(resData)
          throw new Error('Failed to fetch data.' + ' ' + resData.message)
        } else {
          console.log('addDoc success')
        }
        return { data, response }
      },
      // 请求错误
      async onFetchError({ data, error }) {
        const resData = await JSON.parse(data)
        console.log(resData.message)
        return { data, error }
      },
    },
    // fetchOptions: {
    // //   mode: 'cors',
    //   //credentials: 'include', // 请求时携带 cookie 值
    // },
  })

  const usePut = createFetch({
    baseUrl: baseUrl, // 基础路由
    options: {
      immediate: true, // 是否在使用 useMyFetch 时自动运行 (推荐手动运行)
      timeout: 30000, // 请求过期时间
      // 在请求前修改配置，如：注入 token 值
      async beforeFetch({ options }) {
        options.headers.Authorization = `Bearer ${token}`

        return { options }
      },
      // 在请求后处理数据，如：拦截错误、处理过期
      async afterFetch({ data, response }) {
        // code...
        if (response.status !== 200) {
          const resData = await data.json()
          throw new Error(
            'Could not update' + ' ' + resData.message
          )
        } else {
          console.log('Update the document')
        }
        return { data, response }
      },
      // 请求错误
      async onFetchError({ data, error }) {
        const resData = await JSON.parse(data)
        console.log(resData.message)
        return { data, error }
      },
    },
    // fetchOptions: {
    // //   mode: 'cors',
    //   //credentials: 'include', // 请求时携带 cookie 值
    // },
  })

  const useDelete = createFetch({
    baseUrl: baseUrl, // 基础路由
    options: {
      immediate: true, // 是否在使用 useMyFetch 时自动运行 (推荐手动运行)
      timeout: 30000, // 请求过期时间
      // 在请求前修改配置，如：注入 token 值
      async beforeFetch({ options }) {
        options.headers.Authorization = `Bearer ${token}`

        return { options }
      },
      // 在请求后处理数据，如：拦截错误、处理过期
      async afterFetch({ data, response }) {
        // code...
        if (response.status !== 200 && response.status !== 201) {
          const resData = await data.json()
          throw new Error('delete failed' + ' ' + resData.message)
        } else {
          console.log('delete success')
        }
        return { data, response }
      },
      // 请求错误
      async onFetchError({ data, error }) {
        const resData = await JSON.parse(data)
        console.log(resData.message)
        return { data, error }
      },
    },
    // fetchOptions: {
    // //   mode: 'cors',
    //   //credentials: 'include', // 请求时携带 cookie 值
    // },
  })

  const usePost = createFetch({
    baseUrl: baseUrl, // 基础路由
    options: {
      immediate: true, // 是否在使用 useMyFetch 时自动运行 (推荐手动运行)
      timeout: 30000, // 请求过期时间
      // 在请求前修改配置，如：注入 token 值
      async beforeFetch({ options }) {
        options.headers.Authorization = `Bearer ${token}`
        options.headers.ContentType = 'application/json'
        return { options }
      },
      // 在请求后处理数据，如：拦截错误、处理过期
      async afterFetch({ data, response }) {
        // code...
        if (response.status !== 200 && response.status !== 201) {
          const resData = await data.json()
          throw new Error('create failed' + ' ' + resData.message)
        } else {
          console.log('create success')
        }
        return { data, response }
      },
      // 请求错误
      async onFetchError({ data, error }) {
        const resData = await JSON.parse(data)
        console.log(resData.message)
        return { data, error }
      },
    },
    // fetchOptions: {
    // //   mode: 'cors',
    //   //credentials: 'include', // 请求时携带 cookie 值
    // },
  })



  return $$({
    useGets,
    useGet,
    usePost,
    useDelete,
    usePut,
  })
}

export default useFetch
