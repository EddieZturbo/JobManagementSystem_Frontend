import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import AuthLayout from '../layouts/AuthLayout.vue'
import AppLayout from '../layouts/AppLayout.vue'
import Page404Layout from '../layouts/Page404Layout.vue'
import fileUpload from '../pages/admin/forms/form-elements/FormElements.vue'

import RouteViewComponent from '../layouts/RouterBypass.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'charts' },
  },
  {
    name: 'admin',
    path: '/admin',
    component: AppLayout,
    children: [
      {
        name: 'dashboard',
        path: 'dashboard',
        component: () => import('../pages/admin/maps/maplibre-maps/FileReview.vue'),
      },
      {
        name: 'statistics',
        path: 'jobStatisticChart',
        component: RouteViewComponent,
        children: [
          {
            name: 'charts',
            path: 'charts',
            component: () => import('../pages/admin/jobStatisticChart/charts/commitSituation.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Charts',
            },
          },
          {
            name: 'progress-bars',
            path: 'progress-bars',
            component: () => import('../pages/admin/jobStatisticChart/charts/ProgressBars.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
            },
          },
          {
            name: 'progress-bars-1',
            path: 'progress-bars-1',
            component: () => import('../pages/admin/jobStatisticChart/charts/ProgressBars1.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
            },
          },
          {
            name: 'progress-bars-2',
            path: 'progress-bars-2',
            component: () => import('../pages/admin/jobStatisticChart/charts/ProgressBars2.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
            },
          },
          {
            name: 'progress-bars-3',
            path: 'progress-bars-3',
            component: () => import('../pages/admin/jobStatisticChart/charts/ProgressBars3.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
            },
          },
          {
            name: 'progress-bars-4',
            path: 'progress-bars-4',
            component: () => import('../pages/admin/jobStatisticChart/charts/ProgressBars4.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
            },
          },
        ],
      },
      {
        name: 'forms',
        path: 'forms',
        component: fileUpload,
        meta: {
          wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/inputs',
        },
      },
      {
        name: 'maps',
        path: 'maps',
        component: () => import('../pages/admin/maps/maplibre-maps/MapLibreMapsPage.vue'),
      },
      {
        name: 'tables',
        path: 'summaryTable',
        component: RouteViewComponent,
        children: [
          {
            name: 'markup',
            path: 'markup',
            component: () => import('../pages/admin/summaryTable/summary-tables/summaryTable.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Tables',
            },
          },
        ],
      },
      {
        name: 'ui',
        path: 'ui',
        component: RouteViewComponent,
        children: [
          {
            name: 'lists',
            path: 'lists',
            component: () => import('../pages/admin/ui/ui/Lists.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Charts',
            },
          },
          {
            name: 'tree-view',
            path: 'tree-view',
            component: () => import('../pages/admin/ui/ui/tree-view.vue'),
            meta: {
              wikiLink: 'https://github.com/epicmaxco/vuestic-admin/wiki/Progress-Bars',
            },
          },
        ],
      },
      {
        name: 'pages',
        path: 'pages',
        component: RouteViewComponent,
        children: [
          {
            name: '404-pages',
            path: '404-pages',
            component: () => import('../pages/admin/pages/404PagesPage.vue'),
          },
          {
            name: 'faq',
            path: 'faq',
            component: () => import('../pages/admin/pages/FaqPage.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    component: AuthLayout,
    children: [
      {
        name: 'login',
        path: 'login',
        component: () => import('../pages/auth/login/Login.vue'),
      },
      {
        name: 'signup',
        path: 'signup',
        component: () => import('../pages/auth/signup/Signup.vue'),
      },
      {
        name: 'recover-password',
        path: 'recover-password',
        component: () => import('../pages/auth/recover-password/RecoverPassword.vue'),
      },
      {
        path: '',
        redirect: { name: 'login' },
      },
    ],
  },
  {
    path: '/404',
    component: Page404Layout,
    children: [
      {
        name: 'not-found-advanced',
        path: 'not-found-advanced',
        component: () => import('../pages/404-pages/VaPageNotFoundSearch.vue'),
      },
      {
        name: 'not-found-simple',
        path: 'not-found-simple',
        component: () => import('../pages/404-pages/VaPageNotFoundSimple.vue'),
      },
      {
        name: 'not-found-custom',
        path: 'not-found-custom',
        component: () => import('../pages/404-pages/VaPageNotFoundCustom.vue'),
      },
      {
        name: 'not-found-large-text',
        path: '/pages/not-found-large-text',
        component: () => import('../pages/404-pages/VaPageNotFoundLargeText.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    // For some reason using documentation example doesn't scroll on page navigation.
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    } else {
      document.querySelector('.app-layout__page')?.scrollTo(0, 0)
    }
  },
  routes,
})

export default router
