<template>
  <b-modal
    v-model="visible"
    cancel-variant="outline-secondary"
    size="lg"
    ok-title="Saqlash"
    cancel-title="Bekor qilish"
    centered
    title="Xonadon qo'shish"
    @ok="save"
  >
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
              label-for="house_id"
            >
              <validation-provider
                #default="{ errors }"
                name="Uy raqami"
                rules="required"
              >
                <v-select
                  id="house_id"
                  v-model="form.house_id"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  label="number"
                  name="Uy raqami"
                  :reduce="(option) => option.id"
                  :options="houses.data"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Shaxsiy raqam"
              label-for="billing_number"
            >
              <validation-provider
                #default="{ errors }"
                name="Shaxsiy raqam"
                rules="required"
              >
                <b-form-input
                  id="billing_number"
                  v-model="form.billing_number"
                  :state="errors.length > 0 ? false:null"
                  name="Shaxsiy raqam"
                  placeholder="000000"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col md="6">
            <b-form-group
              label="Xonadon raqami"
              label-for="number"
            >
              <validation-provider
                #default="{ errors }"
                name="Xonadon raqami"
                rules="required"
              >
                <b-form-input
                  id="number"
                  v-model="form.number"
                  :state="errors.length > 0 ? false:null"
                  name="Xonadon raqami"
                  placeholder="000000"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="FISH"
              label-for="full_name"
            >
              <validation-provider
                #default="{ errors }"
                name="FISH"
                rules="required"
              >
                <b-form-input
                  id="full_name"
                  v-model="form.full_name"
                  :state="errors.length > 0 ? false:null"
                  name="FISH"
                  placeholder="Eshpo'latov Toshpo'lat"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Telefon raqami"
              label-for="phone"
            >
              <validation-provider
                #default="{ errors }"
                name="Telefon raqami"
                rules="required"
                class="prefix-provider"
              >
                <b-form-input
                  id="phone"
                  v-model="form.phone"
                  v-mask="'## ### ## ##'"
                  :state="errors.length > 0 ? false:null"
                  name="Telefon raqami"
                  placeholder="90 123 45 67"
                />
                <span class="input-prefix">+998</span>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="Yashovchilar soni"
              label-for="members_count"
            >
              <validation-provider
                #default="{ errors }"
                name="Yashovchilar soni"
                rules="required"
              >
                <b-form-input
                  id="members_count"
                  v-model="form.members_count"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  name="Yashovchilar soni"
                  placeholder="2"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label-for="area"
            >
              <template #label>
                Umumiy maydoni (m<sup>2</sup>)
              </template>
              <validation-provider
                #default="{ errors }"
                name="Umumiy maydoni"
                rules="required|between:10,500"
              >
                <b-form-input
                  id="area"
                  v-model="form.area"
                  type="number"
                  :state="errors.length > 0 ? false:null"
                  name="Umumiy maydoni"
                  placeholder="22.5"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-modal>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { showToast } from '@/utils/toast'
import { clearObject } from '@/utils'
import { required, between } from '@validations'
import { VueMaskDirective } from 'v-mask'
import {
  BModal, BFormGroup, BFormInput, BForm, BRow, BCol,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import VSelect from 'vue-select'

export default {
  name: 'Create',
  components: {
    BModal, ValidationProvider, ValidationObserver, BFormGroup, BFormInput, BForm, VSelect, BRow, BCol,
  },
  directives: { mask: VueMaskDirective },
  data() {
    return {
      form: {
        id: null,
        billing_number: null,
        house_id: null,
        number: null,
        full_name: null,
        phone: null,
        members_count: null,
        area: null,
      },
      visible: false,
      required,
      between,
    }
  },
  computed: {
    houses() {
      return this.$store.getters['house/GET_ITEMS']
    },
  },
  watch: {
    visible(newVal) {
      if (!newVal) setTimeout(() => { clearObject(this.form) }, 200)
      if (!this.houses || !this.houses.length) {
        this.getHouses({ per_page: 999 })
      }
    },
  },
  methods: {
    async save() {
      const valid = await this.validationForm()
      if (valid) {
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
    ...mapActions({ store: 'flat/store', update: 'flat/update', getHouses: 'house/index' }),
  },
}
</script>

<style scoped>

</style>
