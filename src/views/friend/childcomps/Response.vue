<template>
  <div id="response">
    <!-- 导航栏 -->
    <nav-bar :showBtn="false">
      <i class="el-icon-arrow-left" @click="back"></i>新的朋友
      <template v-slot:send><span @click="addFriend">添加朋友</span></template>
    </nav-bar>

    <!-- 请求队列 -->
    <h4>请求列表</h4>
    <ul v-if="request.length">
      <li v-for="(item,index) of request" :key="item.sendOne">
        <div class="req-avatar"><img :src="item.avatar" alt="加载失败"></div>
        <div class="req-user">
          <b>{{item.sendOne}}</b>
          <p>{{item.introduction}}</p>
        </div>
        <div class="agree-btn" :class="{agreed:agree.length>2}" @click="agreeClick(index)">
          {{agree}}
        </div>
      </li>
    </ul>
    <div class="empty" v-else>空空如也~</div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import { agree } from 'network/user'

  export default {
    name: 'Response',
    data() {
      return {
        request: this.$store.state.userData.request,
        agree: '同意'
      }
    },
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.back()
      },
      // 添加朋友
      addFriend() {
        this.$router.push('/search')
      },
      // 同意添加朋友
      async agreeClick(index) {
        if (this.agree.length < 3) {
          this.$loading.show();
          // 同意方
          const agreeObj = {}
          agreeObj.friend = this.$store.state.userData.username;
          agreeObj.avatar = this.$store.state.userData.avatar;

          // 请求方
          const requestObj = {}
          requestObj.friend = this.request[index].sendOne;
          requestObj.avatar = this.request[index].avatar;

          await agree(agreeObj, requestObj);
          this.agree = '已同意';
          this.$store.commit('addFriend', requestObj);
          this.$store.commit('removeOne', index);
          this.$loading.hidden();
        }
      }
    }
  }
</script>

<style scoped>
  #response {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #ededed;
    z-index: 1;
  }

  span {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 18px;
  }

  h4 {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    font-size: 14px;
    color: #222;
  }

  li {
    height: 60px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    overflow: hidden;
  }

  .req-avatar {
    float: left;
    width: 40px;
    height: 40px;
    margin: 10px;
    background-color: pink;
    border-radius: 3px;
  }

  .req-avatar img {
    width: 100%;
    height: 100%;
  }

  .req-user {
    float: left;
    height: 40px;
    padding: 13px 0 10px;
  }

  b {
    font-size: 16px;
  }

  p {
    padding-top: 5px;
    color: #ccc;
    font-size: 14px;
  }

  .agree-btn {
    float: right;
    width: 60px;
    height: 30px;
    margin: 15px 10px 0 0;
    background-color: rgb(30, 177, 30);
    border-radius: 3px;
    text-align: center;
    line-height: 30px;
    color: #fff;
  }

  .empty {
    margin-top: 15px;
    font-size: 14px;
    color: #969696;
    text-align: center;
  }

  .agreed {
    background-color: #ccc;
    color: #555;
  }
</style>
