<template>
  <div id="information">
    <!-- 导航栏 -->
    <nav-bar :showBtn="false">
      <i class="el-icon-arrow-left" @click="back"></i>个人信息
    </nav-bar>

    <!-- 功能 -->
    <div>
      <ul>
        <!-- 信息 -->
        <li class="myavatar">
          <div>
            <div>头像</div>
            <div><img src="" alt=""></div>
          </div>
        </li>
        <li>
          <div>用户名<span class="info-user">{{$store.state.userData.username}}</span></div>
        </li>
        <li>
          <div>二维码名片</div>
        </li>
        <li class="info-feature">
          <div>更多</div>
        </li>

        <!-- 地址 -->
        <li class="info-feature">
          <div>我的地址</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'Info',
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  #information {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #ededed;
    z-index: 1;
  }

  .info-feature {
    margin-bottom: 10px;
    border-bottom: 0;
  }

  li {
    height: 46px;
    border-bottom: 1px solid #ddd;
    background-color: #fff;
    line-height: 26px;
  }

  li div {
    position: relative;
    height: 26px;
    padding: 10px 0 9px 15px;
  }

  li>div::after {
    content: '>';
    position: absolute;
    top: 10px;
    right: 10px;
    color: rgb(212, 212, 212);
    font-size: 22px;
    font-weight: normal;
  }

  .myavatar {
    height: 84px;
    line-height: 84px;
  }

  .myavatar>div {
    height: 66px;
    line-height: 66px;
  }

  .myavatar div div:first-child {
    float: left;
    height: 65px;
    padding: 0;
    line-height: 65px;
  }

  .myavatar div div:last-child {
    float: right;
    width: 64px;
    height: 64px;
    padding: 0;
    margin-right: 35px;
    background-color: aqua;
    border-radius: 3px;
  }

  .info-user {
    position: absolute;
    top: 10px;
    right: 35px;
    font-size: 18px;
    color: #666;
  }
</style>
