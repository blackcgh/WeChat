<template>
  <div id="introduct">
    <nav-bar :showBtn="false"><i class="el-icon-arrow-left" @click="back"></i></nav-bar>
    <div class="user">
      <div class="user-avatar"><img src="" alt=""></div>
      <h3>{{user.username}}</h3>
    </div>
    <div class="sign">
      <em>个性签名：</em>
      <p>凡是杀不死我的，终将使我更强大！</p>
    </div>
    <div class="add-friend" @click="addFriend">添加到通讯录</div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'Introduct',
    data() {
      return {
        user: this.$route.query
      }
    },
    components: {
      NavBar
    },
    methods: {
      // 返回上一页
      back() {
        this.$router.back();
      },
      // 添加朋友
      addFriend() {
        this.$router.push({
          path: '/add',
          query: this.user
        })
      }
    }
  }
</script>

<style scoped>
  #introduct {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgb(248, 248, 246);
    z-index: 1;
  }

  .user {
    height: 64px;
    padding: 10px;
    background-color: #fff;
  }

  .user-avatar {
    float: left;
    width: 64px;
    height: 64px;
    margin-right: 15px;
    background-color: blue;
    border-radius: 3px;
  }

  .user h3 {
    font-size: 18px;
    font-weight: 700;
    line-height: 64px;
  }

  .sign {
    margin: 10px 0;
    padding: 10px;
    background-color: #fff;

  }

  .sign em {
    font-weight: 700;
  }

  .sign p {
    padding: 10px 0;
    font-size: 18px;
    color: #aaa;
    text-indent: 2em;
  }

  .add-friend {
    height: 50px;
    background-color: #fff;
    line-height: 50px;
    font-weight: 700;
    color: rgb(6, 19, 141);
    text-align: center;
  }
</style>
