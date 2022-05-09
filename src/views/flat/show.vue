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
        </b-card-body>
      </b-card>
    </b-col>
    <b-col md="4">
      <b-card>
        <b-col cols="12" class="my-2">
          <h4>To'lov qilish</h4>
        </b-col>
        <b-col v-for="(service, i) in services" :key="service.id" cols="12">
          <b-form-checkbox
            v-model="form.payment_types_ids[i].checked"
            class="float-left"
            style="margin-top: 7px;"
            @change="onPaymentTypeChange($event, i)"
          />
          <b-form-group :label="service.name + ' uchun'" label-for="payment_type_id" label-cols-md="3">
            <b-form-input
              v-if="!form.payment_types_ids[i].checked"
              id="service.id"
              disabled="true"
              placeholder="Ushbu xizmat ko'rsatilmaydi"
              v-model="form.amount[form.payment_types_ids[i].id]"
            />
            <b-form-input
              v-else
              id="service.id"
              placeholder="Summani kiriting"
              v-model="form.amount[form.payment_types_ids[i].id]"/>
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
    <b-col md="4">
      <b-card>
        <b-card-header class="align-items-baseline">
          <div>
            <b-card-title>So'nggi to'lovlar</b-card-title>
          </div>
        </b-card-header>
        <b-col v-for="(service, i) in services" :key="service.id" cols="12">
          <b-form-group :label="service.name + ' uchun'" label-for="payment_type_id" label-cols-md="3">
            <b-form-input
              id="service.id"
              disabled="true"
              v-model="service.name"
              value="service.name"
            />
          </b-form-group>
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
  BInputGroup, BInputGroupPrepend, BForm,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import BCardCode from '@core/components/b-card-code'
import { showToast } from '@/utils/toast'
import Swal from 'sweetalert2'

export default {
  name: 'Show',
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
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
        number: '',
        payment_types_ids: [],
        amount: [],
      },
      loading: false,
      services: [],
      input: '',
    }
  },
  computed: {
    ...mapGetters({ item: 'flat/GET_ITEM' }),
    id() {
      return this.$route.params.id
    },
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
  created() {
    // eslint-disable-next-line no-unused-expressions,no-sequences
    this.getItem(this.id),
    this.getServices(this.id).then(res => {
      this.services = res.data.data
      if (this.isShow || this.isUpdate) {
        this.edit()
      } else {
        this.loading = false
      }
      res.data.data.forEach(item => {
        this.form.payment_types_ids.push({ checked: true, id: item.payment_types.find(i => i.is_default).id })
      })
    })
  },
  methods: {
    async save() {
      this.loading = true
      console.log('kelli')
      this.form.payment_types_ids = this.form.payment_types_ids.filter(item => item.checked).map(item => item.id)
      this.setAmount({ data: this.form })
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
    onPaymentTypeChange(condition, i) {
      if (condition) {
        // if (this.form.payment_types_ids[i]) this.form.payment_types_ids.splice(i, 1)
      } else {

      }
    },
    ...mapActions({
      getItem: 'flat/show',
      getServices: 'amount/service',
      setAmount: 'amount/store',
    }),
  },
}
</script>

<style scoped>

</style>
