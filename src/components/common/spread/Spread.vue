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
      let str;
      if(e.target.tagName === 'I') {
        str = e.target.parentNode.getAttribute('data-name');
      } else {
         str = e.target.getAttribute('data-name');
      }
      if(str === 'friend') {
        this.$router.push('/search');
        return
      }
      this.$alert('暂时只支持添加朋友功能', '信息提示', {
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
  top: 1.28rem;
  right: .133333rem;
  width: 0;
  height: 1.333333rem;
  overflow: hidden;
  opacity: 0;
  transition: all .2s;
  z-index: 1;
}

.spread::before {
  content: '';
  position: absolute;
  top: -0.186667rem;
  right: .333333rem;
  border: .213333rem solid transparent;
  border-bottom-color: rgb(56, 57, 58);
}

.spread ul {
  position: absolute;
  top: 0;
  right: 0;
  width: 4rem;
  margin-top: .213333rem;
  background-color: rgb(56, 57, 58);
  color: #fff;
  font-size: .426667rem;
  text-align: center;
  border-radius: .133333rem;
  overflow: hidden;
}

.spread li {
  position: relative;
  height: 1.066667rem;
  line-height: 1.066667rem;
  cursor: pointer;
}

.spread li:hover {
  background-color: rgb(41, 42, 42);
}

.spread i {
  position: absolute;
  top: -0.026667rem;
  left: .266667rem;
  font-size: .586667rem;
}

.click {
  width: 4rem;
  height: 5.546667rem;
  opacity: 1;
}

.el-message-box {
  width: 9.333333rem;
}
</style>
