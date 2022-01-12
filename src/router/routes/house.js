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
    path: '/houses/create',
    name: 'house-create',
    component: () => import('@/views/house/save.vue'),
    meta: {
      middleware: 'Auth',
      pageTitle: 'Uy qo\'shish',
      breadcrumb: [
        {
          text: 'Uy qo\'shish',
          active: true,
        },
      ],
    },
  },
  {
    path: '/houses/:id/edit',
    name: 'house-update',
    component: () => import('@/views/house/save.vue'),
    meta: {
      middleware: 'Auth',
      pageTitle: 'Uyni tahrirlash',
      breadcrumb: [
        {
          text: 'Uyni tahrirlash',
          active: true,
        },
      ],
    },
  },
  {
    path: '/houses/:id',
    name: 'house-show',
    component: () => import('@/views/house/save.vue'),
    meta: {
      middleware: 'Auth',
      pageTitle: 'Uyni ko\'rish',
      breadcrumb: [
        {
          text: 'Uyni ko\'rish',
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
