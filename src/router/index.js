import Vue from 'vue'
import Router from 'vue-router'
import Auth from '../utils/auth'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'

// Pages
import Page404 from '@/views/pages/Page404'
import Page500 from '@/views/pages/Page500'
import Login from '@/views/pages/Login'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            requiresAuthentication: true
          }
        }

      ]
    },
    {
      path: '/404',
      name: 'Page404',
      component: Page404
    },
    {
      path: '/500',
      name: 'Page500',
      component: Page500
    },
    {
      path: '/login/:redirect?',
      name: 'Login',
      component: Login,
      props: true,
      meta: {
        requiresAuthentication: false
      }
    },
    {
      // Redirect to 404 page if not found
      path: '*',
      redirect: '/404'
    }
  ]
})

// Global route guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuthentication)) {
    // this route requires auth, check if logged in
    if (Auth.isAuthenticated()) {
      // only proceed if authenticated.
      next()
    } else {
      next('/login/' + btoa(to.path))
    }
  } else {
    // return to dashboard if trying to access login page and is already signed in
    if (Auth.isAuthenticated() && to.name === 'Login') {
      next('/dashboard')
    }
    next()
  }
})

export default router
