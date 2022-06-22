import { createFetch } from '@vueuse/core'


const useFetchDoc = (baseUrl, token) => {

  const useFetch_GetDocsAll = createFetch({
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

  const useFetch_AddDoc = createFetch({
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

  const useFetch_UpdateDoc = createFetch({
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
      afterFetch({ data, response }) {
        // code...
        if (response.status !== 200) {
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

  const useFetch_DeleteDoc = createFetch({
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

  const useFetch_GetDoc = createFetch({
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
    //  mode: 'cors',
    //  credentials: 'include', // 请求时携带 cookie 值
    // },
  })


  return $$({ useFetch_UpdateDoc, useFetch_GetDocsAll, useFetch_GetDoc, useFetch_AddDoc, useFetch_DeleteDoc })
}

export default useFetchDoc