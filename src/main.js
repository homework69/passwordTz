import { createApp } from 'vue'
import { createPinia } from "pinia";
import '@/assets/style/main.scss'
import App from './App.vue'
import VueCookies from 'vue-cookies'

const app = createApp(App)
const pinia = createPinia()


app.use(pinia)
app.use(VueCookies, { expires: '7d'})

app.mount('#app')