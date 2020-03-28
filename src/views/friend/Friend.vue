<template>
  <div id="friend">
    <!-- 导航栏 -->
    <nav-bar>通讯录</nav-bar>

    <!-- 功能队列 -->
    <div class="function">
      <ul @click="reject">
        <li class="first" @click.stop="response">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tianjiapengyou1"></use>
            </svg>
          </div>
          <div>新的朋友</div>

          <!-- 提示 -->
          <span v-if="getNum!==0">{{getNum}}</span>
        </li>
        <li class="second">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-qunliao1"></use>
            </svg>
          </div>
          <div>群聊</div>
        </li>
        <li class="third">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-biaoqian"></use>
            </svg>
          </div>
          <div>标签</div>
        </li>
        <li class="fourth">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gongzhonghao"></use>
            </svg>
          </div>
          <div>公众号</div>
        </li>
      </ul>
    </div>

    <!-- 朋友列表 -->
    <div class="friend-list">
      <h3>朋友列表</h3>
      <ul v-if="$store.state.userData.friend.length" @click="goChat">
        <li v-for="(item,index) of $store.state.userData.friend" :key="item.friend" :data-index="index">
          <!-- 头像 -->
          <div><img :src="item.avatar" alt=""></div>
          <!-- 用户名 -->
          <div>{{item.friend}}</div>
        </li>
      </ul>
      <div class="none" v-else>你还没有朋友呢,<a href="javascript:;" @click="goSearch">
        去添加
      </a></div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'Friend',
    computed: {
      getNum() {
        return this.$store.state.userData.request.length
      }
    },
    components: {
      NavBar
    },
    methods: {
      reject() {
        this.$alert('暂时只支持新的朋友功能', '信息提示', {
          closeOnClickModal: true,
          confirmButtonText: '确定'
        });
      },
      response() {
        this.$router.push('/response')
      },
      goSearch() {
        this.$router.push('/search')
      },
      // 去往聊天页面
      goChat(e) {
        const index = e.target.parentNode.getAttribute('data-index');
        this.$router.push({
          path: '/chat',
          query: { index }
        })
      }
    }
  }
</script>

<style scoped>
  ul {
    background-color: #fff;
  }

  li {
    position: relative;
    height: 1.6rem;
    background-color: #fff;
    line-height: 1.066667rem;
  }

  li:hover {
    background-color: #eeeded;
  }

  li div {
    float: left;
    height: 1.066667rem;
  }

  li div:first-of-type {
    width: 1.066667rem;
    margin: .266667rem;
    margin-right: .4rem;
    border-radius: .08rem;
    background-color: rgb(77, 231, 77);
    line-height: 1.066667rem;
    text-align: center;
  }

  li div:last-of-type {
    width: calc(10rem - 1.96rem);
    padding: .266667rem 0 .24rem;
    border-bottom: .026667rem solid #ddd;
  }

  li div:first-of-type img {
    width: 100%;
    height: 100%;
  }

  .friend-list h3 {
    padding: .266667rem;
    font-size: .373333rem;
    color: #333;
  }

  li:last-child div:last-child {
    border-bottom: 0;
  }

  svg {
    position: relative;
    top: .053333rem;
    left: 0;
    font-size: .693333rem;
    color: #fff;
  }

  .fourth svg {
    font-size: .533333rem;
  }

  .first div:first-child {
    background-color: #fa9e3b;
  }

  .second div:first-child {
    background-color: #07c160;
  }

  .third div:first-child,
  .fourth div:first-child {
    background-color: #2682d5;
  }

  .fourth div {
    border-bottom: 0;
  }

  .first span {
    position: absolute;
    top: .533333rem;
    right: .4rem;
    padding: .16rem;
    background-color: #f00;
    color: #fff;
    line-height: .14rem;
    border-radius: 50%;
  }

  .none {
    margin-top: .4rem;
    font-size: .373333rem;
    color: #969696;
    text-align: center;
  }
</style>
