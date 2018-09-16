import Vue from 'vue'
import Router from 'vue-router'
import SqlLib from '@/pages/SqlLib'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SqlLib',
      component: SqlLib
    }
  ]
})
