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
          label-for="login-email"
        >
          <validation-provider
            #default="{ errors }"
            name="Uy raqami"
            vid="email"
            rules="required"
          >
            <b-form-input
              id="login-email"
              v-model="form.number"
              :state="errors.length > 0 ? false:null"
              name="login-email"
              placeholder="188-A"
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
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import {
  BModal, BFormGroup, BFormInput, BButton, BForm,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'

export default {
  name: 'Create',
  components: {
    BModal, ValidationProvider, ValidationObserver, BFormGroup, BFormInput, BButton, BForm,
  },
  data() {
    return {
      form: {
        id: null,
        number: null,
      },
      visible: false,
    }
  },
  methods: {
    save() {
      if (this.validationForm()) {
        this.method(this.form).then((res) => {
          this.showToast('success', 'Muvaffaqiyatli saqlandi', 'CheckCircleIcon')
        }).catch((err) => {
          this.showToast('danger', 'Xatolik', 'XIcon')
        })
      }
    },
    edit(id) {

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
    showToast(type, message, icon) {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: message,
          icon,
          variant: type,
        },
      })
    },
    ...mapActions({ store: 'house/store', update: 'house/update' }),
  },
}
</script>

<style scoped>

</style>
