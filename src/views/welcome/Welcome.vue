<template>
  <div id="welcome">
    <keep-alive exclude="WeChat,Chat,Search">
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
    height: calc(100vh - 60px);
    background-color: #ededed;
    overflow: scroll;
    font-size: 16px;
  }
</style>
