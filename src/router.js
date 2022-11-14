/*
 * @Author: bingbing.geng
 * @Date: 2022-11-02 09:56:20
 * @LastEditTime: 2022-11-14 08:53:14
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
      name: 'articleList',
      meta: {
        menu: false
      }
    },
    {
      path: '/addArticle',
      component: () => import('@/pages/article/addArticle.vue'),
      name: 'article',
      meta: {
        menu: false
      }
    },
    {
      path: '/webSocket',
      component: () => import('@/pages/webSocket/index.vue'),
      name: 'webSocket',
      meta: {
        menu: false
      }
    },
    {
      path: '/pinia',
      component: () => import('@/pages/pinia/index.vue'),
      name: 'pinia',
      meta: {
        menu: true
      }
    },
    {
      path: '/',
      redirect: '/articleList'
    }
  ]
})

export default router