/*
 * @Author: bingbing.geng
 * @Date: 2022-11-02 09:56:20
 * @LastEditTime: 2022-11-02 10:07:12
 * @FilePath: \cicd-vue\src\router.js
 */
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/job',
      component: () => import('@/pages/ConfigList/index.vue'),
      name: 'job',
      meta: {
        menu: false
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/job'
    }
  ]
})

export default router