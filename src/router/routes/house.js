export default [
  {
    path: '/houses',
    name: 'house-index',
    component: () => import('@/views/house/index.vue'),
    meta: {
      middleware: 'Auth',
      pageTitle: 'Uylar ro\'yxati',
      breadcrumb: [
        {
          text: 'Uylar ro\'yxati',
          active: true,
        },
      ],
    },
  },
]
