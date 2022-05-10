export const mutations = {
  SET_ITEM: (state, item) => {
    state.item = item
  },
  SET_ITEMS: (state, items) => {
    state.items = {
      data: items.data,
    }
  },
}
