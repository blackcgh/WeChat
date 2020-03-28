<template>
  <div id="chat">
    <!-- 导航栏 -->
    <nav-bar :showBtn="false">
      <i class="el-icon-arrow-left" @click="back"></i>{{getReceiveOne.friend}}
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
              <div class="fl chat-avatar">
                <img :src="getReceiveOne.avatar" alt="加载失败">
              </div>
              <!-- 左用户名 -->
              <!-- <div class="fl chat-user">{{item.receiveOne}}</div> -->
              <!-- 内容框 -->
              <div class="fl content-l">{{item.content}}</div>
            </div>

            <!-- 我发送 -->
            <div v-else>
              <!-- 右头像 -->
              <div class="fr chat-avatar">
                <img :src="$store.state.userData.avatar" alt="加载失败">
              </div>
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
          receiveOne: this.$store.state.userData.friend[this.$route.query.index].friend
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
      },
      // 获取朋友
      getReceiveOne() {
        return this.$store.state.userData.friend[this.$route.query.index]
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
        this.$store.commit('add', {
          chat: this.chat,
          index: this.$route.query.index
        });
        await newChat(this.chat);
      },
    },
    // 进入聊天页面时请求聊天记录
    async created() {
      this.$loading.show();
      this.list = (await getList(this.chat.sendOne, this.chat.receiveOne)).data.data;
      this.$loading.hidden();
    }
  }
</script>

<style scoped>
  #chat {
    position: fixed;
    width: 10rem;
    height: 100vh;
    background-color: #ededed;
    z-index: 1;
  }

  .wrapper {
    width: 10rem;
    height: calc(100vh - 1.28rem - 1.52rem);
    overflow: auto;
  }

  .chat-time {
    padding-top: .666667rem;
    font-size: .32rem;
    color: #969696;
    text-align: center;
  }

  .chat-area {
    overflow: hidden;
  }

  .chat-avatar {
    width: 1.066667rem;
    height: 1.066667rem;
    margin: .266667rem;
    border-radius: .08rem;
  }

  .chat-avatar img {
    width: 100%;
    height: 100%;
  }

  .content-l {
    position: relative;
    padding: .266667rem;
    margin-top: .45rem;
    background-color: #fff;
    border-radius: .08rem;
  }

  .content-l::before {
    content: '';
    position: absolute;
    top: .28rem;
    left: -0.08rem;
    padding: .106667rem;
    background-color: #fff;
    transform: rotate(45deg);

  }

  .content-r {
    position: relative;
    padding: .266667rem;
    margin-top: .45rem;
    background-color: #95ec69;
    border-radius: .08rem;
  }

  .content-r::before {
    content: '';
    position: absolute;
    top: .28rem;
    right: -0.08rem;
    padding: .106667rem;
    background-color: #95ec69;
    transform: rotate(45deg);
  }

  .editor {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 10rem;
    border-top: .026667rem solid #bbb;
    background-color: rgb(235, 232, 232);
  }

  textarea {
    width: 5.333333rem;
    height: .96rem;
    padding-left: .266667rem;
    margin: .266667rem 1.333333rem;
    background-color: #fff;
    font-size: .426667rem;
    line-height: .96rem;
    border-radius: .08rem;
    vertical-align: middle;
    resize: none;
  }

  button {
    position: absolute;
    top: .373333rem;
    right: .266667rem;
    width: 1.6rem;
    height: .8rem;
    background-color: rgb(30, 177, 30);
    color: #fff;
    line-height: .8rem;
    text-align: center;
    font-size: .426667rem;
    border-radius: .08rem;
  }

  .chat-set {
    margin-right: .266667rem;
    font-size: .48rem;
    font-weight: 700;
    letter-spacing: -0.026667rem;
  }
</style>
