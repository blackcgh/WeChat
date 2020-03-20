<template>
<div id="tab-bar-item" @click="click">
  <div class="icon"><slot name="icon"></slot></div>
  <div class="text"><slot name="text"></slot></div>
</div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    link: ''
  },
  computed: {
    getCurrentPath() {
      return this.$route.path === this.link
    }
  },
  methods: {
    click() {
      if(!this.getCurrentPath) {
        this.$router.push(this.link)
      }
    }
  }
}
</script>

<style scoped>
#tab-bar-item {
  flex: 1;
  height: 100%;
  text-align: center;
}

.icon {
  width: 36px;
  height: 36px;
  margin: 3px auto;
  font-size: 18px;
  line-height: 36px;
}
</style>
