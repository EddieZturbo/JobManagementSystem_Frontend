export interface INavigationRoute {
  name: string
  displayName: string
  meta: { icon: string }
  children?: INavigationRoute[]
}

export default {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'statistics',
      displayName: '作业情况管理',
      meta: {
        icon: 'vuestic-iconset-forms',
      },
      disabled: true,
      children: [
        {
          name: 'charts',
          displayName: '作业提交情况',
        },
        {
          name: 'progress-bars',
          displayName: '作业批改情况',
        },
        {
          name: 'progress-bars-1',
          displayName: '综述年份引用情况',
        },
        {
          name: 'progress-bars-2',
          displayName: '作业平均分',
        },
        {
          name: 'progress-bars-3',
          displayName: '作业评判标准',
        },
        {
          name: 'progress-bars-4',
          displayName: '作业数据篇幅分布情况',
        },
        {
          name: 'progress-bars-6',
          displayName: '作业完成用时情况',
        },
      ],
    },
    {
      name: 'tables',
      displayName: '作业数据分析管理',
      meta: {
        icon: 'vuestic-iconset-tables',
      },
      children: [
        {
          name: 'markup',
          displayName: '作业数据汇总',
        },
      ],
    },
    {
      name: 'works',
      displayName: '作业管理',
      meta: {
        icon: 'vuestic-iconset-forms',
      },
      disabled: true,
    },
    {
      name: 'maps',
      displayName: '作业批改',
      meta: {
        icon: 'vuestic-iconset-forms',
      },
      disabled: true,
    },
    {
      name: 'forms',
      displayName: '作业提交',
      meta: {
        icon: 'vuestic-iconset-forms',
      },
      disabled: true,
    },
    {
      name: 'files',
      displayName: '文件提交',
      meta: {
        icon: 'vuestic-iconset-forms',
      },
      disabled: true,
    },
    {
      name: 'ui',
      displayName: '抄袭检测管理',
      meta: {
        icon: 'vuestic-iconset-ui-elements',
      },
      disabled: true,
      children: [
        {
          name: 'lists',
          displayName: '抄袭检测',
        },
        // {
        //   name: 'tree-view',
        //   displayName: '汇总数据',
        // },
      ],
    },
  ] as INavigationRoute[],
}
