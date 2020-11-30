import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'main',
        component: require('@/components/Main'),
        redirect: {
            name: 'homepage'
        },
        children: [
            {path: '/homepage', component: require('@/components/homepage'), name: 'homepage'},
            {path: '/search', component: require('@/components/search'), name: 'search'},
            {path: '/quickReview', component: require('@/components/quickReview'), name: 'quickReview'},
            {path: '/review/:type/:id', component: require('@/components/review'), name: 'review'},
            {path: '/chart', component: require('@/components/chart'), name: 'chart'},
            {path: '/url/:protocal/:url', component: require('@/components/url'), name: 'url'},
            {path: '/view/:type/:id', component: require('@/components/view'), name: 'wordView'}
        ]
    }, {
        path: '/config',
        name: 'config',
        component: require('@/components/config')
    }, {
        path: '/mini',
        name: 'mini',
        component: require('@/components/mini')
    }, {
        path: '/player',
        name: 'player',
        component: require('@/components/player')
    }, {
        path: '*',
        redirect: '/'
    }]
})
