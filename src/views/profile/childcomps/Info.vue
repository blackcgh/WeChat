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
          <!-- 上传头像 -->
          <input type="file" id="file" accept="image/*" @change="upload">
          <div>
            <div>头像</div>
            <div><img :src="$store.state.userData.avatar" alt="加载失败"></div>
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

  import { uploadAvatar } from 'network/user'

  export default {
    name: 'Info',
    components: {
      NavBar
    },
    methods: {
      back() {
        this.$router.back()
      },
      // 上传头像
      async upload(e) {
        const maxSize = 1024 * 1024 * 2;
        if (e.target.files[0].size > maxSize) {
          this.$alert('上传头像大小不能超过 2MB！', '信息提示', {
            closeOnClickModal: true,
            confirmButtonText: '确定'
          })
        } else {
          const formData = new FormData();
          formData.append(this.$store.state.userData['_id'], e.target.files[0]);
          this.$loading.show('上传中...');
          await uploadAvatar(formData);
          this.$store.commit('upload', e.target.files[0].name);
          this.$done.show('上传成功');
          this.$loading.hidden()
        }
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
    position: relative;
    height: 84px;
    line-height: 84px;
  }

  #file {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    opacity: 0;
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

  .myavatar img {
    width: 100%;
    height: 100%;
  }

  .info-user {
    position: absolute;
    top: 10px;
    right: 35px;
    font-size: 18px;
    color: #666;
  }
</style>
