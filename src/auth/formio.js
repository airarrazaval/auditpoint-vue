import router from '@/router'
import Formio from 'formiojs'

const API_URL = 'http://localhost:3001'

Formio.setBaseUrl(API_URL)

export function isAuthenticated () {
  return !!Formio.getUser() && !!Formio.getToken()
}

export function setToken (token) {
  return Formio.setToken(token)
}

export function getToken () {
  return Formio.getToken()
}

export function setUser (user) {
  return Formio.setUser(user)
}

export function getUser () {
  return Formio.getUser()
}

export function login (context, credentials, redirect) {
  console.log('credentials', credentials)
  console.log('redirect', redirect)
  return Formio.makeStaticRequest(API_URL + '/user/login', 'post', {data: credentials}).then((response) => {
    console.log('login successfull')
    Formio.setUser(response)

    // Redirect to a specified route
    if (redirect) {
      router.push(redirect)
    }
  }).catch((err) => {
    context.error.show = true
    context.error.message = err.details ? err.details[0].message : err.message || err
  })
}

export function logout () {
  Formio.logout()
  router.push({name: 'Login'})
}

/*
export default {
  // Send a request to the login URL and save the returned JWT
  doLogin (context, credentials, redirect) {
    if (!credentials.password) {
      context.error.show = true
      context.error.message.push('empty password')
    } else {
      let formio = new Formio(LOGIN_URL)
      formio.saveSubmission({
        data: credentials
      }).then((data) => {
        data.x_jwt_token = Formio.getToken()
        localStorage.setItem('authUser', JSON.stringify(data))

        // Redirect to a specified route
        if (redirect) {
          router.push(redirect)
        }
      }).catch((err) => {
        console.log('login-error', err)
        context.error.show = true
        context.error.messages = err.details ? err.details.map(x => x.message) : [ err.message || err ]
      })
    }
  },
  // To log out, we just need to remove the token
  doLogout () {
    localStorage.removeItem('authUser')
    router.push({name: 'Login'})
  },
  // Check wether the user is authenticated or not
  isAuthenticated () {
    let user = JSON.parse(localStorage.getItem('authUser')) || {}
    return !!user.x_jwt_token
  },
  // Route to sign in page
  signIn (redirect) {
    router.push({
      name: 'Login',
      params: {
        redirect: redirect
      }
    })
  }
}
*/
