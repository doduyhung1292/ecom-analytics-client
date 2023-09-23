import './assets/main.css'
import 'ant-design-vue/dist/reset.css';
import Vuex from 'vuex'

import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Vuex)
app.mount('#app')
