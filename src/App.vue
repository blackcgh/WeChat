<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      getTime() {
        return +new Date()
      }
    }
  }
</script>

<style>
</style>
