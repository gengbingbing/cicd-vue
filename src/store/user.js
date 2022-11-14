/*
 * @Author: bingbing.geng
 * @Date: 2022-11-14 08:43:40
 * @LastEditTime: 2022-11-14 09:22:56
 * @FilePath: \cicd-vue\src\store\user.js
 */
import { defineStore } from 'pinia'

export const useUsersStore = defineStore('users', {
  state: () => {
    return {
      name: '初始化store数据',
      userId: '001',
      phone: '13149285015',
      ages: '18'
    }
  },
  getters: {
    getNewAges: (state) => {
      return state.ages * 2
    },
    getBaseInfo: (state) => {
      return `${state.name}: ${state.ages}`
    }
  },
  actions: {
    saveBaseInfo(info) {
      this.name = info.name
      this.ages = info.ages
    }
  }
})