<template>
  <div id="chat">
    <!-- 导航栏 -->
    <nav-bar :showBtn="false">
      <i class="el-icon-arrow-left" @click="back"></i>{{$route.query.friend}}
      <!-- 设置 -->
      <template v-slot:send>
        <div class="fr chat-set" @click="set">. . .</div>
      </template>
    </nav-bar>

    <!-- 聊天记录 -->
    <div class="wrapper">
      <ul>
        <li v-for="(item,index) of list" :key="item['_id']">
          <!-- 时间 -->
          <div class="chat-time">{{item.createTime | format}}</div>
          <!-- 对话区域 -->
          <div class="chat-area">

            <!-- 朋友发送 -->
            <div v-if="getShow(index)">
              <!-- 左头像 -->
              <div class="fl chat-avatar"><img src="" alt=""></div>
              <!-- 左用户名 -->
              <div class="fl chat-user">{{item.receiveOne}}</div>
              <!-- 内容框 -->
              <div class="fl content-l">{{item.content}}</div>
            </div>

            <!-- 我发送 -->
            <div v-else>
              <!-- 右头像 -->
              <div class="fr chat-avatar"><img src="" alt=""></div>
              <!-- 右用户名 -->
              <!-- <div class="fr chat-user tr">我</div> -->
              <!-- 内容框 -->
              <div class="fr content-r">{{item.content}}</div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 编辑框 -->
    <div class="editor">
      <textarea v-model="content"></textarea>
      <button @click="send">发送</button>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import {
    getList,
    newChat
  } from 'network/chat'

  export default {
    name: 'Chat',
    data() {
      return {
        list: [],
        // 聊天内容格式
        chat: {
          sendOne: this.$store.state.userData.username,
          receiveOne: this.$route.query.friend,
        },
        content: ''
      }
    },
    computed: {
      // 决定显示左/右对话框
      getShow() {
        return (index) => {
          return this.list[index].sendOne !== this.chat.sendOne
        }
      }
    },
    watch: {
      // 自动滚到聊天底部
      list() {
        this.$nextTick(function() {
          const wrapper = document.querySelector('.wrapper');
          wrapper.scrollTop = wrapper.scrollHeight
        })
      }
    },
    components: {
      NavBar
    },
    methods: {
      // 回到上一页
      back() {
        this.$router.back()
      },
      // 设置功能
      set() {
        this.$alert('暂时不支持设置功能', '信息提示', {
          closeOnClickModal: true,
          confirmButtonText: '确定'
        });
      },
      // 发送消息
      async send() {
        this.chat.createTime = new Date();
        this.chat.content = this.content;
        this.list.push(this.chat);
        this.content = '';
        this.$store.commit('add', this.chat);
        await newChat(this.chat);
      },
    },
    // 进入聊天页面时请求聊天记录
    async created() {
      const me = this.$store.state.userData.username;
      const other = this.$route.query.friend;
      this.$loading.show();
      this.list = (await getList(me, other)).data.data;
      this.$loading.hidden();
    }
  }
</script>

<style scoped>
  #chat {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #ededed;
    z-index: 1;
  }

  .wrapper {
    height: calc(100vh - 48px - 57px);
    overflow: scroll;
  }

  .chat-time {
    padding-top: 25px;
    font-size: 12px;
    color: #969696;
    text-align: center;
  }

  .chat-area {
    overflow: hidden;
  }

  .chat-avatar {
    width: 40px;
    height: 40px;
    margin: 10px;
    border-radius: 3px;
    background-color: rgb(57, 74, 235);
  }

  .chat-user {
    width: calc(100vw - 60px);
    padding: 12px 0 6px;
    font-size: 13px;
  }

  .content-l {
    position: relative;
    padding: 10px;
    background-color: #fff;
    border-radius: 3px;
  }

  .content-l::before {
    content: '';
    position: absolute;
    top: 13px;
    left: -5px;
    padding: 4px;
    background-color: #fff;
    transform: rotate(45deg);

  }

  .content-r {
    position: relative;
    padding: 10px;
    margin-top: 12px;
    background-color: #95ec69;
    border-radius: 3px;
  }

  .content-r::before {
    content: '';
    position: absolute;
    top: 13px;
    right: -5px;
    padding: 4px;
    background-color: #95ec69;
    transform: rotate(45deg);
  }

  .editor {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    border-top: 1px solid #bbb;
    background-color: rgb(235, 232, 232);
  }

  textarea {
    width: 200px;
    height: 36px;
    padding-left: 10px;
    margin: 10px 50px;
    background-color: #fff;
    font-size: 16px;
    line-height: 36px;
    border-radius: 3px;
    vertical-align: middle;
  }

  button {
    position: absolute;
    top: 14px;
    right: 10px;
    width: 60px;
    height: 30px;
    background-color: rgb(30, 177, 30);
    color: #fff;
    line-height: 30px;
    text-align: center;
    font-size: 16px;
    border-radius: 3px;
  }

  .chat-set {
    margin-right: 10px;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -1px;
  }
</style>
