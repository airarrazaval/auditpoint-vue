import Vue from 'vue'
import Router from 'vue-router'
import { isAuthenticated } from '@/auth/formio'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Client from '@/models/Client'

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
        },
        {
          path: 'client',
          name: 'Client',
          component: Client,
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
      path: '/login',
      name: 'Login',
      component: Login
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
    if (isAuthenticated()) {
      // only proceed if authenticated.
      next()
    } else {
      router.push({name: 'Login'})
    }
  } else {
    if (to.name === 'Login' && isAuthenticated()) {
      router.push({name: 'Dashboard'})
    }
    next()
  }
})

export default router
