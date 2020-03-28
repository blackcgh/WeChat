<template>
  <div id="setting">
    <!-- 导航栏 -->
    <nav-bar :showBtn="false"><i class="el-icon-arrow-left" @click="back"></i>设置</nav-bar>

    <!-- 功能 -->
    <div>
      <ul @click="reject">
        <!-- 账号 -->
        <li class="set-feature">
          <div>账号与安全</div>
        </li>

        <!-- 消息 -->
        <li>
          <div>新消息提醒</div>
        </li>
        <li>
          <div>勿扰模式</div>
        </li>
        <li>
          <div>聊天</div>
        </li>
        <li>
          <div>隐私</div>
        </li>
        <li class="set-feature">
          <div>通用</div>
        </li>

        <!-- 其他 -->
        <li>
          <div>关于微信</div>
        </li>
        <li>
          <div>帮助与反馈</div>
        </li>
        <li class="set-feature">
          <div>插件</div>
        </li>

        <!-- 切换账号 -->
        <li class="set-feature ta">
          <div class="clear">切换账号</div>
        </li>

        <!-- 退出 -->
        <li class="set-feature ta">
          <div class="clear" @click.stop="exit">退出</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  export default {
    name: 'Setting',
    components: {
      NavBar
    },
    methods: {
      reject() {
        this.$alert('暂时只支持退出功能', '信息提示', {
          closeOnClickModal: true,
          confirmButtonText: '确定'
        });
      },
      back() {
        this.$router.back()
      },
      // 退出
      exit() {
        sessionStorage.removeItem('token');
        this.$store.commit('clear');
        this.$router.replace('/login')
      }
    }
  }
</script>

<style scoped>
  #setting {
    position: fixed;
    width: 10rem;
    height: 100vh;
    background-color: #ededed;
    z-index: 1;
    overflow: auto;
  }

  .set-feature {
    margin-bottom: .266667rem;
  }

  .set-feature div {
    border-bottom: 0;
  }

  li {
    height: 1.226667rem;
    background-color: #fff;
    line-height: .693333rem;
  }

  li:hover {
    background-color: #eeeded;
  }

  li div {
    position: relative;
    height: .693333rem;
    padding: .266667rem 0 .24rem .4rem;
    border-bottom: .026667rem solid #ddd;
  }

  li div::after {
    content: '>';
    position: absolute;
    top: .266667rem;
    right: .266667rem;
    color: rgb(212, 212, 212);
    font-size: .586667rem;
    font-weight: normal;
  }

  .ta {
    text-align: center;
  }

  .clear::after {
    content: '';
  }
</style>
