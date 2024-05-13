import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'

import 'bootswatch/dist/lux/bootstrap.min.css'

createApp(App)
.use(router)
.mount('#app')
