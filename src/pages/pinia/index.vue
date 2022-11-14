<!--
 * @Author: bingbing.geng
 * @Date: 2022-11-14 08:47:54
 * @LastEditTime: 2022-11-14 09:25:02
 * @FilePath: \cicd-vue\src\pages\pinia\index.vue
-->
<template>
  <div class="pinia">
    <h1>{{ name }} - {{ userId }} - {{ phone }} - {{ ages }}</h1>
    <h2>新年龄：{{ store.getNewAges }}</h2>
    <h2>基本信息：{{ store.getBaseInfo }}</h2>
    <el-button @click="handChangeBaseInfo">actions修改store中基本信息</el-button>
    <el-button @click="handChange">修改store中name数据</el-button>
    <el-button @click="handAllChange">批量修改store的数据</el-button>
    <el-button @click="handReset">重置store数据</el-button>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useUsersStore } from '../../store/user'

const store = useUsersStore();

const { name, userId, phone, ages } = storeToRefs(store);

const handChange = () => {
  store.name = '张三'
  console.log(store)
}

const handAllChange = () => {
  store.$patch({
    name: '李四',
    phone: '18895254557',
    ages: 22
  })
}

const handChangeBaseInfo = () => {
  store.saveBaseInfo({
    name: '王五',
    ages: '33'
  })
}

const handReset = () => {
  store.$reset();
}

</script>

<style lang="less" scoped>
.pinia {
  width: 100%;
  padding: 24px;

  h1 {
    font-size: 32px;
    font-weight: bold;
  }
}
</style>