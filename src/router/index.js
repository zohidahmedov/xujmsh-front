import Vue from 'vue'
import VueRouter from 'vue-router'
import middlewares from './middlewares'
import { checkTokenTime } from '@/utils/auth'
import store from '@/store/'
// Routes
import apps from './routes/apps'
import dashboard from './routes/dashboard'
import uiElements from './routes/ui-elements/index'
import pages from './routes/pages'
import chartsMaps from './routes/charts-maps'
import formsTable from './routes/forms-tables'
import others from './routes/others'
import house from './routes/house'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: { name: 'dashboard-ecommerce' } },
    ...apps,
    ...dashboard,
    ...pages,
    ...chartsMaps,
    ...formsTable,
    ...uiElements,
    ...others,
    ...house,
    {
      path: '*',
      redirect: 'error-404',
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.middleware) {
    if (middlewares[to.meta.middleware]) {
      const $res = middlewares[to.meta.middleware](store)
      if (!$res || !checkTokenTime()) {
        return next({ name: 'auth-login' })
      }
    }
  }
  return next()
})

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})

export default router
