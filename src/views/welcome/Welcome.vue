<template>
<div id="welcome">
  <router-view />
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
</style>
