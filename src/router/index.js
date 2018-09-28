import Vue from 'vue'
import Router from 'vue-router'
import SqlLib from '@/pages/SqlLib'
import Index from '@/pages/Index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sqllib',
      name: 'SqlLib',
      component: SqlLib
    },
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
