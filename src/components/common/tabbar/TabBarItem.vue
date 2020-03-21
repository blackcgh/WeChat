<template>
<div id="tab-bar-item" @click="click">
  <div class="icon" v-show="!getCurrentPath"><slot name="icon"></slot></div>
  <div class="icon-active" v-show="getCurrentPath"><slot name="icon-active"></slot></div>
  <div class="text" :class="{active: getCurrentPath}"><slot name="text"></slot></div>
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

.icon,
.icon-active {
  width: 36px;
  height: 36px;
  margin: 3px auto;
  line-height: 36px;
}

.icon-active {
  color: rgb(38, 216, 38);
}

.active {
  background-color: #fff !important;
  color: rgb(38, 216, 38) !important;
}
</style>
