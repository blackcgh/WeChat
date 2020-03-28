<template>
<div id="tab-bar-item" @click="click">
  <span v-if="show"><slot></slot></span>
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
    show() {
      return this.$store.state.userData.request.length !== 0 && this.link === '/friend'
    },
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
  position: relative;
  flex: 1;
  height: 100%;
  text-align: center;
}

.icon,
.icon-active {
  width: .96rem;
  height: .96rem;
  margin: .08rem auto;
  line-height: .96rem;
}

i {
  font-size: .746667rem;
}

.icon-active {
  color: rgb(38, 216, 38);
}

.active {
  /* background-color: #fff !important; */
  color: rgb(38, 216, 38) !important;
}

span {
  position: absolute;
  top: .133333rem;
  right: .666667rem;
  padding: .16rem;
  background-color: #f00;
  color: #fff;
  line-height: .14rem;
  border-radius: 50%;
}

.text {
  font-size: .32rem;
}
</style>
