import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import ecommerceStoreModule from '@/views/apps/e-commerce/eCommerceStoreModule'
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'
import alert from './alert'
import auth from './auth'
import house from './house'
import flat from './flat'
import service from './service'
import paymentType from './payment-type'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    alert,
    auth,
    house,
    flat,
    service,
    paymentType,
    'app-ecommerce': ecommerceStoreModule,
  },
  strict: process.env.DEV,
})
