<template>
  <b-modal
    v-model="visible"
    cancel-variant="outline-secondary"
    ok-title="Saqlash"
    no-close-on-backdrop
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
        <b-form-group
          label="Xizmat uchun to'lov shakli"
          label-for="calculating_type_id"
        >
          <validation-provider
            #default="{ errors }"
            name="Xizmat uchun to'lov shakli"
            rules="required"
          >
            <v-select
              v-model="form.calculating_type_id"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="description"
              :reduce="(option) => option.id"
              :options="calculatingTypes"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <b-form-group
          label="Oddiy to'lov uchun xizmat narxi"
          label-for="amount"
        >
          <validation-provider
            #default="{ errors }"
            name="Narxi"
            rules="required"
          >
            <b-form-input
              id="amount"
              v-model="form.default_amount"
              v-money="money"
              class="v-money"
              :state="errors.length > 0 ? false:null"
              name="Narxi"
              placeholder="Narxi"
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
import VSelect from 'vue-select'
import {
  BModal, BFormGroup, BFormInput, BForm,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import { clearObject } from '@/utils'
import { VMoney } from 'v-money'

export default {
  name: 'Create',
  components: {
    BModal, ValidationProvider, ValidationObserver, BFormGroup, BFormInput, BForm, VSelect,
  },
  directives: { money: VMoney },
  data() {
    return {
      form: {
        id: null,
        name: null,
        calculating_type_id: null,
        default_amount: null,
        default_name: 'Oddiy',
      },
      visible: false,
      calculatingTypes: [],
      required,
      money: {
        decimal: '',
        thousands: ' ',
        prefix: '',
        suffix: ' so\'m',
        precision: 0,
        masked: false,
      },
    }
  },
  watch: {
    visible(newVal) {
      if (!newVal) setTimeout(() => { clearObject(this.form) }, 200)
      if (!this.calculatingTypes.length) {
        this.getCalculatingTypes().then(res => {
          this.calculatingTypes = res.data
        })
      }
    },
  },
  methods: {
    async save() {
      const valid = await this.validationForm()
      if (valid) {
        const form = { ...this.form }
        form.default_amount = form.default_amount.replace(' so\'m', '')
        form.default_amount = form.default_amount.replaceAll(' ', '')
        this.method(form).then(res => {
          showToast('success', 'Muvaffaqiyatli saqlandi', 'CheckCircleIcon')
          this.$emit('onSuccess')
          this.visible = false
        })
      } else {
        showToast('warning', 'Talab qilingan maydonlarni to\'ldiring')
      }
    },
    edit(item) {
      this.form.id = item.id
      this.form.calculating_type_id = item.calculating_type_id
      this.form.name = item.name
      this.form.amount = item.default_payment_type.amount
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
    ...mapActions({ store: 'service/store', update: 'service/update', getCalculatingTypes: 'service/calculatingTypes' }),
  },
}
</script>

<style scoped>

</style>
