<template>
  <b-card>
    <save ref="saveForm" />
    <good-table-column-search
      :items="items.data"
      :columns="columns"
      :total="items.total"
      :page="page"
      :filter="filterModel"
      @getItems="getItems"
      @add="$refs.saveForm.visible = true"
      @edit="(id) => $refs.saveForm.edit(id)"
      @delete="destroy"
      @onPageChange="(p) => page = p"
    />
  </b-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { BCard } from 'bootstrap-vue'
import GoodTableColumnSearch from '../table/vue-good-table/GoodTableColumnSearch.vue'
import Save from './save'

export default {
  name: 'Index',
  components: {
    GoodTableColumnSearch, BCard, Save
  },
  data() {
    return {
      page: 1,
      filterModel: {
        per_page: 10,
        name: null,
      },
      columns: [
        {
          label: '#',
          field: 'number',
        },
        {
          label: 'Uy raqami',
          field: 'name',
          filterOptions: {
            enabled: true,
            placeholder: '188-A',
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
  },
  created() {
    this.getItems()
  },
  methods: {
    ...mapActions({ getItemsAction: 'house/index' }),
    async getItems() {
      this.loading = true
      await this.getItemsAction({ ...this.filterModel, page: this.page })
      this.loading = false
    },
    destroy(id) {

    }
  },
}
</script>

<style scoped>

</style>
