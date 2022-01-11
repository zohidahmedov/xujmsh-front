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
]
