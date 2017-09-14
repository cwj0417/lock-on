import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.use(iView)

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

/* eslint-disable no-new */
new Vue({
    components: {App},
    router,
    store,
    template: '<App/>'
}).$mount('#app')
