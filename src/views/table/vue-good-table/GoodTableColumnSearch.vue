<template>
  <b-card>
    <!-- table -->
    <template #header>
      <div class="w-100">
        <b-button
          variant="primary"
          class="float-right mb-2"
          @click="$emit('add')"
        >
          <feather-icon icon="PlusIcon" />
          {{ modelName }} qo'shish
        </b-button>
      </div>
    </template>
    <vue-good-table
      mode="remote"
      :columns="columns"
      :rows="items"
      :rtl="direction"
      :total="total"
      :pagination-options="{
        enabled: true,
        perPage: filter.per_page
      }"
      @on-column-filter="onColumnFilter"
    >
      <template
        slot="table-row"
        slot-scope="props"
      >
        <span v-if="props.column.field === 'row_number'">
          {{ getRowNumber(props.index) }}
        </span>
        <span v-else-if="props.column.field === 'name'">
          <b-link :to="{ name: 'organization-show', params: { tin: props.row.tin }, query: { company_name: props.row.name, territory_level_id: props.row.territory_level_id } }">{{ props.row.name }}</b-link>
        </span>
        <span v-else-if="props.column.field === 'action'">
          <span>
            <b-dropdown
              variant="link"
              toggle-class="text-decoration-none"
              no-caret
            >
              <template v-slot:button-content>
                <feather-icon
                  icon="MoreVerticalIcon"
                  size="16"
                  class="text-body align-middle mr-25"
                />
              </template>
              <b-dropdown-item @click="$emit('edit', props.row)">
                <feather-icon
                  icon="Edit2Icon"
                  class="mr-50"
                />
                <span>Tahrirlash</span>
              </b-dropdown-item>
              <b-dropdown-item @click="$emit('delete', props.row.id)">
                <feather-icon
                  icon="TrashIcon"
                  class="mr-50"
                />
                <span>O'chirish</span>
              </b-dropdown-item>
            </b-dropdown>
          </span>
        </span>
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>
      <template
        slot="pagination-bottom"
        slot-scope="props"
      >
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap">
              Showing 1 to
            </span>
            <b-form-select
              v-model="filter.per_page"
              :options="['3','5','10']"
              class="mx-1"
              @input="(value)=> filter.per_page = value"
            />
            <span class="text-nowrap "> of {{ total }} entries </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="total"
              :per-page="filter.per_page"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="onPageChange"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
      <div slot="emptystate">
        <div class="w-100 text-center">
          {{ $t('Маълумот йўқ') }}
        </div>
      </div>
    </vue-good-table>
  </b-card>
</template>

<script>
import {
  BPagination, BFormSelect, BCard, BLink, BButton, BDropdown, BDropdownItem
} from 'bootstrap-vue'
import { VueGoodTable } from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'
import store from '@/store/index'

export default {
  components: {
    BCard,
    BLink,
    VueGoodTable,
    BPagination,
    BFormSelect,
    BButton,
    BDropdown,
    BDropdownItem,
  },
  props: {
    columns: {
      type: Array,
      default() {
        return []
      },
    },
    items: {
      type: Array,
      default() {
        return []
      },
    },
    filter: {
      type: Object,
      default() {
        return {}
      },
    },
    total: {
      type: Number,
      default() {
        return 0
      },
    },
    page: {
      type: Number,
      default() {
        return 1
      },
    },
    modelName: {
      type: String,
      default() {
        return ''
      },
    },
  },
  data() {
    return {
      dir: false,
    }
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.dir = true
        return this.dir
      }
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.dir = false
      return this.dir
    },
  },
  methods: {
    onColumnFilter(params) {
      this.columns.filter(item => (item.filterOptions && item.filterOptions.enabled)).forEach(item => {
        if (item.filterOptions.filterDropdownItems) {
          const field = item.field.split('.')[0] + '_id'
          this.filter[field] = params.columnFilters[item.field] ? params.columnFilters[item.field] : null
        } else {
          this.filter[item.field] = params.columnFilters[item.field] ? params.columnFilters[item.field] : null
        }
      })
      this.$emit('getItems')
    },
    onPageChange(page) {
      this.$emit('onPageChange', page)
    },
    getRowNumber(index) {
      return ((this.page - 1) * this.filter.per_page) + index + 1
    },
  },
}
</script>
