<template>
  <b-modal
    v-model="visible"
    cancel-variant="outline-secondary"
    ok-title="Saqlash"
    cancel-title="Bekor qilish"
    centered
    title="Xizmat qo'shish"
    @ok.prevent="save"
  >
    <validation-observer
      ref="form"
      #default="{invalid}"
    >
      <b-form
        class="auth-login-form mt-2"
      >
        <b-form-group
          label="Xizmat nomi"
          label-for="name"
        >
          <validation-provider
            #default="{ errors }"
            name="Xizmat nomi"
            rules="required"
          >
            <b-form-input
              id="name"
              v-model="form.name"
              :state="errors.length > 0 ? false:null"
              name="name"
              placeholder="Majburiy badal"
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
import { clearObject } from '@/utils'

export default {
  name: 'Create',
  components: {
    BModal, ValidationProvider, ValidationObserver, BFormGroup, BFormInput, BForm,
  },
  data() {
    return {
      form: {
        id: null,
        name: null,
      },
      visible: false,
      required,
    }
  },
  watch: {
    visible(newVal) {
      if (!newVal) setTimeout(() => { clearObject(this.form) }, 200)
    },
  },
  methods: {
    async save() {
      const valid = await this.validationForm()
      if (valid) {
        this.method(this.form).then(res => {
          showToast('success', 'Muvaffaqiyatli saqlandi', 'CheckCircleIcon')
          this.$emit('onSuccess')
          this.visible = false
        }).catch(err => {
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
    ...mapActions({ store: 'service/store', update: 'service/update' }),
  },
}
</script>

<style scoped>

</style>
