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
              <td class="text-primary">{{ item.billing_number }}</td>
            </tr>
            <tr>
              <th>Uy raqami</th>
              <td class="text-primary">{{ item.house.number }}</td>
            </tr>
            <tr>
              <th>Xonadon raqami</th>
              <td class="text-primary">{{ item.number }}</td>
            </tr>
            <tr>
              <th>FISH</th>
              <td class="text-primary">{{ item.full_name }}</td>
            </tr>
            <tr>
              <th>Telefon raqami</th>
              <td class="text-primary">{{ item.phone }}</td>
            </tr>
            <tr>
              <th>Yashovchilar soni</th>
              <td class="text-primary">{{ item.members_count }} ta</td>
            </tr>
            <tr>
              <th>Umumiy maydoni</th>
              <td class="text-primary">{{ item.area }} m <sup>2</sup></td>
            </tr>
          </table>
        </b-card-body>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BCard, BCardHeader, BCardTitle, BCardBody, BButton, BDropdownItem, BDropdown
} from 'bootstrap-vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Show',
  components: {
    BRow, BCol, BCard, BCardHeader, BCardTitle, BButton, BDropdownItem, BDropdown, BCardBody,
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    ...mapGetters({ item: 'flat/GET_ITEM' }),
    id() {
      return this.$route.params.id
    },
  },
  created() {
    this.getItem(this.id)
  },
  methods: {
    ...mapActions({ getItem: 'flat/show' }),
  },
}
</script>

<style scoped>

</style>
