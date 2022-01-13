export const mutations = {
  SET_ITEM: (state, item) => {
    state.item = item
  },
  SET_CALCULATING_TYPES: (state, items) => {
    state.calculating_types = items
  },
  SET_ITEMS: (state, items) => {
    state.items = {
      data: items.data,
      total: items.total,
      page: items.current_page,
      per_page: items.per_page,
    }
  },
}
