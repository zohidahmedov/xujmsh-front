<template>
  <b-card>
    <validation-observer
      ref="form"
      #default="{invalid}"
    >
      <b-form
        class="auth-login-form mt-2"
      >
        <b-row>
          <b-col md="6">
            <b-form-group
              label="Uy raqami"
              label-for="login-number"
            >
              <validation-provider
                #default="{ errors }"
                name="Uy raqami"
                vid="email"
                rules="required"
              >
                <b-form-input
                  id="login-number"
                  v-model="form.number"
                  :state="errors.length > 0 ? false:null"
                  name="login-email"
                  placeholder="188-A"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Uy manzili"
              label-for="login-address"
            >
              <validation-provider
                #default="{ errors }"
                name="Uy manzili"
                vid="email"
                rules="required"
              >
                <b-form-input
                  id="login-address"
                  v-model="form.address"
                  :state="errors.length > 0 ? false:null"
                  name="login-email"
                  placeholder="Navoiy shaxri, Tinchlik ko'chasi"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col v-for="service in " cols="12">
            <b-form-group
              label="First Name"
              label-for="h-first-name"
              label-cols-md="4"
            >
              <b-form-input
                id="h-first-name"
                placeholder="First Name"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { showToast } from '@/utils/toast'
import { required } from '@validations'
import {
  BCard, BFormGroup, BFormInput, BForm, BRow, BCol,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import { clearObject } from '@/utils'

export default {
  name: 'Create',
  components: {
    BCard, ValidationProvider, ValidationObserver, BFormGroup, BFormInput, BForm, BRow, BCol,
  },
  data() {
    return {
      form: {
        id: null,
        number: null,
        address: null,
      },
      required,
    }
  },
  computed: {
    isUpdate() {
      return this.$route.name === 'house-update'
    },
    isShow() {
      return this.$route.name === 'house-show'
    },
    isCreate() {
      return this.$route.name === 'house-create'
    },
    services() {
      return this.$store.getters['service/GET_ITEMS']
    },
  },
  watch: {
    visible(newVal) {
      if (!newVal) clearObject(this.form)
    },
  },
  created() {
    if (this.isShow || this.isUpdate) {
      this.edit()
    }
    this.getServices()
  },
  methods: {
    save() {
      if (this.validationForm()) {
        this.method(this.form).then(res => {
          showToast('success', 'Muvaffaqiyatli saqlandi', 'CheckCircleIcon')
          this.$emit('onSuccess')
        }).catch(err => {
          showToast('danger', 'Xatolik', 'XIcon')
        })
      } else {
        showToast('warning', 'Talab qilingan maydonlarni to\'ldiring')
      }
    },
    edit() {
      this.show(this.$route.params.id).then(res => {
        this.setForm(red.data)
      })
    },
    setForm(data) {

    },
    method(data) {
      if (this.form.id) return this.update(data)
      return this.store(data)
    },
    async validationForm() {
      let validated = false
      await this.$refs.form.validate().then(success => {
        validated = success
      })
      return validated
    },
    ...mapActions({ store: 'house/store', update: 'house/update', show: 'house/show', getServices: 'service/index' }),
  },
}
</script>

<style scoped>

</style>
