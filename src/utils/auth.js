import router from '../router'
import Formio from 'formiojs'

// URL and endpoint constants
const API_URL = 'http://localhost:3001/'
const LOGIN_URL = API_URL + 'user/login'
// const SIGNUP_URL = API_URL + 'user/register'

export default {
  formio: null,
  // Send a request to the login URL and save the returned JWT
  doLogin (context, credentials, redirect) {
    let formio = new Formio(LOGIN_URL)
    formio.saveSubmission({
      data: credentials
    }).then((data) => {
      data.x_jwt_token = Formio.getToken()
      localStorage.setItem('authUser', JSON.stringify(data))

      // Redirect to a specified route
      if (redirect) {
        router.push(atob(redirect))
      }
    }).catch((err) => {
      console.log('error', err)
      context.error.show = true
      context.error.message = err.message || err
    })
  },
  // To log out, we just need to remove the token
  doLogout () {
    localStorage.removeItem('authUser')
    router.push('/login')
  },
  // Check wether the user is authenticated or not
  isAuthenticated () {
    let user = JSON.parse(localStorage.getItem('authUser')) || {}
    return !!user.x_jwt_token
  }
}
