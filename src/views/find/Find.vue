<template>
  <div id="find">
    <!-- 导航栏 -->
    <nav-bar>发现</nav-bar>

    <!-- 功能 -->
    <div>
      <ul @click="itemClick">
        <!-- 朋友圈 -->
        <li class="find-feature">
          <div>
            <svg class="icon most" aria-hidden="true">
              <use xlink:href="#icon-pengyouquan"></use>
            </svg>
          </div>
          <div>朋友圈</div>
        </li>

        <!-- 扫、摇 -->
        <li>
          <div>
            <svg class="icon more" aria-hidden="true">
              <use xlink:href="#icon-saoyisao1"></use>
            </svg>
          </div>
          <div>扫一扫</div>
        </li>
        <li class="find-feature">
          <div>
            <svg class="icon more" aria-hidden="true">
              <use xlink:href="#icon-yaoyiyao"></use>
            </svg>
          </div>
          <div>摇一摇</div>
        </li>

        <!-- 看、搜 -->
        <li>
          <div>
            <svg class="icon more" aria-hidden="true">
              <use xlink:href="#icon-kanyikanicon"></use>
            </svg>
          </div>
          <div>看一看</div>
        </li>
        <li class="find-feature">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-souyisouicon"></use>
            </svg>
          </div>
          <div>搜一搜</div>
        </li>

        <!-- 附近 -->
        <li class="find-feature">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-fujinderenicon"></use>
            </svg>
          </div>
          <div>附近的人</div>
        </li>

        <!-- 购物、游戏 -->
        <li>
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-gouwu"></use>
            </svg>
          </div>
          <div>购物</div>
        </li>
        <li class="find-feature">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youxi"></use>
            </svg>
          </div>
          <div>游戏</div>
        </li>

        <!-- 小程序 -->
        <li class="find-feature cl">
          <div>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-xiaochengxu"></use>
            </svg>
          </div>
          <div>小程序</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  export default {
    name: 'Find',
    components: {
      NavBar
    },
    methods: {
      itemClick() {
        this.$alert('暂时不支持该页面所有功能', '信息提示', {
          closeOnClickModal: true,
          confirmButtonText: '确定'
        });
      }
    }
  }
</script>

<style scoped>
  .find-feature {
    margin-bottom: 10px;
  }

  .cl {
    margin-bottom: 0;
  }

  li.find-feature div:last-child {
    border-bottom: 0;
  }
  li {
    height: 46px;
    background-color: #fff;
    line-height: 36px;
  }

  li div {
    float: left;
    height: 36px;
  }

  li div:first-child {
    width: 36px;
    margin: 5px 15px 5px 10px;
    border-radius: 3px;
    line-height: 36px;
    text-align: center;
  }

  li div:last-child {
    position: relative;
    width: calc(100vw - 61px);
    padding: 5px 0 4px;
    border-bottom: 1px solid #ddd;
  }

  li div:last-child::after {
    content: '>';
    position: absolute;
    top: 10px;
    right: 10px;
    color: rgb(212, 212, 212);
    font-size: 22px;
  }

  li:last-child div:last-child {
    border-bottom: 0;
  }

  svg {
    font-size: 20px;
  }

  .more {
    font-size: 26px;
  }

  .most {
    font-size: 32px;
  }
</style>
