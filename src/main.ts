import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import 'styles/tailwind.css'
import { createPinia } from 'pinia'
import 'animate.css'
import { setGlobalOptions } from 'vue-request';

setGlobalOptions({
  manual: true,
  // ...
})

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
