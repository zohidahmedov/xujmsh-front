import { showToast } from '@/utils/toast'

export function errorsAlert(error) {
  if (error && error.data && error.data.message) {
    showToast('danger', `${error.status} : ${error.data.message}`)
  }
}
