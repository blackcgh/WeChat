<template>
  <div id="wechat">
    <!-- 导航栏 -->
    <nav-bar>微信({{$store.state.chating.length}})</nav-bar>

    <!-- 聊天队列 -->
    <div class="chat-list" v-if="$store.state.chating.length">
      <ul @click="goChat">
        <li v-for="(item,index) of $store.state.chating" :key="item['_id']" :data-index="index">
          <!-- 头像 -->
          <div class="fl wechat-avatar"><img src="" alt=""></div>
          <!-- 接收人 -->
          <div class="fl wechat-user">
            {{item.receiveOne}}
            <!-- 内容 -->
            <p class="wechat-content">{{item.content}}</p>
          </div>
          <!-- 时间 -->
          <span class="wechat-time">{{item.createTime | format}}</span>
        </li>
      </ul>
    </div>

    <!-- 提示信息 -->
    <div class="wechat-tip" v-else>先去通讯录页面，与朋友聊天后，该页面才会显示聊天信息</div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'WeChat',
    components: {
      NavBar
    },
    methods: {
      // 去往聊天页面
      goChat(e) {
        let li = e.target.parentNode;
        while(li.tagName !== 'LI') {
          li = li.parentNode;
        }
        const c_index = li.getAttribute('data-index');
        const friend = this.$store.state.chating[c_index].receiveOne;
        const f_index = this.$store.state.userData.friend.indexOf(friend);

        this.$router.push({
          path: '/chat',
          query: { friend: this.$store.state.userData.friend[f_index] }
        })
      }
    }
  }
</script>

<style scoped>
  li {
    position: relative;
    height: 68px;
    background-color: #fff;
  }

  .wechat-avatar {
    width: 48px;
    height: 48px;
    margin: 10px;
    border-radius: 3px;
    background-color: rgb(57, 74, 235);
  }

  .wechat-user {
    width: calc(100vw - 73px);
    height: 43px;
    padding: 15px 0 9px;
    border-bottom: 1px solid #ddd;
  }

  li:last-child .wechat-user {
    border-bottom: 0;
  }

  .wechat-content {
    margin-top: 10px;
    font-size: 14px;
    color: #969696;
  }

  .wechat-time {
    position: absolute;
    top: 15px;
    right: 10px;
    font-size: 14px;
    color: #ccc;
  }

  .wechat-tip {
    margin-top: 10px;
    text-align: center;
    font-size: 14px;
    line-height: 16px;
    color: #ccc
  }
</style>
