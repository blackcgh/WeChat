<template>
  <div id="profile">
    <!-- 导航栏 -->
    <nav-bar>我的</nav-bar>

    <!-- 功能 -->
    <div>
      <ul @click="reject">
        <!-- 用户 -->
        <li class="info profile-feature" @click.stop="infoClick">
          <div class="avatar"><img :src="$store.state.userData.avatar" alt="加载失败"></div>
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
    margin-bottom: .266667rem;
  }

  li.profile-feature div:last-child {
    border-bottom: 0;
  }

  li {
    height: 1.493333rem;
    background-color: #fff;
    line-height: .96rem;
  }

  li:hover {
    background-color: #eeeded;
  }

  li div {
    float: left;
    height: .96rem;
  }

  li div:first-child {
    width: .96rem;
    margin: .266667rem;
    margin-right: .4rem;
    border-radius: .08rem;
    line-height: .96rem;
    text-align: center;
  }

  li div:last-child {
    position: relative;
    width: calc(10rem - 1.866667rem);
    padding: .266667rem 0 .24rem;
    border-bottom: .026667rem solid #ddd;
  }

  li div:last-child::after {
    content: '>';
    position: absolute;
    top: .266667rem;
    right: .266667rem;
    color: rgb(212, 212, 212);
    font-size: .586667rem;
    font-weight: normal;
  }

  .info {
    height: 2.24rem;
    line-height: 2.24rem;
  }

  .avatar {
    width: 1.706667rem !important;
    height: 1.706667rem;
  }

  .avatar img {
    width: 100%;
    height: 100%;
  }

  .user {
    width: calc(10rem - 2.6rem) !important;
    height: 1.733333rem;
    line-height: 1.733333rem;
    font-size: .64rem;
    font-weight: 700;
  }

  svg {
    position: relative;
    top: .133333rem;
    font-size: .586667rem;
  }

  .more {
    font-size: .693333rem;
  }
</style>
