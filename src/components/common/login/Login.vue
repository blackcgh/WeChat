<template>
  <div id="login">
    <!-- 内容 -->
    <div class="desc">微信登录</div>

    <!-- 用户名输入框 -->
    <div class="user">
      <label>用户名</label>
      <input :disabled="value"
             v-model="formData.username"
             placeholder="请填写用户名"
             clearable key="username" />
    </div>

    <!-- 密码输入框 -->
    <div class="pwd" v-show="isShow">
      <label>密码</label>
      <input type="password"
             v-model="formData.password"
             placeholder="请填写微信密码"
             clearable
             key="password" />
    </div>

    <!-- 按钮 -->
    <button :class="{active: getCurrent}" v-if="!isShow" @click="next" key="next">下一步
    </button>
    <button :class="{active: getCurrent}" v-else @click="login" key="login">登录</button>

    <!-- 前往注册页面 -->
    <div class="go" @click="goRegister">还没有账号？去注册 >></div>

    <!-- 返回上一步 -->
    <i class="el-icon-close" v-show="isShow" @click="back"></i>
  </div>
</template>

<script>
  import {
    login
  } from 'network/user'

  export default {
    name: 'Login',
    data() {
      return {
        formData: {
          username: '',
          password: ''
        },
        isShow: false,
        value: false
      }
    },
    computed: {
      //是否有输入
      getCurrent() {
        return this.formData.username.length !== 0;
      }
    },
    methods: {
      // 点击下一步
      next() {
        const length = this.formData.username.length;
        // 弹出警告
        if (length !== 0) {
          if (length < 2 || length > 6) {
            this.$alert('用户名必须在 2 到 6 个字符之间', '用户名错误', {
              closeOnClickModal: true,
              confirmButtonText: '确定'
            });
            return
          }

          // 加载一秒后显示密码框
          this.$loading.show();
          setTimeout(() => {
            this.$loading.hidden();
            this.isShow = true;
            this.value = true;
          }, 600)
        }
      },

      //返回上一步
      back() {
        this.isShow = false;
        this.value = false;
      },

      // 登录
      async login() {
        const length = this.formData.password.length;
        // 警告信息
        if (length < 2 || length > 15) {
          this.$alert('密码必须在 2 到 15 个字符之间', '密码错误', {
            closeOnClickModal: true,
            confirmButtonText: '确定'
          });
          return
        }

        // 开始登录
        this.$loading.show();
        const result = await login(this.formData.username, this.formData.password);
        this.$loading.hidden();
        if (result.data.errno !== 0) {
          this.$alert('用户名或密码错误！', '登录失败', {
            closeOnClickModal: true,
            confirmButtonText: '确定'
          });
          return
        }
        // 保存token
        sessionStorage.setItem('token', result.data.data.token);
        // 用于验证token是否过期
        sessionStorage.setItem('expire', new Date().getTime());
        // 保存用户信息
        this.$store.commit('record', result.data.data.userData[0]);
        // 添加聊天记录
        const chatArr = [];
        const friend = result.data.data.userData[0].friend;
        for (let i in friend) {
          if (friend[i].chat) {
            chatArr.push({
              chat: friend[i].chat,
              index: i
            })
          }
        }

        this.$store.commit('add', chatArr);
        this.$router.replace('/welcome')
      },

      // 前往注册页面
      goRegister() {
        this.$router.push('/register')
      }
    }
  }
</script>

<style scoped>
  #login {
    position: relative;
    padding: .133333rem;
  }

  .desc {
    padding: 1rem 0;
    font-size: .7rem;
    font-weight: 700;
  }

  label {
    margin-right: .8rem;
    font-size: .5rem;
  }

  .user,
  .pwd {
    display: flex;
    padding: 0 0 .333333rem .133333rem;
    margin-bottom: .333333rem;
    border-bottom: .013333rem solid #ddd;
    font-size: .5rem;
  }

  input {
    flex: 1;
    color: #606266;
  }

  input[type=password] {
    padding-left: .533333rem;
  }

  button {
    width: 100%;
    height: 1rem;
    margin-top: .266667rem;
    background-color: #eee;
    font-size: .5rem;
    line-height: 1rem;
    text-align: center;
    color: #999;
    border-radius: .04rem;
  }

  .active {
    background-color: rgb(14, 212, 14) !important;
    color: #fff !important;
  }

  .el-icon-close {
    position: absolute;
    top: .133333rem;
    left: .133333rem;
    font-size: .6rem;
  }

  .go {
    margin: .4rem .066667rem 0 0;
    text-align: right;
    font-size: .3rem;
    color: #858282;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
