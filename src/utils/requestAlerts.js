import store from '@/store'
import errors from '@/utils/errors'

export function errorsAlert(error) {
  console.log('errorPushed', error)
  if (error && error.data && error.data.code) {
    const message = getMessage(error.data.code)
    if (message) {
      store.dispatch('alert/pushError', { message, code: error.data.code })
    } else if (!message && error.data.message) {
      store.dispatch('alert/pushError', { message: error.data.message, code: error.data.code })
    }
  } else if (error.status && error.statusText) {
    if (error.data.error && (error.data.error == 'invalid_credentials')) {
      store.dispatch('alert/pushError', { message: errors[401], code: 401 })
    } else if (error.data && error.data.message) {
      store.dispatch('alert/pushError', { message: error.data.message, code: error.status })
    } else {
      store.dispatch('alert/pushError', { message: error.statusText, code: error.status })
    }
  }
}

function getMessage(code) {
  const error = getErrorByCode(code)
  return error.name
}

function getErrorByCode(code) {
  switch (code) {
    case 401: return ''
  }
}
