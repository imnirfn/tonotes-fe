<template>
  <div class="fullscreen row">
    <div class="col bg-primary" />
    <div class="col" />
    <div class="fullscreen flex flex-center">
      <q-card class="q-pa-md" style="width:400px;">
        <div class="text-weight-bold text-center q-pb-lg q-gutter-sm">
          <q-img class="q-mb-md" src="~assets/tagline.png" />
          <div class="text-h4 text-primary">
            Create Account
          </div>
          <div class="text-caption">
            Dont have an account? Create your account quickly
          </div>
        </div>

        <div class="q-gutter-sm">
          <q-input
            ref="name"
            v-model.trim="form.name"
            filled
            label="Username"
            error-message="Username can't be empty"
            :error="$v.form.name.$error"
          />

          <q-input
            ref="email"
            v-model.trim="form.email"
            filled
            label="Email Address"
            :error="$v.form.email.$error"
            error-message="Enter a valid email"
          />

          <q-input
            ref="mobile"
            v-model.trim="form.mobile"
            filled
            label="Mobile"
            :error="$v.form.mobile.$error"
            error-message="Enter a valid mobile"
          />

          <q-input
            ref="password"
            v-model="form.password"
            filled
            :type="type"
            label="Create Your Own Password"
            :error="$v.form.password.$error"
            error-message="Password can't be empty"
          >
            <template v-slot:append>
              <q-btn
                round
                flat
                icon="remove_red_eye"
                @click="onClickShowPassword"
              />
            </template>
          </q-input>

          <div>
            <div class="text-caption">
              By clicking Register, you have agreed with our Term of Conditions of usage and using cookies.
            </div>
          </div>

          <div class="q-mt-md q-gutter-sm text-center">
            <q-btn
              color="blue"
              text-color="white"
              label="Register"
              no-caps
              @click="onClickRegister"
            />

            <q-btn
              color="primary"
              text-color="primary"
              outline
              unelevated
              to="/login"
              label="Back to Login"
              no-caps
            />
          </div>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form: {
        name: '',
        password: '',
        email: '',
        mobile: ''
      },
      type: 'password'
    }
  },

  validations: {
    form: {
      name: { required },
      email: { required, email },
      password: { required },
      mobile: { required }
    }
  },

  methods: {
    async onClickRegister() {
      this.$v.form.$touch()

      try {
        const res = await this.$store.dispatch('RegisterIndividual', this.form)
        console.log(res)
        this.$router.push('/login')
      } catch (err) {

      }
    },

    onClickShowPassword() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  }
}
</script>
