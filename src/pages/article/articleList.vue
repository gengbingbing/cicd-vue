<!--
 * @Author: bingbing.geng
 * @Date: 2022-11-03 08:40:34
 * @LastEditTime: 2022-11-03 11:34:42
 * @FilePath: \cicd-vue\src\pages\article\articleList.vue
-->
<template>
  <div class="articleList">
    <div class="title">文章列表</div>
    <el-button class="addArticle" type="primary" @click="handleAdd()">新建文章</el-button>
    <el-table :data="tableData" style="width: 100%" stripe border	tooltip-effect="light">
      <el-table-column 
        v-for="item in columns" 
        :key="item.prop" 
        :prop="item.prop" 
        :label="item.label" 
        show-overflow-tooltip
      >
        <template #default="scope">
          <div v-if="item.prop === 'categoryId'">{{ categoryMap[scope.row[item.prop]] }}</div>
          <div v-else-if="item.prop === 'title'" class="link" @click="openDetail(scope.row)">{{ scope.row[item.prop] }}</div>
          <div v-else>{{ scope.row[item.prop] }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button type="primary" link @click="handleEdit(scope.row)">编辑</el-button>
          <el-popconfirm title="确认删除该文章?" @confirm="handleDelete(scope.row)">
            <template #reference>
              <el-button type="danger" link>删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next, sizes, total"
      :total="searchParams.total" 
      :currentPage="searchParams.pageNo"
      :page-size="searchParams.pageSize"
      :page-sizes="[10, 20, 30, 50, 100]"
      @size-change="changeSize"
      @current-change="changeCurrent"
    />

    <el-drawer
      class="drawer"
      v-model="visable"
      :title="articleDetail.title"
      :before-close="handleClose"
      size="100%"
      direction="rtl"
    >
      <div class="base-info">
        <div>作者：{{ articleDetail.author }}</div>
        <div>时间：{{ articleDetail.time }}</div>
      </div>
      <div>
        {{ articleDetail.content }}
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue';
import { getList, postDelete, getArticleById } from '@/api/article';
import { ElMessage } from 'element-plus';

const visable = ref(false)
const articleDetail = reactive({
  title: '',
  content: '',
  time: '',
  author: '',
  link: '',
})
const handleClose = () => {
  articleDetail.title = ''
  articleDetail.content = ''
  articleDetail.time = ''
  articleDetail.author = ''
  articleDetail.link = ''
  visable.value = false
}

const getArticleData = async (id) => {
  try {
    const res = await getArticleById(id)
    articleDetail.title = res.title
    articleDetail.content = res.content
    articleDetail.time = res.updataTime
    articleDetail.author = res.author
    articleDetail.link = res.link[0]
    visable.value = true
  } catch (e) {
    ElMessage.error('文章查询失败')
  }
}

const handleAdd = () => {
  ElMessage.info('添加文章')
}

const handleEdit = () => {
  ElMessage.info('编辑文章')
}

const openDetail = (row) => {
  getArticleData(row._id)
}

const handleDelete = async (rowData) => {
  try {
    await postDelete({ id: rowData._id })
    ElMessage.success('文章删除成功')
    await initData()
  } catch (e) {
    ElMessage.error('文章删除失败')
  }
}

const changeSize = (val) => {
  searchParams.pageSize = val
  initData()
}

const changeCurrent = (val) => {
  searchParams.pageNo = val
  initData()
}

const searchParams = reactive({
  title: '',
  pageNo: 1,
  pageSize: 10,
  total: 0
})

const columns = reactive([
  {
    prop: '_id',
    label: 'ID',
    width: '180',
  },
  {
    prop: 'title',
    label: '文章标题',
    width: '180',
  },
  {
    prop: 'categoryId',
    label: '文章分类',
    width: '180',
  },
  {
    prop: 'author',
    label: '作者',
    width: '180',
  },
  {
    prop: 'updataTime',
    label: '发布时间',
    width: '180',
  }
])

const tableData = ref([])

const categoryMap = reactive({
  0: '前端',
  1: '后端',
  2: '测试',
  3: '需求',
  4: '框架',
  5: '管理',
})

const initData = async () => {
  const res = await getList(searchParams)
  tableData.value = res.list
  searchParams.total = res.total
}

onMounted(() => {
  initData()
})

</script>

<style lang="less" scoped>
.articleList {
  padding: 24px;
}
.addArticle {
  margin: 12px 0;
}
.title {
  margin: 12px;
  text-align: center;
  font-size: 32px;
  font-weight: bold;
}
.pagination {
  display: flex;
  justify-content: end;
  margin-top: 15px;
}

.link {
  color: #1E80EC;
  cursor: pointer;
}

.base-info {
  display: flex;
  justify-content: space-between;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #abaeb4;
  color: #abaeb4;
}
/deep/ .el-drawer__title {
  text-align: center;
  color: #000000;
  font-weight: bold;
  font-size: 32px;
}
</style>
