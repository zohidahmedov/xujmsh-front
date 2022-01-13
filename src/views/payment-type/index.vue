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
        model-name="To'lov turi"
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
import Save from './save.vue'
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
        service_id: null,
        name: null,
        amount: null,
      },
      columns: [
        {
          label: '#',
          field: 'row_number',
        },
        {
          label: 'Xizmat nomi',
          field: 'service.name',
          filterOptions: {
            enabled: true,
            placeholder: 'Xizmat nomi',
            filterDropdownItems: [],
          },
        },
        {
          label: 'Tavsif',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: 'Tavsif',
          },
        },
        {
          label: 'Narxi (so\'m)',
          field: 'amount',
          filterOptions: {
            enabled: true,
            placeholder: 'Narxi',
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
      items: 'paymentType/GET_ITEMS',
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
    this.getServices({}).then(res => {
      this.columns.map(item => {
        if (item.field === 'service.name') {
          item.filterOptions.filterDropdownItems = res.data.data.map(i => {
            i.value = i.id
            i.text = i.name
            return i
          })
        }
      })
    })
  },
  methods: {
    ...mapActions({ getItemsAction: 'paymentType/index', destroyAction: 'paymentType/destroy', getServices: 'service/index' }),
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
          if (value) {
            this.destroyAction(id).then(res => {
              showToast('success', 'Muvaffaqiyatli o\'chirildi')
              this.getItems()
            }).catch(() => {
              showToast('success', 'Muvaffaqiyatli o\'chirildi')
            })
          }
        })
    },
  },
}
</script>

<style scoped>

</style>
