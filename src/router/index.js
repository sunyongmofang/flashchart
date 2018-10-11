import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('@/pages/Index')
const SqlLib = () => import('@/pages/SqlLib')
const Slice = () => import('@/pages/Slice')

// 所属首页面的子路有放在这里
const IndexChildren = [
  { path: '', component: Slice },
  { path: 'sqllib', component: SqlLib },
  { path: 'slice', component: Slice }
]

const routes = [
  {
    path: '/',
    component: Index,
    children: IndexChildren
  }
]

export default new Router({ routes })
