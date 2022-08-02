const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },
  {
    path: '/auth',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/auth/loginPage.vue') },
      {
        path: 'register',
        component: () => import('pages/auth/registerPage.vue')
      },
      { path: 'userInfo', component: () => import('pages/auth/userPage.vue') }
    ]
  },
  {
    path: '/zones',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/zones/zonesPage.vue')
      },
      {
        path: 'devices',
        component: () => import('pages/zones/devicesPage.vue')
      }
    ]
  },
  {
    path: '/logs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'eventlogs',
        component: () => import('src/pages/logs/eventLogs.vue')
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'users',
        component: () => import('pages/admin/usersPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
