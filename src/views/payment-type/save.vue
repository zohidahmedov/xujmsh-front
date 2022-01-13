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
          label="Xizmat turi"
          label-for="service_id"
        >
          <validation-provider
            #default="{ errors }"
            name="Xizmat turi"
            rules="required"
          >
            <v-select
              id="service_id"
              v-model="form.service_id"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="name"
              :reduce="(option) => option.id"
              :options="services.data"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <b-form-group
          label="Nomi"
          label-for="name"
        >
          <validation-provider
            #default="{ errors }"
            name="Nomi"
            rules="required"
          >
            <b-form-input
              id="name"
              v-model="form.name"
              :state="errors.length > 0 ? false:null"
              name="name"
              placeholder="Nomi"
            />
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <b-form-group
          label="Narxi"
          label-for="amount"
        >
          <validation-provider
            #default="{ errors }"
            name="Nomi"
            rules="required"
          >
            <b-form-input
              id="amount"
              v-model="form.amount"
              v-money="money"
              class="v-money"
              :state="errors.length > 0 ? false:null"
              name="name"
              placeholder="Nomi"
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
import { VMoney } from 'v-money'
import VSelect from 'vue-select'
import {
  BModal, BFormGroup, BFormInput, BForm,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import { clearObject } from '@/utils'

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
        name: 'Oddiy',
        service_id: null,
        amount: null,
      },
      visible: false,
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
  computed: {
    services() {
      return this.$store.getters['service/GET_ITEMS']
    },
  },
  watch: {
    visible(newVal) {
      if (!newVal) setTimeout(() => { clearObject(this.form) }, 200)
      if (!this.calculatingTypes.length) {
        this.getServices({ per_page: 999 })
      }
    },
  },
  methods: {
    async save() {
      const valid = await this.validationForm()
      if (valid) {
        let form = { ...this.form }
        form.amount = form.amount.replace(' so\'m', '')
        this.method(form).then(res => {
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
      this.form.id = item.id
      this.form.service_id = item.service_id
      this.form.name = item.name
      this.form.amount = item.amount
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
    ...mapActions({ store: 'paymentType/store', update: 'paymentType/update', getServices: 'service/index' }),
  },
}
</script>

<style scoped>

</style>
