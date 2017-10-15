import Vue from 'vue'
import App from './App'
import VueI18n from 'vue-i18n'
import axios from 'axios'

import router from './router'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'
import messages from './i18n'

Vue.use(VueI18n)
Vue.use(iView, {
    i18n: (key, value) => i18n.vm._t(key, value)
})

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

axios.interceptors.response.use(function (response) {
    if (response.status === 200) {
        return response.data
    }
    return response
}, function (error) {
    return Promise.reject(error)
})

Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

const i18n = new VueI18n({
    locale: 'cn',
    messages
})

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    i18n,
    template: '<App/>'
}).$mount('#app')
