import { setItem } from '@/utils/storage'

export const mutations = {
  SET_USER: (state, user) => {
    state.user = user
    if (state.user) {
      setItem('user', state.user)
    }
  },
  SET_IS_AUTH: (state, value) => {
    state.is_auth = value
  },
}
