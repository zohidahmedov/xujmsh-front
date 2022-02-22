export default [
  {
    path: '/flats',
    name: 'flat-index',
    component: () => import('@/views/flat/index.vue'),
    meta: {
      middleware: 'Auth',
      pageTitle: 'Xonadonlar ro\'yxati',
      breadcrumb: [
        {
          text: 'Xonadonlar ro\'yxati',
          active: true,
        },
      ],
    },
  },
  {
    path: '/flats/:id',
    name: 'flat-show',
    component: () => import('@/views/flat/show.vue'),
    meta: {
      middleware: 'Auth',
      pageTitle: 'Xonadonni ko\'rish',
      breadcrumb: [
        {
          text: 'Xonadonni ko\'rish',
          active: true,
        },
      ],
    },
  },
]
