<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>
                  Login
                  <img src="@/assets/logo.png" alt="" class="logo float-right">
                </h1>
                
                <p class="text-muted">Sign In to your account</p>
                <b-input-group class="mb-3">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-envelope"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input type="email" class="form-control" placeholder="Email" v-model="credentials.email">
                </b-input-group>
                <b-input-group class="mb-4">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input type="password" class="form-control" placeholder="Password" v-model="credentials.password">
                </b-input-group>
                <b-row>
                  <b-col cols="6">
                    <b-button variant="primary" class="px-4" v-on:click="submit">Login</b-button>
                  </b-col>
                  <b-col cols="6" class="text-right">
                    <b-button variant="link" class="px-0">Forgot password?</b-button>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
            <!--b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Status</h2>
                  <p>REDIRECT: {{ redirect }}</p>
                  <p>AUTH: {{ isAuthenticated }}</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card-->
          </b-card-group>
        </b-col>
      </b-row>
    </div>
    <!-- Errors Modal -->
    <b-modal id="errorModal" v-model="error.show" title="Login Failed" class="text-center" size="sm" centered ok-only>
      <p>Ooops! It seems there has been a problem.</p>
      <ul>
        <li class="text-danger" v-for="message in error.messages">{{ parseMessage(message) }}</li>
      </ul>
    </b-modal>
  </div>
</template>

<script>
  import Auth from '@/utils/auth'

  export default {
    name: 'Login',
    props: [
      'redirect'
    ],
    data () {
      return {
        credentials: {
          email: '',
          password: ''
        },
        error: {
          show: false,
          messages: []
        }
      }
    },
    methods: {
      submit () {
        let credentials = {
          email: this.credentials.email,
          password: this.credentials.password
        }
        let redirect = this.redirect || '/'
        Auth.doLogin(this, credentials, redirect)
      },
      parseMessage (message) {
        if (message.toLowerCase() === 'missing username') {
          return 'Username field cannot be empty'
        } else if (message === '"email" must be a valid email') {
          return 'Please enter a valid email'
        } else {
          return 'An unknown error has occured. Please contact the site administrator if the error persists.'
        }
      }
    },
    computed: {
      isAuthenticated () {
        return Auth.isAuthenticated()
      }
    }
  }
</script>

<style scoped>
#errorModal {
  text-align: center;
}
#errorModal .modal-title {
  text-align: center;
}
img.logo {
  width: 100px;
  margin-top: -20px;
}
</style>
