import { getToken } from '@/utils/auth'
import { getItem } from '@/utils/storage'

let user = getItem('user');
export const state = {
  is_auth: getToken()?true:false,
  user: user,
  services: null,
}
