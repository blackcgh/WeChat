<template>
  <div id="add-friend">

    <!-- 导航栏 -->
    <nav-bar :showBtn="false">

      <!-- 返回上一页 -->
      <i class="el-icon-arrow-left" @click="back"></i>

      <!-- 发送按钮 -->
      <template v-slot:send>
        <div class="send" @click="send">发送</div>
      </template>
    </nav-bar>

    <!-- 填写添加申请 -->
    <div class="info-submit">
      <h2>申请添加朋友</h2>
      <h4>发送添加朋友申请</h4>
      <textarea v-model="introduction"></textarea>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import { add } from 'network/user'

  export default {
    name: 'AddFriend',
    data() {
      return {
        user: this.$route.query,
        introduction: '你好，我是' + this.$store.state.userData.username
      }
    },
    components: {
      NavBar
    },
    methods:{
      // 返回上一步
      back() {
        this.$router.back()
      },
      // 发送添加请求
      async send() {
        if(this.introduction === '') {
          this.$alert('请输入添加申请信息！', '信息提示', {
            closeOnClickModal: true,
            confirmButtonText: '确定'
          });
          return
        }

        // 发送添加请求
        this.$loading.show('正在发送');
        // 请求人信息
        const obj = {
          sendOne: this.$store.state.userData.username,
          introduction: this.introduction
        }
        await add(obj, this.user.username);
        this.$loading.hidden();
        this.$done.show();
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  #add-friend {
    position: fixed;
    width: 10rem;
    height: 100vh;
    background-color: #fff;
    overflow: auto;
    z-index: 1;
  }

  .info-submit {
    padding: 1.333333rem .533333rem;
  }

  .info-submit h2 {
    padding-bottom: .533333rem;
    font-size: .533333rem;
    font-weight: 700;
    text-align: center;
  }

  .info-submit h4 {
    margin-bottom: .133333rem;
    text-align: left;
    font-size: .373333rem;
    color: #999;
  }

  .info-submit textarea {
    width: 7.866667rem;
    height: 2.666667rem;
    padding: .533333rem;
    border: 0;
    outline: none;
    background-color: #eee;
    color: #222;
    border-radius: .08rem;
  }

  .send {
    position: absolute;
    top: .24rem;
    right: .266667rem;
    width: 2.4rem;
    height: .8rem;
    background-color: rgb(30, 177, 30);
    color: #fff;
    line-height: .8rem;
    text-align: center;
    font-size: .426667rem;
    border-radius: .08rem;
    cursor: pointer;
  }
</style>
