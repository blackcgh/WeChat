<template>
<div id="main-tab-bar">
  <tab-bar>
    <tab-bar-item link="/wechat">
      <template v-slot:icon><i class="iconfont icon-liaotian"></i></template>
      <template v-slot:icon-active><i class="iconfont icon-liaotian1"></i></template>
      <template v-slot:text>微信</template>
    </tab-bar-item>
    <tab-bar-item link="/friend">{{getNum}}
      <template v-slot:icon><i class="iconfont icon-mail-list big"></i></template>
      <template v-slot:icon-active><i class="iconfont icon-tongxunlu big"></i></template>
      <template v-slot:text>通讯录</template>
    </tab-bar-item>
    <tab-bar-item link="/find">
      <template v-slot:icon><i class="iconfont icon-find-normal"></i></template>
      <template v-slot:icon-active><i class="iconfont icon-faxian-mianxing-"></i></template>
      <template v-slot:text>发现</template>
    </tab-bar-item>
    <tab-bar-item link="/profile">
      <template v-slot:icon><i class="iconfont icon-wo"></i></template>
      <template v-slot:icon-active><i class="iconfont icon-wode"></i></template>
      <template v-slot:text>我</template>
    </tab-bar-item>
  </tab-bar>
</div>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  computed: {
    getNum() {
      return this.$store.state.userData.request.length
    }
  },
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style scoped>
#main-tab-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10rem;
  height: 1.586667rem;
  border-top: .013333rem solid #ccc;
  background-color: #f7f7f7;
}

.big {
  font-size: .866667rem;
}
</style>
