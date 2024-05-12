import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import "./assets/scss/main.scss"
import VueGoogleMaps from '@fawmi/vue-google-maps'

import { Quasar } from 'quasar'

import '@quasar/extras/roboto-font/roboto-font.css'
import '@quasar/extras/material-icons/material-icons.css'
import '@quasar/extras/material-icons-round/material-icons-round.css'
import '@quasar/extras/mdi-v7/mdi-v7.css'
import '@quasar/extras/fontawesome-v5/fontawesome-v5.css'
import '@quasar/extras/ionicons-v4/ionicons-v4.css'
import '@quasar/extras/bootstrap-icons/bootstrap-icons.css'
import 'quasar/src/css/index.sass'

import { createRouter, createWebHistory } from 'vue-router'


const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes: []
})

app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBVo380neE0YlE3Sy1ck8cF9fGCDJSkLjU',
    libraries: "visualization"
  },
})
app.use(router)
app.use(ElementPlus)
app.use(Quasar, {
    plugins: {}
})

app.mount('#app')