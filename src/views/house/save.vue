<template>
  <b-modal
    v-model="visible"
    cancel-variant="outline-secondary"
    ok-title="Saqlash"
    cancel-title="Bekor qilish"
    centered
    title="Uy qo'shish"
    @ok="save"
  >
    <validation-observer
      ref="form"
      #default="{invalid}"
    >
      <b-form
        class="auth-login-form mt-2"
      >
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
        <b-form-group
          label="Uy manzili"
          label-for="login-address"
        >
          <validation-provider
            #default="{ errors }"
            name="Uy raqami"
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
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { showToast } from '@/utils/toast'
import { required } from '@validations'
import {
  BModal, BFormGroup, BFormInput, BForm,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  name: 'Create',
  components: {
    BModal, ValidationProvider, ValidationObserver, BFormGroup, BFormInput, BForm,
  },
  data() {
    return {
      form: {
        id: null,
        number: null,
        address: null,
      },
      visible: false,
      required,
    }
  },
  methods: {
    save() {
      if (this.validationForm()) {
        this.method(this.form).then((res) => {
          showToast('success', 'Muvaffaqiyatli saqlandi', 'CheckCircleIcon')
          this.$emit('onSuccess')
        }).catch((err) => {
          showToast('danger', 'Xatolik', 'XIcon')
        })
      } else {
        showToast('warning', 'Talab qilingan maydonlarni to\'ldiring')
      }
    },
    edit(item) {
      this.form = { ...item }
      this.visible = true
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
    ...mapActions({ store: 'house/store', update: 'house/update' }),
  },
}
</script>

<style scoped>

</style>
