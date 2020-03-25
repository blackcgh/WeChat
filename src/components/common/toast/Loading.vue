<template>
  <div id="loading" v-loading="loading" :element-loading-text="msg">
  </div>
</template>

<script>
  export default {
    name: 'Loading',
    data() {
      return {
        loading: false,
        msg: '请稍后...'
      }
    },
    methods: {
      show(msg) {
        if (msg) this.msg = msg;
        this.loading = true
      },
      hidden() {
        this.loading = false;
        this.msg = '请稍后...'
      }
    }
  }
</script>

<style>
  .el-loading-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .4) !important;
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
</style>
