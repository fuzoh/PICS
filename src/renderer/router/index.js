import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      path: '/firstStart',
      name: 'firstStart',
      component: require('@/components/FirstStart').default
    },
    {
      path: '/configure',
      name: 'configure',
      component: require('@/components/ConfigureApp/ConfigureApp').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
