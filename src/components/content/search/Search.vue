<template>
  <div id="search-friend">
    <!-- 导航栏 -->
    <nav-bar :showBtn="false"><i class="el-icon-arrow-left" @click="back"></i>添加朋友</nav-bar>

    <!-- 搜索框 -->
    <div class="search-area">
      <el-input v-model="keyword" placeholder="输入用户名搜索" prefix-icon="el-icon-search" clearable>
      </el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>

    <!-- 搜索结果 -->
    <div class="search-result" v-show="!isEmpty">
      <h3>搜索结果</h3>
      <ul v-if="result.length" @click="goDetail">
        <li v-for="(item,index) of result" :key="item.username" :data-index="index">
          <!-- 头像 -->
          <div><img src="" alt=""></div>
          <!-- 用户名 -->
          {{item.username}}
        </li>
      </ul>
      <div v-else class="clue">没有该用户！</div>
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
        this.$loading.show();
        const result = await search(this.keyword);
        this.result = result.data.data.filter(el => {
          return el.username !== this.$store.state.username
        });
        this.$loading.hidden();
        this.isEmpty = false
      },
      // 去往用户详情页
      goDetail(e) {
        const index = e.target.getAttribute('data-index');
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
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: #fff;
    z-index: 1;
  }

  .nav-bar i {
    position: relative;
    top: 1px;
    left: 0;
    padding: 15px 10px 15px 0;
  }

  .search-area {
    padding: 10px 0;
  }

  .el-input {
    width: 75%;
    margin: 0 8px;
    font-size: 16px;
  }

  .el-button {
    width: 20%;
    height: 40px;
    padding: 0;
  }

  .search-result {
    padding: 0 8px;
  }

  .search-result h3 {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    color: #bbb;
  }

  .search-result li {
    height: 48px;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 18px;
    line-height: 48px;
  }

  .search-result li:hover {
    background-color: #ddd;
  }

  .search-result li>div {
    float: left;
    width: 48px;
    height: 48px;
    margin-right: 15px;
    border-radius: 3px;
    background-color: rgb(57, 74, 235);
  }

  .el-message-box {
    width: 350px;
  }

  .clue {
    margin-top: 20px;
    text-align: center;
    color: #999;
  }
</style>
