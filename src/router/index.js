import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = () => import('@/pages/index')

const Board = () => import('@/pages/board')
const BoardList = () => import('@/pages/boardlist')
const Slice = () => import('@/pages/slice')
const SliceList = () => import('@/pages/slicelist')
const SqlLib = () => import('@/pages/sqlLib')

// 所属首页面的子路有放在这里
const IndexChildren = [
  { path: '', component: BoardList },
  { path: 'sqllib', component: SqlLib },
  { path: 'board', component: Board },
  { path: 'boardlist', component: BoardList },
  { path: 'slice', component: Slice },
  { path: 'slicelist', component: SliceList }
]

const routes = [
  {
    path: '/',
    component: Index,
    children: IndexChildren
  }
]

export default new Router({ routes })
