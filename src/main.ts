import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { appRouter } from './router'
import './styles/base.css'

const redirect = sessionStorage.redirect
delete sessionStorage.redirect

createApp(App).use(createPinia()).use(appRouter).mount('#app')

if (redirect) {
  const url = new URL(redirect)
  const path = url.pathname + url.search + url.hash
  appRouter.push(path)
}
