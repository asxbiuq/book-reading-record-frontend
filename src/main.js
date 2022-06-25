import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import 'styles/tailwind.scss'

createApp(App)
  .use(router)
  .mount('#app')
