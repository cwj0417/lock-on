import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'main',
    component: require('@/components/Main'),
    redirect: {
      name: 'search'
    },
    children: [
      {path: '/search', component: require('@/components/search'), name: 'search'},
      {path: '/quickReview', component: require('@/components/quickReview'), name: 'quickReview'},
      {path: '/explore', component: require('@/components/explore'), name: 'explore'},
      {path: '/review', component: require('@/components/review'), name: 'review'},
      {path: '/chart', component: require('@/components/chart'), name: 'chart'}
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
    path: '*',
    redirect: '/'
  }]
})
