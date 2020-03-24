<template>
  <!-- 已完成图标 -->
  <div id="done" v-show="isShow">{{msg}}</div>
</template>

<script>
  export default {
    name: 'Done',
    data() {
      return {
        isShow: false,
        msg: '已发送'
      }
    },
    methods: {
      show(msg) {
        if(msg) this.msg = msg;
        this.isShow = true;

        // 2秒后关闭提示框
        setTimeout(() => {
          this.isShow = false
        }, 1500);
      }
    }
  }
</script>

<style scoped>
  #done {
    position: fixed;
    bottom: 40px;
    left: 50%;
    width: 100px;
    height: 30px;
    background-color: rgba(0, 0, 0, .8);
    line-height: 30px;
    text-align: center;
    color: #fff;
    transform: translateX(-50%);
    z-index: 2;
  }
</style>
