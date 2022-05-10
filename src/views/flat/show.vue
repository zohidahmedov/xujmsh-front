<template>
  <b-row>
    <b-col md="4">
      <b-card>
        <b-card-header class="align-items-baseline">
          <div>
            <b-card-title>Xonadon ma'lumotlari</b-card-title>
          </div>
          <b-dropdown
            variant="link"
            no-caret
            right
            class="chart-dropdown"
            toggle-class="p-0"
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="18"
                class="text-body cursor-pointer"
              />
            </template>
            <b-dropdown-item :to="{ name: 'house-update', params: { id } }">
              <feather-icon icon="EditIcon" />
              Tahrirlash
            </b-dropdown-item>
          </b-dropdown>
        </b-card-header>
        <b-card-body>
          <table class="table table-b-table-default">
            <tr>
              <th>Shaxsiy raqam</th>
              <td class="text-primary">
                {{ item.billing_number }}
              </td>
            </tr>
            <tr>
              <th>Uy raqami</th>
              <td class="text-primary">
                {{ item.house.number }}
              </td>
            </tr>
            <tr>
              <th>Xonadon raqami</th>
              <td class="text-primary">
                {{ item.number }}
              </td>
            </tr>
            <tr>
              <th>FISH</th>
              <td class="text-primary">
                {{ item.full_name }}
              </td>
            </tr>
            <tr>
              <th>Telefon raqami</th>
              <td class="text-primary">
                {{ item.phone }}
              </td>
            </tr>
            <tr>
              <th>Yashovchilar soni</th>
              <td class="text-primary">
                {{ item.members_count }} ta
              </td>
            </tr>
            <tr>
              <th>Umumiy maydoni</th>
              <td class="text-primary">
                {{ item.area }} m <sup>2</sup>
              </td>
            </tr>
          </table>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col md="4">
      <b-card>
        <b-col
          cols="12"
          class="my-2"
        >
          <h4>To'lov qilish</h4>
        </b-col>
        <b-col
          v-if="form.payment_types_ids[i].has"
          data="form"
          v-for="(service, i) in services"
          :key="service.id"
          cols="12"
        >
          <b-form-checkbox
            v-model="form.payment_types_ids[i].checked"
            class="float-left"
            style="margin-top: 7px;"
            @change="onPaymentTypeChange($event, i)"
          />
          <b-form-group
            :label="service.name + ' uchun'"
            label-for="payment_type_id"
            label-cols-md="3"
          >
            <validation-provider
                v-if="!form.payment_types_ids[i].checked"
                #default="{ errors }"
              name="Yashovchilar soni"
              rules="required|between:1,20"
            >
              <b-form-input
                id="id"
                v-model="form.amount[form.payment_types_ids[i].id]"
                type="number"
                :state="errors.length > 0 ? false:null"
                disabled="true"
                placeholder="Ushbu xizmat ko'rsatilmaydi"
              />
              <small class="text-danger">{{ errors[0] }}</small>
            </validation-provider>

            <b-form-input
              v-else
              id="service.id"
              v-model="form.amount[form.payment_types_ids[i].id]"
              placeholder="Summani kiriting"
            />
          </b-form-group>
        </b-col>

        <!-- submit and reset -->
        <b-col offset-md="4">
          <b-button
            variant="primary"
            @click="save"
          >
            <feather-icon icon="CheckIcon" />
            Saqlash
          </b-button>
        </b-col>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow,
  BCol,
  BCard,
  BCardHeader,
  BCardTitle,
  BCardBody,
  BButton,
  BDropdownItem,
  BDropdown,
  BFormGroup,
  BFormInput,
  BFormCheckbox,

} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import Swal from 'sweetalert2'
import { ValidationObserver, ValidationProvider } from 'vee-validate';

export default {
  name: 'Show',
  components: {
    ValidationProvider,
    // eslint-disable-next-line vue/no-unused-components
    ValidationObserver,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BCard,
    BCardHeader,
    BCardTitle,
    BButton,
    BDropdownItem,
    BDropdown,
    BCardBody,
    BFormCheckbox,
  },
  data() {
    return {
      form: {
        flat_id: '',
        payment_types_ids: [],
        amount: [],
      },
      loading: false,
      services: [],
      input: '',
    }
  },
  computed: {
    ...mapGetters({ items: 'amount/GET_ITEMS', item: 'flat/GET_ITEM' }),
    id() {
      return this.$route.params.id
    },
  },
  created() {
    this.getItem(this.id)
    this.getServices({ per_page: 999, sort_key: 'id', sort_type: 'asc' }).then(res => {
      // this.loading = true
      this.services = res.data.data
      this.edit()
    })
  },
  methods: {
    async save() {
      this.loading = true
      console.log('kelli')
      this.form.flat_id = this.item.id
      this.form.payment_types_ids = this.form.payment_types_ids.filter(item => item.checked).map(item => item.id)
      this.setAmount(this.form)
        .then(res => {
          if (res.success) {
            this.$router.push({ name: 'Show' })
            Swal.fire({
              title: this.$t('Маълумот сақланди!'),
              type: 'success',
              timer: 1500,
              showConfirmButton: false,
              confirmButtonText: 'Давом этиш',
            })
          } else {
            Swal.fire({
              title: this.$t('Серверда хатолик рўй берди!'),
              type: 'error',
              timer: 2000,
              showConfirmButton: false,
              confirmButtonText: 'Давом этиш',
            })
          }
        })
    },
    async validationForm() {
      let validated = false
      await this.$refs.form.validate().then(success => {
        validated = success
      })
      return validated
    },
    onPaymentTypeChange(condition, i) {
      if (condition) {
        // if (this.form.payment_types_ids[i]) this.form.payment_types_ids.splice(i, 1)
        // eslint-disable-next-line no-empty
      } else {

      }
    },
    edit() {
      this.show(this.$route.params.id).then(res => {
        this.setForm(res.data.house)
      }).finally(() => {
        this.loading = true
      })
    },
    setForm(data) {
      console.log(data)
      this.services.forEach(item => {
        const type = data.payment_types.find(i => i.service_id === item.id)
        const checked = !!data.payment_types.find(i => i.service_id === item.id)
        // if (type) {
          this.form.payment_types_ids.push({ checked, id: checked ? type.id : item.default_payment_type.id, has: checked ? true : false })
        // }
      })
      console.log(this.form)
    },
    ...mapActions({
      getItem: 'flat/show',
      getFlatServices: 'amount/service',
      getServices: 'service/index',
      setAmount: 'amount/store',
      show: 'flat/show',
    }),
  },
}
</script>

<style scoped>

</style>
