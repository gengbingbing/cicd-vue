/*
 * @Author: bingbing.geng
 * @Date: 2022-11-02 09:56:20
 * @LastEditTime: 2022-11-14 08:42:24
 * @FilePath: \cicd-vue\src\main.js
 */
import { createApp } from 'vue'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import 'element-plus/theme-chalk/dark/css-vars.css'
import App from './App.vue'
import router from './router'
import { createPinia } from "pinia";
const pinia = createPinia();



const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(pinia)

app.mount('#app')
