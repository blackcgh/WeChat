<template>
  <div id="wechat">
    <!-- 导航栏 -->
    <nav-bar>微信({{$store.state.chating.length}})</nav-bar>

    <!-- 聊天队列 -->
    <div class="chat-list" v-if="$store.state.chating.length">
      <ul @click="goChat">
        <li v-for="item of $store.state.chating"
            :key="item.chat['_id']"
            :data-index="item.index">
          <!-- 头像 -->
          <div class="fl wechat-avatar"><img :src="getAvatar(item.index)" alt="加载失败"></div>
          <!-- 接收人 -->
          <div class="fl wechat-user">
            {{item.chat.receiveOne}}
            <!-- 内容 -->
            <p class="wechat-content">{{item.chat.content}}</p>
          </div>
          <!-- 时间 -->
          <span class="wechat-time">{{item.chat.createTime | format}}</span>
        </li>
      </ul>
    </div>

    <!-- 提示信息 -->
    <div class="wechat-tip" v-else>你还没有与任何朋友聊过天~</div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'WeChat',
    components: {
      NavBar
    },
    computed: {
      getAvatar() {
        return function(index) {
          const friend = this.$store.state.userData.friend[index];
          if(friend && friend.avatar) return friend.avatar
        }
      }
    },
    methods: {
      // 去往聊天页面
      goChat(e) {
        let li = e.target.parentNode;
        while(li.tagName !== 'LI') {
          li = li.parentNode;
        }
        const index = li.getAttribute('data-index');
        this.$router.push({
          path: '/chat',
          query: { index }
        })
      }
    }
  }
</script>

<style scoped>
  li {
    position: relative;
    height: 1.813333rem;
    padding: .266667rem;
    padding-bottom: 0;
    background-color: #fff;
    box-sizing: border-box;
  }

  li:hover {
    background-color: #eeeded;
  }

  .wechat-avatar {
    width: 1.28rem;
    height: 1.28rem;
    margin-right: .266667rem;
    border-radius: .08rem;
  }

  .wechat-avatar img {
    width: 100%;
    height: 100%;
    vertical-align: middle;
  }

  .wechat-user {
    width: calc(10rem - 2.306667rem);;
    height: 100%;
    padding-top: .1rem;
    border-bottom: .026667rem solid #ddd;
    font-weight: 700;
    font-size: .48rem;
    box-sizing: border-box;
  }

  li:last-child .wechat-user {
    border-bottom: 0;
  }

  .wechat-content {
    margin-top: .266667rem;
    font-size: .373333rem;
    color: #b7b7b7;
  }

  .wechat-time {
    position: absolute;
    top: .32rem;
    right: .533333rem;
    font-size: .373333rem;
    color: #b7b7b7;
  }

  .wechat-tip {
    margin-top: .266667rem;
    text-align: center;
    font-size: .373333rem;
    line-height: .426667rem;
    color: #ccc
  }
</style>
