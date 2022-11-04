<!--
 * @Author: bingbing.geng
 * @Date: 2022-11-04 08:35:20
 * @LastEditTime: 2022-11-04 13:19:20
 * @FilePath: \cicd-vue\src\pages\webSocket\index.vue
-->
<template>
  <div>
    <div class="title">简易聊天系统</div>
    <div class="login-from" v-if="pageState">
      <el-form :model="form" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="form.userName" />
        </el-form-item>

        <el-form-item style="text-align: center;">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="web-socket" v-if="!pageState">
      <div class="chats">
        <div class="main">
          <div class="content" id="msg-list">
            <ul>
              <li v-for="item in msgList" :key="item">
                <div class="left" v-if="item.type === 1"><span class="user-img">{{ item.userName }}</span><span class="val">{{ item.value }}</span></div>
                <div class="right" v-else><span class="val">{{ item.value }}</span><span class="user-img">{{ item.userName }}</span></div>
              </li>
            </ul>
          </div>
          <div class="send-content">
            <el-input v-model="form.message" type="textarea" />
            <el-button class="send-btn" type="primary" @click="sendMessage" @keydown="sendMessage">发送</el-button>
          </div>
        </div>
        <div class="user-list">
          <div class="add-user">
            <el-button type="primary" @click="addUser">添加好友</el-button>
          </div>
          <ul>
            <li v-for="item in userList" :key="item.id" @click="changeUser(item)">{{ item.userName }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
let ws

const pageState = ref(true)
const userName = ref('')
const reciveUser = ref('')
const userList = reactive([])
const msgList = reactive([])

const changeUser = (val) => {
  userName.value = val.id
}

const addUser = () => {
  ElMessageBox.prompt('请输入用户名', '添加好友', {
    confirmButtonText: '添加',
    cancelButtonText: '取消',
  }).then(({ value }) => {
    reciveUser.value = value
    userList.push({
      id: value,
      userName: value
    })
  })
}

const form = reactive({
  userName: '',
  message: ''
})

onMounted(() => {
  initWebSocket()
})

const login = () => {
  userName.value = form.userName
  pageState.value = false
  localStorage.setItem('uid', userName.value)
}

const sendMessage = () => {
  const uid = localStorage.getItem('uid')
  const content = form.message
  if(!uid) {
    ElMessage('请添加联系人')
  }
  if(!content) {
    ElMessage('请输入内容')
  }
  try {
    ws.send(
      JSON.stringify({
        uid: uid,
        reciveId: reciveUser.value,
        content: content
      })
    )
    msgList.push({
      type: 0,
      userName: uid,
      value: content
    })
  
    form.message = ''
    if(document.querySelector('.content')) {
      document.querySelector('.content').scrollTop = 1000000000
    }
  } catch(e) {
    ElMessage.error('socket连接断开，正在重连~')
    initWebSocket()
  }
}

const initWebSocket = () => {
  const uid = localStorage.getItem('uid')
  ws = new WebSocket('ws://localhost:3002')
  // 连接
  ws.onopen = (event) => {
    ws.send(JSON.stringify({ uid }))
  }
  ElMessage({
    message: 'Socket连接成功.',
    type: 'success',
  })

  // 接收信息
  ws.onmessage = (event) => {
    const { content, sendId } = JSON.parse(event.data)
    console.log(content)
    msgList.push({
      type: 1,
      userName: sendId,
      value: content
    })
    if(document.querySelector('.content')) {
      document.querySelector('.content').scrollTop = 1000000000
    }
  }
}

</script>

<style lang="less" scoped>
.login-from {
  width: 500px;
  margin-top: 24px;
  height: 300px;
}
.title {
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  margin-top: 24px;
}
.web-socket {
  margin: 24px;
  width: 800px;
  border: 1px solid #ccc;
  height: 100%;
}

li {
  list-style: none;
}

.chats {
  display: flex;
  .main {
    flex: 1;
    position: relative;
    .content {
      padding: 24px;
      height: calc(100vh - 125px);
      overflow-y: auto;

      li {
        .user-img {
          margin: 12px;
          padding: 5px;
          width: 50px;
          height: 50px;
          display: inline-block;
          border-radius: 500px;
          border: 1px solid #ccc;
          text-align: center;
          overflow: hidden;
        }
        .val {
          // display: flex;
          // align-items: center;
        }
        .left {
          text-align: left;
          line-height: 36px;
          display: flex;
          .val {
            display: flex;
            align-items: center;
          }
        }

        .right {
          text-align: right;
          line-height: 36px;
          // display: flex;
        }
      }
    }

    .send-content {
      position: absolute;
      bottom: 0;
      width: 100%;

      /deep/.el-textarea__inner {
        min-height: 31px;
        height: 125px;
        border-radius: 0;
        box-shadow: 0 0 0 0 inset;
        border-top: 1px solid #ccc;
      }
      .send-btn {
        position: absolute;
        bottom: -1px;
        right: -1px;
      }
    }
  }
  .user-list {
    border-left: 1px solid #ccc;
    width: 220px;
    height: 100%;
    min-height: 100vh;
    .add-user {
      text-align: center;
      padding: 12px;
    }
    ul {
      border-top: 1px solid #ccc;
    }
    li {
      line-height: 32px;
      padding: 0px 12px;
      border-bottom: 1px solid #ccc;
    }
  }
}
</style>
