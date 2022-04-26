<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <b-link class="brand-logo">
        <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">
          Vuexy
        </h2>
      </b-link>
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
          />
        </div>
      </b-col>
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            class="mb-1 font-weight-bold"
            title-tag="h2"
          >
            Миллий кадрлар захираси тизимига Хуш келибсиз
          </b-card-title>
          <validation-observer
            ref="loginForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="submitLogin"
            >
              <!-- email -->
              <b-form-group
                label="Логин"
                label-for="login-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required"
                >
                  <b-form-input
                    id="login-email"
                    v-model="form.login"
                    :state="errors.length > 0 ? false:null"
                    name="login-email"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="form.password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
              <b-overlay :show="loading">
                <b-button
                  type="submit"
                  variant="primary"
                  block
                >
                  Кириш
                </b-button>
              </b-overlay>
            </b-form>
          </validation-observer>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BCardTitle, BImg, BForm, BButton, VBTooltip, BOverlay
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { mapActions } from 'vuex'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
    BOverlay
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      isAdminLogin: false,
      sideImg: require('@/assets/images/pages/login-v2.svg'),
      required,
      loading: false,
      authServiceLink: process.env.VUE_APP_AUTH_SERVICE_URL,
      baseUrl: process.env.VUE_APP_API_BASE_URL,
      form: {
        login: null,
        password: null,
      },
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (this.$store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    loginViaAuthService() {
      window.location = String(this.authServiceLink).replace('[domain]', this.baseUrl)
    },
    ...mapActions({ login: 'auth/login' }),
    submitLogin() {
      this.loading = true
      this.login(this.form)
        .then(res => {
          this.$router.push('/houses')
        })
        .catch(err => {
          this.showLoginError(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    checkFieldsFilled() {
      if (this.validate()) {
        this.submitLogin()
      } else {
        this.showLoginError('empty')
      }
    },
    validate() {
      return !!((this.form.login.length > 0 && this.form.password.length > 0))
    },
    showLoginError($type) {
      let message = ''
      if ($type === 'empty') {
        message = 'Логин ёки парол киритилмади'
      } else {
        message = 'Логин ёки паро хато'
      }
      // this.$message({
      //   message: message,
      //   type: 'error',
      //   duration: 5 * 1000,
      //   offset: 80
      // })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';

</style>
