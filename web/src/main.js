import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import store from "@/store";
import router from "@/router/router";
import vueCookies from 'vue-cookies'

const vuetify = createVuetify({
    components,
    directives
})

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.use(store)
app.use(vueCookies, { expires: '1d' })
app.mount('#app')
