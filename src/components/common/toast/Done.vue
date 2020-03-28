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
          this.isShow = false;
          this.msg = '已发送'
        }, 1500);
      }
    }
  }
</script>

<style scoped>
  #done {
    position: fixed;
    bottom: 1.066667rem;
    left: 50%;
    width: 2.666667rem;
    height: .8rem;
    background-color: rgba(0, 0, 0, .8);
    line-height: .8rem;
    text-align: center;
    font-size: .48rem;
    color: #fff;
    transform: translateX(-50%);
    z-index: 2;
  }
</style>
