<template>
  <b-card>
    <template v-if="services.length || loading">
      <b-overlay
        :show="loading"
        rounded="sm"
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
                  label-for="number"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Uy raqami"
                    rules="required"
                  >
                    <b-form-input
                      id="number"
                      v-model="form.number"
                      :disabled="isShow"
                      :state="errors.length > 0 ? false:null"
                      name="Uy raqami"
                      placeholder="188-A"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Uy manzili"
                  label-for="address"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Uy manzili"
                    vid="email"
                    rules="required"
                  >
                    <b-form-input
                      id="address"
                      v-model="form.address"
                      :disabled="isShow"
                      :state="errors.length > 0 ? false:null"
                      name="login-email"
                      placeholder="Navoiy shaxri, Tinchlik ko'chasi"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col
                cols="12"
                class="my-2"
              >
                <h4>Uyga ko'rsatiladigan xizmatlar uchun to'lov turlari</h4>
              </b-col>
              <b-col
                v-for="(service, i) in services"
                :key="service.id"
                cols="6"
              >
                <b-form-group
                  :label="service.name + ' uchun'"
                  label-for="payment_type_id"
                  label-cols-md="3"
                >
                  <v-select
                    id="payment_type_id"
                    v-model="form.payment_types_ids[i]"
                    :disabled="isShow"
                    :clearable="false"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    label="name"
                    :reduce="(option) => option.id"
                    :options="service.payment_types"
                  >
                    <template #option="{ name, amount }">
                      <span style="margin: 0 0 0 0;">
                        {{ name }}
                      </span>
                      <span>{{ amount }} so'm</span>
                    </template>
                    <template #selected-option="{ name, amount }">
                      <span style="margin: 0 10px 0 0;">
                        {{ name }}
                      </span>
                      <span class="text-muted">{{ amount }} so'm</span>
                    </template>
                  </v-select>
                </b-form-group>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </b-overlay>
      <b-card-footer v-if="!isShow">
        <b-button
          variant="primary"
          class="float-right mb-2"
          @click="save"
        >
          <feather-icon icon="CheckIcon" />
          Saqlash
        </b-button>
      </b-card-footer>
    </template>
    <template v-else>
      <b-alert
        show
        variant="warning"
        class="py-2 text-center"
      >
        <feather-icon icon="AlertTriangleIcon" />
        Uy qo'shish uchun avval xizmat turlarini qo'shishingiz kerak
      </b-alert>
      <div class="text-center">
        <b-button
          variant="primary"
          :to="{ name: 'service-index' }"
        >
          Xizmatlar turlari <feather-icon icon="ArrowRightIcon" />
        </b-button>
      </div>
    </template>
  </b-card>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { showToast } from '@/utils/toast'
import { required } from '@validations'
import {
  BCard, BFormGroup, BFormInput, BForm, BRow, BCol, BCardFooter, BButton, BAlert, BOverlay,
} from 'bootstrap-vue'
import { mapActions } from 'vuex'
import { clearObject } from '@/utils'
import VSelect from 'vue-select'

export default {
  name: 'Create',
  components: {
    BCard, ValidationProvider, ValidationObserver, BFormGroup, BFormInput, BForm, BRow, BCol, VSelect, BCardFooter, BButton, BAlert, BOverlay,
  },
  data() {
    return {
      form: {
        id: null,
        number: null,
        address: null,
        payment_types_ids: [],
      },
      services: [],
      required,
      loading: false,
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
  },
  watch: {
    visible(newVal) {
      if (!newVal) clearObject(this.form)
    },
  },
  created() {
    this.loading = true
    this.getServices({ per_page: 999 }).then(res => {
      this.services = res.data.data
      if (this.isShow || this.isUpdate) {
        this.edit()
      }
      if (this.isCreate) {
        res.data.data.forEach(item => {
          this.form.payment_types_ids.push(item.payment_types.find(i => i.is_default).id)
        })
      }
    }).finally(() => {
      this.loading = false
    })
  },
  methods: {
    async save() {
      const valid = await this.validationForm()
      if (valid) {
        this.loading = true
        this.method(this.form).then(res => {
          showToast('success', 'Muvaffaqiyatli saqlandi', 'CheckCircleIcon')
          this.$router.push({ name: 'house-index' })
        }).catch(err => {
          showToast('danger', 'Xatolik', 'XIcon')
        }).finally(() => {
          this.loading = false
        })
      } else {
        showToast('warning', 'Talab qilingan maydonlarni to\'ldiring')
      }
    },
    edit() {
      this.show(this.$route.params.id).then(res => {
        this.setForm(res.data)
      })
    },
    setForm(data) {
      this.form.id = data.id
      this.form.number = data.number
      this.form.address = data.address
      this.services.forEach(item => {
        this.form.payment_types_ids.push(data.payment_types.find(i => i.service_id == item.id).id)
      })
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
    ...mapActions({
      store: 'house/store', update: 'house/update', show: 'house/show', getServices: 'service/index',
    }),
  },
}
</script>

<style scoped>

</style>
