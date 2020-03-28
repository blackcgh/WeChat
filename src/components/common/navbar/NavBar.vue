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
      search() {
        this.$alert('暂时不支持搜索功能', '信息提示', {
          closeOnClickModal: true,
          confirmButtonText: '确定'
        });
      }
    }
  }
</script>

<style scoped>
  .nav-bar {
    position: relative;
    width: 100%;
    height: 1.253333rem;
    border-bottom: .026667rem solid #ddd;
    background-color: #ededed;
    font-size: .533333rem;
    line-height: 1.28rem;
    text-align: center;
  }

  .text {
    width: 5.333333rem;
    height: 100%;
    padding-left: .266667rem;
    text-align: left;
    font-size: .48rem;
    font-weight: 700;
  }

  .add {
    position: relative;
    width: 1.333333rem;
    height: 100%;
    font-size: .64rem;
  }

  .search {
    width: 1.333333rem;
    height: 100%;
    font-size: .64rem;
  }
</style>
