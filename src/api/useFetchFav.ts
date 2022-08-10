import { createFetch } from '@vueuse/core'



export const useFetchFav = createFetch({
  baseUrl: import.meta.env.VITE_LOCATION_ORIGIN, // 基础路由
  options: {
    immediate: true, // 是否在使用时自动运行 (推荐手动运行)
    timeout: 30000, // 请求过期时间
    // 在请求前修改配置，如：注入 token 值
    async beforeFetch({ options }) {

      const state = $(useSession())
      if (!state.token) {
        throw new Error(
          `Error happened in useFetch, token is ${
            state.token ?? null
          }, baseUrl is ${import.meta.env.VITE_FAV_URL ?? null}`
        )
      }
      options.headers.Authorization = `Bearer ${state.token}`

      return { options }
    },
    // 在请求后处理数据，如：拦截错误、处理过期
    async afterFetch({ data, response }) {
      // code...
      if (response.status !== 200 && response.status !== 201) {
        const resData = await data.json()
        throw new Error('Failed to fetch dates.' + ' ' + resData.message)
      }
      return { data, response }
    },
    // 请求错误
    async onFetchError({ data, error }) {
      // const resData = await JSON.parse(data)
      console.log(data.message)
      return { data, error }
    },
  },
  // fetchOptions: {
  // //   mode: 'cors',
  //   //credentials: 'include', // 请求时携带 cookie 值
  // },
})
