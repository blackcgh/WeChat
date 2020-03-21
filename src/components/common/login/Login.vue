<template>
  <div id="login">
    <!-- 内容 -->
    <div class="desc">微信登录</div>

    <el-form :model="formData">
      <!-- 用户名输入框 -->
      <el-form-item label="用户名">
        <el-input
          :disabled="value"
          v-model="formData.username"
          placeholder="请填写用户名"
          clearable></el-input>
      </el-form-item>

      <!-- 密码输入框 -->
      <el-form-item class="form-item second" v-show="isShow" label="密码">
        <el-input
          type="password"
          v-model="formData.password"
          placeholder="请填写微信密码"
          clearable></el-input>
      </el-form-item>

      <!-- 按钮 -->
      <el-form-item>
        <el-button class="btn" :class="{active: getCurrent}" v-if="!isShow" @click="next">
          下一步
        </el-button>
        <el-button class="btn" :class="{active: getCurrent}" v-else @click="login">
          登录
        </el-button>
      </el-form-item>
    </el-form>

    <!-- 前往注册页面 -->
    <div class="go-register" @click="goRegister">还没有账号？去注册 >></div>

    <!-- 返回上一步 -->
    <i class="el-icon-close" v-show="isShow" @click="back"></i>
  </div>
</template>

<script>
  import { login } from 'network/user'

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
          }, 1000)
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
        if(result.data.errno !== 0) {
          this.$alert('该用户不存在！', '登录失败', {
            closeOnClickModal: true,
            confirmButtonText: '确定'
          });
          return
        }
        // 保存token
        sessionStorage.setItem('token', result.data.data.token);
        // 用于验证token是否过期
        sessionStorage.setItem('expire', new Date().getTime());

        this.$store.commit('record', result.data.data.username);
        this.$router.replace('/welcome')
      },

      // 前往注册页面
      goRegister() {
        this.$router.push('/register')
      }
    }
  }
</script>

<style>
  #login {
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

  #login label {
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

  .el-form-item .el-input input {
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

  .el-message-box {
    width: 350px;
  }

  .el-icon-close {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 24px;
  }

  .go-register {
    margin: 30px 5px 0 0;
    text-align: right;
    font-size: 14px;
    color: #858282;
    text-decoration: underline;
  }
</style>
