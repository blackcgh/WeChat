<template>
<div class="spread" :class="{click:isShow}">
  <ul @click="go">
    <li v-for="item of functions" :key="item.desc" :data-name="item.name">
      <i class="iconfont" :class="item.class"></i>
      {{item.desc}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Spread',
  data() {
    return {
      functions: [
        {
          name: 'group',
          class: 'icon-liaotian1',
          desc: '发起群聊'
        },
        {
          name: 'friend',
          class: 'icon-tianjiapengyou',
          desc: '添加朋友'
        },
        {
          name: 'scan',
          class: 'icon-saoyisao',
          desc: '扫一扫'
        },
        {
          name: 'money',
          class: 'icon-shoufukuan',
          desc: '收付款'
        },
        {
          name: 'help',
          class: 'icon-yijianfankui',
          desc: '帮助与反馈'
        }
      ]
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    go(e) {
      const str = e.target.getAttribute('data-name');
      if(str === 'friend') {
        this.$router.push('/search');
        return
      }
      this.$alert('该功能暂时还没有开发', '信息提示', {
        closeOnClickModal: true,
        confirmButtonText: '确定'
      });
    }
  }
}
</script>

<style>
.spread {
  position: absolute;
  top: 48px;
  right: 5px;
  width: 0;
  height: 50px;
  overflow: hidden;
  opacity: 0;
  transition: all .2s;
}

.spread::before {
  content: '';
  position: absolute;
  top: -7px;
  right: 11px;
  border: 8px solid transparent;
  border-bottom-color: rgb(56, 57, 58);
}

.spread ul {
  position: absolute;
  top: 0;
  right: 0;
  width: 150px;
  margin-top: 8px;
  background-color: rgb(56, 57, 58);
  color: #fff;
  font-size: 16px;
  text-align: center;
  border-radius: 5px;
  overflow: hidden;
}

.spread li {
  position: relative;
  height: 40px;
  line-height: 40px;
}

.spread li:hover {
  background-color: rgb(41, 42, 42);
}

.spread i {
  position: absolute;
  top: -1px;
  left: 10px;
  font-size: 22px;
}

.click {
  width: 150px;
  height: 208px;
  opacity: 1;
}

.el-message-box {
  width: 350px;
}
</style>
