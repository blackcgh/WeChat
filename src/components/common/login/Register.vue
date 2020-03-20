<template>
  <!-- 加载图标 -->
  <div id="register"
       v-loading="loading"
       element-loading-text="请稍后 . . ."
       element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 内容 -->
    <div class="desc">微信注册</div>

    <el-form :model="formData">
      <!-- 用户名输入框 -->
      <el-form-item label="用户名">
        <el-input
          v-model="formData.username"
          placeholder="请填写用户名"
          clearable></el-input>
      </el-form-item>

      <!-- 密码输入框 -->
      <el-form-item class="second" label="密码">
        <el-input
          type="password"
          v-model="formData.password"
          placeholder="填写密码"
          clearable></el-input>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <el-button class="btn" :class="{active: getCurrent}" @click="register">注册
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 前往登录页面 -->
    <div class="go-login" @click="goLogin">已有账号？去登录 >></div>
  </div>
</template>

<script>
  import { register } from 'network/user'

  export default {
    name: 'Register',
    data() {
      return {
        formData: {
          username: '',
          password: ''
        },
        loading: false,
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
                confirmButtonText: '确定'
              });
            }
            if (pwdLen < 2 || pwdLen > 6) {
              this.$alert('密码必须在 2 到 15 个字符之间', '密码错误', {
                confirmButtonText: '确定'
              });
            }
            return
          }

          // 开始注册
          this.loading = true;
          const result = await register(this.formData.username, this.formData.password);
          this.loading = false;
          if(result.data.errno !== 0) {
            this.$alert('该用户已存在！', '注册失败', {
              confirmButtonText: '确定'
            });
            return
          }
          this.$router.replace('/welcome');
        }

      },
      // 去登录
      goLogin() {
        this.$router.push('/login')
      }
    }
  }
</script>

<style>
  #register {
    width: 100vw;
    height: 100vh;
    padding: 10px;
    background-color: #fff;
    box-sizing: border-box;
  }

  .desc {
    padding: 50px 0;
    font-size: 30px;
  }

  #register label {
    font-size: 18px;
  }

  .el-form-item {
    border-bottom: 1px solid #ddd;
  }

  .second label {
    padding-right: 28px;
  }

  .el-input {
    width: 80%;
    border: 0;
    font-size: 18px;
  }

  .el-input input {
    border: 0;
  }

  .btn {
    width: 99%;
    font-size: 18px;
    border: 0;
    background-color: #eee;
    color: #999;
  }

  .active {
    background-color: rgb(14, 212, 14) !important;
    color: #fff !important;
  }

  .el-loading-mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .2) !important;
  }

  .el-loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 70px;
    background-color: rgba(0, 0, 0, .8);
    transform: translate(-50%, -50%);
  }

  .path {
    stroke: #fff !important;
  }

  .el-loading-text {
    color: #fff !important;
  }

  .el-message-box {
    width: 350px;
  }

  .el-icon-close {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 24px;
  }

  .el-form-item__label::before {
    content: '';
  }

  .go-login {
    margin: 30px 5px 0 0;
    text-align: right;
    font-size: 14px;
    color: #858282;
    text-decoration: underline;
  }
</style>
