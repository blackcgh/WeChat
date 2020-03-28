<template>
  <div id="welcome">
    <keep-alive exclude="Wechat,Chat,Search">
      <router-view />
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/maintabbar/MainTabBar'

  export default {
    name: 'Welcome',
    components: {
      MainTabBar
    }
  }
</script>

<style scoped>
  #welcome {
    height: calc(100vh - 1.586667rem);
    background-color: #ededed;
    overflow: auto;
    font-size: .213333rem;
  }
</style>
