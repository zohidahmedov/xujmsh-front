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
        <b-col v-for="(service) in services" :key="service.id" cols="12">
          <b-form-checkbox
            v-model="form.payment_types_ids[i].checked"
            :disabled="isShow"
            class="float-left"
            style="margin-top: 7px;"
            @change="onPaymentTypeChange($event, i)"
          />
          <b-form-group :label="service.name + ' uchun'" label-for="number" label-cols-md="6">
            <b-form-input
              id="number"
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
    <b-col md="4">
      <b-card>
        <b-card-header class="align-items-baseline">
          <div>
            <b-card-title>So'nggi to'lovlar</b-card-title>
          </div>
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
  BFormCheckbox, BInputGroup, BInputGroupPrepend, BForm,
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'
import BCardCode from '@core/components/b-card-code'
import { showToast } from '@/utils/toast'

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
  },
  data() {
    return {
      form: {
        number: null,
        payment_types_ids: [],
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
  },
  created() {
    // eslint-disable-next-line no-unused-expressions
    this.getItem(this.id),
    this.getServices({ per_page: 999, sort_key: 'id', sort_type: 'asc' }).then(res => {
      this.services = res.data.data
      if (this.isShow || this.isUpdate) {
        this.edit()
      } else {
        this.loading = false
      }
      if (this.isCreate) {
        res.data.data.forEach(item => {
          this.form.payment_types_ids.push({ checked: true, id: item.payment_types.find(i => i.is_default).id })
        })
      }
    })
  },
  methods: {
    async save() {
      const valid = await this.validationForm()
      if (valid) {
        this.loading = true
        this.form.payment_types_ids = this.form.payment_types_ids.filter(item => item.checked).map(item => item.id)
        this.method(this.form).then(res => {
          showToast('success', 'Muvaffaqiyatli saqlandi', 'CheckCircleIcon')
          this.$router.push({ name: 'house-index' })
        }).finally(() => {
          this.loading = false
        })
      } else {
        showToast('warning', 'Talab qilingan maydonlarni to\'ldiring')
      }
    },
    setForm(data) {
      this.form.id = data.id
      this.form.number = data.number
      this.form.address = data.address
      this.services.forEach(item => {
        const type = data.payment_types.find(i => i.service_id === item.id)
        const checked = !! data.payment_types.find(i => i.service_id === item.id)
        this.form.payment_types_ids.push({ checked, id: checked ? type.id : item.default_payment_type.id })
      })
    },
    ...mapActions({
      getItem: 'flat/show',
      getServices: 'service/index',
    }),
  },
}
</script>

<style scoped>

</style>
