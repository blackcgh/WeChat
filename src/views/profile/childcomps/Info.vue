<template>
  <div id="information">
    <!-- 导航栏 -->
    <nav-bar :showBtn="false">
      <i class="el-icon-arrow-left" @click="back"></i>个人信息
    </nav-bar>

    <!-- 功能 -->
    <div>
      <ul @click="reject">
        <!-- 信息 -->
        <li class="myavatar">
          <!-- 上传头像 -->
          <input type="file" id="file" accept="image/*" @change.stop="upload">
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
      reject(e) {
        if(e.target.tagName !== 'INPUT') {
          this.$alert('暂时不支持此功能', '信息提示', {
            closeOnClickModal: true,
            confirmButtonText: '确定'
          })
        }
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
          this.$loading.show('正在上传头像');
          await uploadAvatar(formData);
          this.$store.commit('upload');
          this.$done.show('头像已上传');
          this.$loading.hidden()
        }
      }
    }
  }
</script>

<style scoped>
  #information {
    position: fixed;
    width: 10rem;
    height: 100vh;
    background-color: #ededed;
    z-index: 1;
    overflow: auto;
  }

  .info-feature {
    margin-bottom: .266667rem;
    border-bottom: 0;
  }

  li {
    height: 1.226667rem;
    border-bottom: .026667rem solid #ddd;
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
  }

  li>div::after {
    content: '>';
    position: absolute;
    top: .266667rem;
    right: .266667rem;
    color: rgb(212, 212, 212);
    font-size: .586667rem;
    font-weight: normal;
  }

  .myavatar {
    position: relative;
    height: 2.24rem;
    line-height: 2.24rem;
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
    height: 1.76rem;
    line-height: 1.76rem;
  }

  .myavatar div div:first-child {
    float: left;
    height: 1.733333rem;
    padding: 0;
    line-height: 1.733333rem;
  }

  .myavatar div div:last-child {
    float: right;
    width: 1.706667rem;
    height: 1.706667rem;
    padding: 0;
    margin-right: .933333rem;
    border-radius: .08rem;
  }

  .myavatar img {
    width: 100%;
    height: 100%;
  }

  .info-user {
    position: absolute;
    top: .266667rem;
    right: .933333rem;
    font-size: .48rem;
    color: #666;
  }
</style>
