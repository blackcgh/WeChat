<template>
  <div id="introduct">
    <nav-bar :showBtn="false"><i class="el-icon-arrow-left" @click="back"></i></nav-bar>
    <div class="user">
      <div class="user-avatar"><img :src="user.avatar" alt=""></div>
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
    width: 10rem;
    height: 100vh;
    background-color: rgb(248, 248, 246);
    z-index: 1;
    overflow: auto;
  }

  .user {
    height: 1.706667rem;
    padding: .266667rem;
    background-color: #fff;
  }

  .user-avatar {
    float: left;
    width: 1.706667rem;
    height: 1.706667rem;
    margin-right: .4rem;
    border-radius: .2rem;
  }

  .user-avatar img {
    width: 100%;
    height: 100%;
  }

  .user h3 {
    font-size: .48rem;
    font-weight: 700;
    line-height: 1.706667rem;
  }

  .sign {
    margin: .266667rem 0;
    padding: .266667rem;
    background-color: #fff;

  }

  .sign em {
    font-weight: 700;
  }

  .sign p {
    padding: .266667rem 0;
    font-size: .48rem;
    color: #aaa;
    text-indent: 2em;
  }

  .add-friend {
    height: 1.333333rem;
    background-color: #fff;
    line-height: 1.38rem;
    font-size: .48rem;
    font-weight: 700;
    color: rgb(6, 19, 141);
    text-align: center;
    cursor: pointer;
  }
</style>
