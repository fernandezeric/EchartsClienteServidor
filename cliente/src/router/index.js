import Vue from 'vue'
import Router from 'vue-router'

import PruebaSVG from '@/components/PruebaSVG'
import PruebaPNG from '@/components/PruebaPNG'
import HelloWorld from '@/components/HelloWorld'
import PruebaCliente from '@/components/PruebaCliente'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/svg',
      name: 'PruebaSVG',
      component: PruebaSVG
    },
    {
      path: '/png',
      name: 'PruebaPNG',
      component: PruebaPNG
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/cliente',
      name: 'PruebaCliente',
      component: PruebaCliente
    }
  ]
})
