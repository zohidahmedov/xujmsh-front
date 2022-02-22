<template>
  <b-card>
    <b-overlay :show="loading">
      <good-table-column-search
        :items="items.data"
        :columns="columns"
        :total="items.total"
        :page="page"
        :filter="filterModel"
        model-name="Uy"
        :has-show="true"
        model="house"
        @getItems="getItems"
        @add="$router.push({ name: 'house-create' })"
        @edit="(item) => { return $router.push({ name: 'house-update', params: { id: item.id } }) }"
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
import { showToast } from '@/utils/toast'
export default {
  name: 'Index',
  components: {
    GoodTableColumnSearch, BCard, BOverlay,
  },
  data() {
    return {
      page: 1,
      loading: false,
      filterModel: {
        per_page: 10,
        number: null,
        address: null,
      },
      columns: [
        {
          label: '#',
          field: 'row_number',
        },
        {
          label: 'Uy raqami',
          field: 'number',
          showField: true,
          filterOptions: {
            enabled: true,
            placeholder: '188-A',
          },
        },
        {
          label: 'Uy manzili',
          field: 'address',
          filterOptions: {
            enabled: true,
            placeholder: 'Navoiy shaxri, Tinchlik ko\'chasi',
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
      items: 'house/GET_ITEMS',
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
  },
  methods: {
    ...mapActions({ getItemsAction: 'house/index', destroyAction: 'house/destroy' }),
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
