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
  {
    path: '/services',
    name: 'service-index',
    component: () => import('@/views/service/index.vue'),
    meta: {
      middleware: 'Auth',
      pageTitle: 'Xizmatlar ro\'yxati',
      breadcrumb: [
        {
          text: 'Xizmatlar ro\'yxati',
          active: true,
        },
      ],
    },
  },
]
