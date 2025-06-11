import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'


document.documentElement.setAttribute('data-bs-theme', 'dark');

import './assets/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import store from './store'



const app = createApp(App)
app.use(store)
app.mount('#app')

 
 
