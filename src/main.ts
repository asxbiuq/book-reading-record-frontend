import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router/index.js'
import 'styles/tailwind.css'
import { createPinia } from 'pinia'
import 'animate.css'
import { setGlobalOptions } from 'vue-request'
import 'container-query-polyfill'
import { IonicVue } from '@ionic/vue';


setGlobalOptions({
  manual: false,
  // ...
})

const pinia = createPinia()



const  app = createApp(App).use(IonicVue).use(router).use(pinia)

router.isReady().then(() => {
  app.mount('#app');
});
