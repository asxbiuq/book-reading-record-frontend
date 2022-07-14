import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import 'styles/tailwind.css'
import { createPinia } from 'pinia'
import 'animate.css';

const pinia = createPinia()

createApp(App).use(router).use(pinia).mount('#app')
