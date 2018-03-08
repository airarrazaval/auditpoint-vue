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
        this.$router.push(redirect)
      }
    }).catch((err) => {
      console.log('login-error', err)
      context.error.show = true
      context.error.messages = err.details ? err.details.map(x => x.message) : [ err.message || err ]
    })
  },
  // To log out, we just need to remove the token
  doLogout () {
    localStorage.removeItem('authUser')
    this.$router.push({name: 'Login'})
  },
  // Check wether the user is authenticated or not
  isAuthenticated () {
    let user = JSON.parse(localStorage.getItem('authUser')) || {}
    return !!user.x_jwt_token
  },
  // Route to sign in page
  signIn (redirect) {
    this.$router.push({
      name: 'Login',
      params: {
        redirect: redirect
      }
    })
  }
}
