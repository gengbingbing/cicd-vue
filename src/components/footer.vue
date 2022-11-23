<!--
 * @Author: bingbing.geng
 * @Date: 2022-11-15 09:25:59
 * @LastEditTime: 2022-11-23 12:56:28
 * @FilePath: \cicd-vue\src\components\footer.vue
-->
<template>
  <div class="footer">
    <div class="text">Copyright © 2022-2023 Bingyun. All Rights Reserved. 冰云 版权所有</div>
    <div class="text">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=61011602000512" style="vertical-align: middle;display:inline-block;text-decoration:none;height:20px;line-height:20px;">
        <img src="../assets/ico.png" style="float:left;"/>
        <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">陕公网安备 61011602000512号</p>
      </a>&nbsp;&nbsp; |&nbsp;&nbsp; 陕ICP备2022013092号
    </div>
  </div>
</template>

<script setup>
console.log('--------------')
</script>

<style lang="less" scoped>
.footer {
  background: #FFFFFF;
  height: 80px;
  margin-top: 30px;
  line-height: 80px;
  width: 100%;
  .text {
    text-align: center;
    color: #999;
    font-size: 12px;
    line-height: 26px;
  }
}
</style>