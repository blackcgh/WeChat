<template>
  <div id="search-friend">
    <!-- 导航栏 -->
    <nav-bar :showBtn="false"><i class="el-icon-arrow-left" @click="back"></i>添加朋友</nav-bar>

    <!-- 搜索框 -->
    <div class="search-area">
      <el-input v-model="keyword" placeholder="输入用户名搜索" prefix-icon="el-icon-search" clearable>
      </el-input>
      <el-button type="primary" key="search" @click="search">搜索</el-button>
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
      <div v-else class="clue">没有该用户（不显示已是朋友关系的用户）！</div>
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

<style>
  #search-friend {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    z-index: 1;
  }

  .nav-bar .text i {
    position: relative;
    top: 0;
    left: 0;
    padding: 15px 10px 15px 0;
  }

  .search-area {
    padding: 10px 0;
  }

  #search-friend .el-input {
    width: 75%;
    margin: 0 8px;
    font-size: 16px;
  }

  #search-friend .el-button {
    width: 18%;
    height: 40px;
    padding: 0;
  }

  .search-result h3 {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    color: #999;
  }

  .search-result ul {
    background-color: #fff;
  }

  .search-result li {
    height: 68px;
    background-color: #fff;
    font-size: 18px;
    line-height: 48px;
  }

  .search-result li div {
    float: left;
    height: 48px;
  }

  .search-result li div:first-child {
    width: 48px;
    margin: 10px 15px 10px 10px;
    border-radius: 3px;
    background-color: rgb(57, 74, 235);
  }

  .search-result li div:last-child {
    width: 292px;
    padding: 10px 0 9px;
    border-bottom: 1px solid #ddd;
  }

  .search-result li div:first-child img {
    width: 100%;
    height: 100%;
  }

  .clue {
    margin-top: 15px;
    font-size: 14px;
    color: #969696;
    text-align: center;
  }
</style>
