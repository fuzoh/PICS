/* *****************************************
| router
|
| Declares all the routes of the application and the component to load for a specific route
*/



/* *****************************************
| IMPORTS
*/
import Vue from 'vue'
import Router from 'vue-router'

// initialize the router
Vue.use(Router)

// export the new router configurations
export default new Router({
  routes: [
    {
      // the home page, display all the pics
      path: '/',
      name: 'home',
      component: require('@/components/Home').default
    },
    {
      // display the details for one pics
      path: '/picsDetails',
      name: 'picsDetails',
      component: require('@/components/photo/PicsDetails').default
    },
    {
      // display the first start message
      path: '/firstStart',
      name: 'firstStart',
      component: require('@/components/FirstStart').default
    },
    {
      // display the configuration for the first start of the app
      path: '/configure',
      name: 'configure',
      component: require('@/components/ConfigureApp/ConfigureApp').default
    },
    {
      // call the home for all others paths
      path: '*',
      redirect: '/'
    }
  ]
})
