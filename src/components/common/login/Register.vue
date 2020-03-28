<template>
  <div id="register">
    <!-- 内容 -->
    <div class="desc">微信注册</div>

    <!-- 用户名输入框 -->
    <div class="user">
      <label>用户名</label>
      <input v-model="formData.username" placeholder="请填写用户名" clearable key="ruser" />
    </div>

    <!-- 密码输入框 -->
    <div class="pwd">
      <label>密码</label>
      <input type="password"
             v-model="formData.password"
             placeholder="填写密码"
             clearable key="rpwd" />
    </div>

    <!-- 按钮 -->
    <button :class="{active: getCurrent}" key="register" @click="register">注册</button>

    <!-- 前往登录页面 -->
    <div class="go" @click="goLogin">已有账号？去登录 >></div>
  </div>
</template>

<script>
  import {
    register
  } from 'network/user'

  export default {
    name: 'Register',
    data() {
      return {
        formData: {
          username: '',
          password: ''
        }
      }
    },
    computed: {
      //是否有输入
      getCurrent() {
        return this.formData.username.length !== 0 && this.formData.password.length !== 0;
      }
    },
    methods: {
      // 注册
      async register() {
        // 验证输入框
        if (this.getCurrent) {
          const userLen = this.formData.username.length;
          const pwdLen = this.formData.password.length;
          if (userLen < 2 || userLen > 6 || pwdLen < 2 || pwdLen > 6) {
            if (userLen < 2 || userLen > 6) {
              this.$alert('用户名必须在 2 到 6 个字符之间', '用户名错误', {
                closeOnClickModal: true,
                confirmButtonText: '确定'
              });
            }
            if (pwdLen < 2 || pwdLen > 6) {
              this.$alert('密码必须在 2 到 15 个字符之间', '密码错误', {
                closeOnClickModal: true,
                confirmButtonText: '确定'
              });
            }
            return
          }

          // 开始注册
          this.$loading.show();
          const result = await register(this.formData.username, this.formData.password);
          this.$loading.hidden();
          if (result.data.errno !== 0) {
            this.$alert('该用户已存在！', '注册失败', {
              closeOnClickModal: true,
              confirmButtonText: '确定'
            });
            return
          }
          this.$router.replace('/login')
        }
      },
      // 去登录
      goLogin() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>
  #register {
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

  .go {
    margin: .4rem .066667rem 0 0;
    text-align: right;
    font-size: .3rem;
    color: #858282;
    text-decoration: underline;
    cursor: pointer;
  }
</style>
