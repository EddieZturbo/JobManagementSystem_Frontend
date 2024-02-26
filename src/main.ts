import { createApp } from 'vue'
import i18n from './i18n'
import { createVuestic } from 'vuestic-ui'
import ElementUI from 'element-plus'
import axios from './axios'
import stores from './stores'
import router from './router'
import vuesticGlobalConfig from './services/vuestic-ui/global-config'
import App from './App.vue'

const app = createApp(App)

app.use(stores)
app.use(router)
app.use(ElementUI)
app.use(i18n)
app.use(createVuestic({ config: vuesticGlobalConfig }))
// app.config.globalProperties.$axios = axios
app.provide('$axios', axios)
app.provide('$router', router)

app.mount('#app')
