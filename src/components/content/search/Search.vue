<template>
  <div id="search-friend">
    <!-- 导航栏 -->
    <nav-bar :showBtn="false"><i class="el-icon-arrow-left" @click="back"></i>添加朋友</nav-bar>

    <!-- 搜索框 -->
    <div class="search-area">
      <input v-model="keyword" placeholder="输入用户名搜索" clearable />
      <button key="search" @click="search">搜索</button>
    </div>

    <!-- 搜索结果 -->
    <div class="search-result" v-show="!isEmpty">
      <h3>搜索结果</h3>
      <ul v-if="result.length" @click="goDetail">
        <li v-for="(item,index) of result" :key="item.username" :data-index="index">
          <!-- 头像 -->
          <div><img :src="item.avatar" alt=""></div>
          <!-- 用户名 -->
          <div>{{item.username}}</div>
        </li>
      </ul>
      <div v-else class="clue">没有该用户（不显示已是朋友关系的用户）</div>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import { search } from 'network/user'

  export default {
    name: 'Search',
    data() {
      return {
        keyword: '',
        result: [],
        isEmpty: true
      }
    },
    components: {
      NavBar
    },
    methods: {
      // 返回上一步
      back() {
        this.$router.back();
      },
      // 搜索
      async search() {
        if (this.keyword === '') {
          this.$alert('请输入用户名！', '信息提示', {
            closeOnClickModal: true,
            confirmButtonText: '确定'
          });
          return
        }

        // 开始搜索
        this.result = [];
        this.$loading.show();
        const result = (await search(this.keyword)).data.data;
        const username = this.$store.state.userData.username;
        let friend = this.$store.state.userData.friend;
        friend = friend.map(el => el.friend);
        const all = [username, ...friend];
        result.forEach(el => {
          const index = all.indexOf(el.username);
          if(index === -1) {
            this.result.push(el)
          }
        });
        this.$loading.hidden();
        this.isEmpty = false
      },
      // 去往用户详情页
      goDetail(e) {
        const index = e.target.parentNode.getAttribute('data-index');
        this.$router.push({
          path: '/introduct',
          query: this.result[index]
        })
      }
    }
  }
</script>

<style scoped>
  #search-friend {
    position: fixed;
    width: 10rem;
    height: 100vh;
    background-color: rgb(248, 248, 246);
    z-index: 1;
    overflow: auto;
  }

  .nav-bar .text i {
    position: relative;
    top: 0;
    left: 0;
    padding: .4rem .266667rem .4rem 0;
  }

  .search-area {
    padding: .266667rem 0;
  }

  input {
    width: 7.493333rem;
    height: 1.2rem;
    padding: .133333rem;
    margin: 0 .213333rem;
    border: 1px solid #d4d3d3;
    font-size: .426667rem;
    box-sizing: border-box;
    vertical-align: middle;
  }

  button {
    width: 2rem;
    height: 1.2rem;
    padding: 0;
    background-color: rgb(30, 177, 30);
    color: #fff;
    font-size: .533333rem;
    vertical-align: middle;
  }

  .search-result h3 {
    padding: .266667rem;
    border-bottom: 1px solid #ddd;
    font-size: .373333rem;
    color: #999;
  }

  .search-result ul {
    background-color: #fff;
  }

  .search-result li {
    height: 1.813333rem;
    background-color: #fff;
    font-size: .48rem;
    line-height: 1.28rem;
  }

  .search-result li div {
    float: left;
    height: 1.28rem;
  }

  .search-result li div:first-child {
    width: 1.28rem;
    margin: .266667rem;
    margin-right: .4rem;
    border-radius: .08rem;
    background-color: rgb(57, 74, 235);
  }

  .search-result li div:last-child {
    width: calc(10rem - 1.946667rem);
    padding: .266667rem 0 .24rem;
    border-bottom: .026667rem solid #ddd;
  }

  .search-result li div:first-child img {
    width: 100%;
    height: 100%;
  }

  .clue {
    margin-top: .4rem;
    font-size: .373333rem;
    color: #969696;
    text-align: center;
  }
</style>
