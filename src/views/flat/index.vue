<template>
  <b-card>
    <save
      ref="saveForm"
      @onSuccess="getItems"
    />
    <b-overlay :show="loading">
      <good-table-column-search
        :items="items.data"
        :columns="columns"
        :total="items.total"
        :page="page"
        :filter="filterModel"
        :has-show="true"
        model="flat"
        model-name="Xonadon"
        @getItems="getItems"
        @add="$refs.saveForm.visible = true"
        @edit="(item) => $refs.saveForm.edit(item)"
        @delete="destroy"
        @onPageChange="(p) => page = p"
      />
    </b-overlay>
  </b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BCard, BOverlay } from 'bootstrap-vue'
import GoodTableColumnSearch from '../table/vue-good-table/GoodTableColumnSearch.vue'
import Save from './save'
import { showToast } from '@/utils/toast'
export default {
  name: 'Index',
  components: {
    GoodTableColumnSearch, BCard, Save, BOverlay,
  },
  data() {
    return {
      page: 1,
      loading: false,
      filterModel: {
        per_page: 10,
        number: null,
        house_number: null,
        address: null,
      },
      columns: [
        {
          label: '#',
          field: 'row_number',
        },
        {
          label: 'Shaxsiy raqam',
          field: 'billing_number',
          filterOptions: {
            enabled: true,
            placeholder: '00000000',
          },
        },
        {
          label: 'Uy raqami',
          field: 'house.number',
          filterOptions: {
            enabled: true,
            placeholder: 'Barchasi',
            filterDropdownItems: [],
          },
        },
        {
          label: 'Xonadon raqami',
          field: 'number',
          filterOptions: {
            enabled: true,
            placeholder: '1',
          },
          showField: true,
        },
        {
          label: 'FISH',
          field: 'full_name',
          filterOptions: {
            enabled: true,
            placeholder: 'Eshmatov Toshmat',
          },
        },
        {
          label: 'Telefon raqami',
          field: 'phone',
          filterOptions: {
            enabled: true,
            placeholder: '+998901234567',
          },
        },
        {
          label: 'Yashovchilar soni',
          field: 'members_count',
          filterOptions: {
            enabled: true,
            placeholder: '2',
          },
        },
        {
          label: 'Umumiy maydoni',
          field: 'area',
          filterOptions: {
            enabled: true,
            placeholder: '25.5',
          },
        },
        {
          label: 'Amal',
          field: 'action',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      items: 'flat/GET_ITEMS',
    }),
  },
  watch: {
    page(newVal, oldVal) {
      if (newVal && newVal !== oldVal) this.getItems()
    },
    'filterModel.per_page'(newVal, oldVal) {
      if (newVal && newVal !== oldVal) this.getItems()
    },
  },
  created() {
    this.getItems()
    this.getHouses({ per_page: 999 }).then(res => {
      this.columns.map(item => {
        if (item.field === 'house.number') {
          item.filterOptions.filterDropdownItems = res.data.data.map(i => {
            i.value = i.id
            i.text = i.number
            return i
          })
        }
      })
    })
  },
  methods: {
    ...mapActions({ getItemsAction: 'flat/index', destroyAction: 'flat/destroy', getHouses: 'house/index' }),
    async getItems() {
      this.loading = true
      await this.getItemsAction({ ...this.filterModel, page: this.page })
      this.loading = false
    },
    destroy(id) {
      this.$bvModal
        .msgBoxConfirm('Rostan ham o\'chirmoqchimisiz', {
          title: 'Tasdiqlang',
          size: 'sm',
          variant: 'warning',
          okVariant: 'primary',
          okTitle: 'Ha',
          cancelTitle: 'Yo\'q',
          cancelVariant: 'outline-secondary',
          hideHeaderClose: false,
          centered: true,
        })
        .then(value => {
          this.destroyAction(id).then(res => {
            showToast('success', 'Muvaffaqiyatli o\'chirildi')
            this.getItems()
          }).catch(() => {
            showToast('success', 'Muvaffaqiyatli o\'chirildi')
          })
        })
    },
  },
}
</script>

<style scoped>

</style>
