<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="8">
          <b-card-group>
            <b-card no-body class="p-4">
              <b-card-body>
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <b-input-group class="mb-3" v-bind:class="{'error': !validation.email.valid}">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-envelope"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input type="email" class="form-control" placeholder="Email" v-model="credentials.email" required>
                </b-input-group>
                <b-input-group class="mb-4" v-bind:class="{'error': !validation.password.valid}">
                  <b-input-group-prepend>
                    <b-input-group-text>
                      <i class="icon-lock"></i>
                    </b-input-group-text>
                  </b-input-group-prepend>
                  <input type="password" class="form-control" placeholder="Password" v-model="credentials.password" required>
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
            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
              <b-card-body class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
                    dolore magna aliqua.</p>
                    <p>{{ redirect }}</p>
                  <b-button variant="primary" class="active mt-3">Register Now!</b-button>
                </div>
              </b-card-body>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
    <!-- Errors Modal -->
    <b-modal id="errorModal" v-model="error.show" title="Login Failed" class="text-center" size="sm" centered ok-only>
      <p></p>
      <p class="text-danger">{{ error.message }}</p>
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
        validation: {
          email: {
            valid: true
          },
          password: {
            valid: true
          }
        },
        error: {
          show: false,
          message: ''
        }
      }
    },
    methods: {
      submit () {
        this.validation.email.valid = this.credentials.email || false
        this.validation.password.valid = this.credentials.password || false
        if (this.validation.email.valid && this.validation.password.valid) {
          let credentials = {
            email: this.credentials.email,
            password: this.credentials.password
          }
          let redirect = this.redirect
          Auth.doLogin(this, credentials, redirect)
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
.input-group.error input {
  border-color: crimson;
}
</style>
