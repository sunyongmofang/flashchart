import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('@/pages/Index')
const SqlLib = () => import('@/pages/SqlLib')
const Slice = () => import('@/pages/Slice')
const Board = () => import('@/pages/Board')

// 所属首页面的子路有放在这里
const IndexChildren = [
  { path: '', component: Board },
  { path: 'sqllib', component: SqlLib },
  { path: 'board', component: Board },
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
