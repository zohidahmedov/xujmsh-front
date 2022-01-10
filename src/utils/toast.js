import vue from 'vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export function showToast(type, message, icon) {
  if (!icon) {
    switch (type) {
      case 'success': icon = 'CheckCircleIcon'; break
      case 'danger': icon = 'XIcon'; break
      case 'warning': icon = 'AlertTriangleIcon'; break
    }
  }
  vue.$toast({
    component: ToastificationContent,
    props: {
      title: message,
      icon,
      variant: type,
    },
  })
}
