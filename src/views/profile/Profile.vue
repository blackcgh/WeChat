<template>
  <div id="profile">
    <!-- 导航栏 -->
    <nav-bar>我的</nav-bar>

    <!-- 功能 -->
    <div>
      <ul @click="reject">
        <!-- 用户 -->
        <li class="info profile-feature" @click.stop="infoClick">
          <div class="avatar"><img src="" alt=""></div>
          <div class="user">{{$store.state.userData.username}}</div>
        </li>

        <!-- 支付 -->
        <li class="profile-feature">
          <div>
            <svg class="icon more" aria-hidden="true">
              <use xlink:href="#icon-zhifu"></use>
            </svg>
          </div>
          <div>支付</div>
        </li>

        <!-- 分类 -->
        <li>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shoucang"></use>
            </svg>
          </div>
          <div>收藏</div>
        </li>
        <li>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiangce"></use>
            </svg>
          </div>
          <div>相册</div>
        </li>
        <li>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-qiabao"></use>
            </svg>
          </div>
          <div>卡包</div>
        </li>
        <li class="profile-feature">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqing"></use>
            </svg>
          </div>
          <div>表情</div>
        </li>

        <!-- 设置 -->
        <li class="profile-feature" @click.stop="set">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-shezhi"></use>
            </svg>
          </div>
          <div>设置</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'Profile',
    components: {
      NavBar
    },
    methods: {
      reject() {
        this.$alert('暂时不支持该功能', '信息提示', {
          closeOnClickModal: true,
          confirmButtonText: '确定'
        });
      },
      // 前往个人信息页面
      infoClick() {
        this.$router.push('/info')
      },
      // 前往设置页面
      set() {
        this.$router.push('/setting')
      }
    }
  }
</script>

<style scoped>
  .profile-feature {
    margin-bottom: 10px;
  }

  li.profile-feature div:last-child {
    border-bottom: 0;
  }

  li {
    height: 56px;
    background-color: #fff;
    line-height: 36px;
  }

  li div {
    float: left;
    height: 36px;
  }

  li div:first-child {
    width: 36px;
    margin: 10px 15px 10px 10px;
    border-radius: 3px;
    line-height: 36px;
    text-align: center;
    /* background-color: rgb(57, 74, 235); */
  }

  li div:last-child {
    position: relative;
    width: calc(100vw - 61px);
    padding: 10px 0 9px;
    border-bottom: 1px solid #ddd;
  }

  li div:last-child::after {
    content: '>';
    position: absolute;
    top: 10px;
    right: 10px;
    color: rgb(212, 212, 212);
    font-size: 22px;
    font-weight: normal;
  }

  .info {
    height: 84px;
    line-height: 84px;
  }

  .avatar {
    width: 64px !important;
    height: 64px;
    background-color: skyblue;
  }

  .user {
    width: calc(100vw - 89px) !important;
    height: 65px;
    line-height: 65px;
    font-size: 24px;
    font-weight: 700;
  }

  svg {
    font-size: 22px;
  }

  .more {
    font-size: 26px;
  }
</style>
