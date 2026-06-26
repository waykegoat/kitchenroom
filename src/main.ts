import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { appRouter } from './router'
import './styles/base.css'

createApp(App).use(createPinia()).use(appRouter).mount('#app')
