<!--
 * @Author: bingbing.geng
 * @Date: 2022-11-03 08:41:04
 * @LastEditTime: 2022-11-03 14:47:06
 * @FilePath: \cicd-vue\src\pages\article\addArticle.vue
-->
<template>
  <div class="add-article">
    <h1>{{ ids ? '编辑文章' : '新增文章' }}</h1>
    <div style="border: 1px solid #ccc">
      <el-input class="title" v-model="title" placeholder="文章标题" clearable />
      <el-input class="title author" v-model="author" placeholder="作者" clearable />
      <el-select v-model="categoryId" class="title author" style="width: 100%;" placeholder="文章分类" size="large">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <Toolbar
        style="border-bottom: 1px solid #ccc; border-top: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
      <div class="footer">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button @click="reset">重置</el-button>
        <el-button @click="goBack">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css

import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { postSave, getArticleById, postUpdate } from '@/api/article';
import { ElMessage } from 'element-plus';

const router=useRouter()

const title = ref('')
const author = ref('')
const categoryId = ref('')
const ids = ref('')

const goBack = () => {
  router.go(-1)
}

const options = [
  {
    value: 0,
    label: '前端'
  },
  {
    value: 1,
    label: '后端'
  },
  {
    value: 2,
    label: '测试'
  },
  {
    value: 3,
    label: '需求'
  },
  {
    value: 4,
    label: '框架'
  },
  {
    value: 5,
    label: '管理'
  },
]
const submit = async () => {
  console.log(title.value, valueHtml.value)
  const date = new Date()
  const time = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  const id = router.currentRoute._value.query.id
  const params = {
    id: id,
    author: author.value,
    title: title.value,
    content: valueHtml.value,
    categoryId: categoryId.value,
    createBy: author.value,
    updataBy: author.value,
    createTime: time,
    updataTime: time,
  }
  let res = {}
  if(router.currentRoute._value.query.id) {
    res = await postUpdate(params)
  } else {
    res = await postSave(params)
  }
  if(res.state) {
    ElMessage.success('保存成功')
    router.go(-1)
  }
}

const reset = () => {
  title.value = ''
  author.value = ''
  valueHtml.value = ''
}


// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref('')

// 模拟 ajax 异步获取内容
onMounted(async () => {
    const id = router.currentRoute._value.query.id

    ids.value = id
    
    const res = await getArticleById(id)
    title.value = res.title
    author.value = res.author
    categoryId.value = res.categoryId
    valueHtml.value = res.content
})

const toolbarConfig = {}
const editorConfig = { placeholder: '请输入内容...' }

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
</script> 

<style lang="less" scoped>
.add-article {
  padding: 24px;
  h1 {
    text-align: left;
    margin: 12px 0;
    font-size: 28px;
    font-weight: bold;
  }
  .title {
    border: 0px;
    height: 50px;
    border-radius: 0px;
    /deep/.el-input__wrapper {
      box-shadow: 0 0 0 0px inset;
    }
  }
  .author {
    border-top: 1px solid #ccc;
  }
  .footer {
    border-top: 1px solid #ccc;
    padding: 6px;
    text-align: end;
  }
}
</style>
