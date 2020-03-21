<template>
  <div class="nav-bar">
    <!-- 返回上一步 -->
    <div class="text fl">
      <slot></slot>
    </div>
    <!-- 添加按钮 -->
    <div class="add fr" v-if="showBtn" @click="add">
      <i class="el-icon-circle-plus-outline"></i>
      <spread :isShow="isShow"></spread>
    </div>
    <!-- 搜索用户按钮 -->
    <div class="search fr" v-if="showBtn" @click="search"><i class="el-icon-search"></i></div>

    <!-- 发送添加申请按钮 -->
    <slot name="send"></slot>
  </div>
</template>

<script>
  import Spread from 'components/common/spread/Spread'
  export default {
    name: 'NavBar',
    data() {
      return {
        isShow: false
      }
    },
    props: {
      // 是否显示添加按钮
      showBtn: {
        type: Boolean,
        default: true
      }
    },
    components: {
      Spread
    },
    methods: {
      add() {
        this.isShow = !this.isShow

      },
      search() {}
    }
  }
</script>

<style scoped>
  .nav-bar {
    position: relative;
    width: 100vw;
    height: 48px;
    background-color: rgb(248, 248, 246);
    font-size: 20px;
    line-height: 48px;
    text-align: center;
  }

  .text {
    width: 200px;
    height: 100%;
    padding-left: 10px;
    text-align: left;
  }

  .add {
    position: relative;
    width: 50px;
    height: 100%;
    font-size: 24px;
  }

  .search {
    width: 50px;
    height: 100%;
    font-size: 24px;
  }
</style>
