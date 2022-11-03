/*
 * @Author: bingbing.geng
 * @Date: 2022-11-02 09:56:20
 * @LastEditTime: 2022-11-03 08:58:24
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
      path: '/articleList',
      component: () => import('@/pages/article/articleList.vue'),
      name: 'article',
      meta: {
        menu: false
      }
    },
    // {
    //   path: '/:pathMatch(.*)*',
    //   redirect: '/job'
    // }
  ]
})

export default router