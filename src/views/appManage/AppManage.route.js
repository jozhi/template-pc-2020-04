const AppManage = () => import('./AppManage')
const AppDetails = () => import('./AppDetails')
const AppFormEditor = () => import('./AppFormEditor')


export default [
  {
    path: '/AppManage',
    name: 'AppManage',
    meta: {title: '应用管理'},
    component: AppManage
  },
  {
    path: '/AppDetails',
    name: 'AppDetails',
    meta: {title: '应用详情'},
    component: AppDetails
  },
  {
    path: '/AppFormEditor',
    name: 'AppFormEditor',
    meta: {title: '表单编辑'},
    component: AppFormEditor
  },
]

