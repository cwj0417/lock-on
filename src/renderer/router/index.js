import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'main',
    component: require('@/components/Main'),
    redirect: {
      name: 'wordInput'
    },
    children: [
      {path: '/wordInput', component: require('@/components/wordinput'), name: 'wordInput'},
      {path: '/explore', component: require('@/components/explore'), name: 'explore'},
      {path: '/review', component: require('@/components/review'), name: 'review'},
      {path: '/chart', component: require('@/components/chart'), name: 'chart'}
    ]
  }, {
    path: '/config',
    name: 'config',
    component: require('@/components/config')
  }, {
    path: '*',
    redirect: '/'
  }]
})
