<template>
  <div :class="['ep-aside', isSidebar? 'side_max_width' : 'side_min_width' ]">
    <div class="ep-logo">
      <img src="../assets/logo.png" alt />
      <h1>模板系统</h1>
    </div>
    <div class="ep-menu">
      <el-scrollbar class="ep-scrollbar">
        <!-- S 一级菜单 -->
        <ul class="ep-menu-body" :style="isSidebar ? 'width: 256px;' : 'width: 80px;'">
          <template v-for="(item, index) in menus">
            <li :class="['ep-submenu', (selIndex === index && selTwoIndex === -1) && 'selectedItemBgc']" :key="index" @click="handleClick(index, item)">
              <div class="ep-submenu__title">
                <i class="el-icon-menu"></i>
                <span class="ep-title one-line" :title="item.title">{{ item.title }}</span>
                <i class="el-submenu__icon-arrow" v-show="item.children" :class="isExpand && selIndex === index ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
              </div>
            </li>
            <!-- S 二级菜单 -->
            <template>
              <transition name="slide-fade" :key="index">
                <ul class="ep-menu-body" v-show="isExpand && selIndex === index">
                  <template v-for="(two, i) in item.children">
                    <li :class="['ep-submenu', (selTwoIndex === i && selThreeIndex === -1) && 'selectedItemBgc']" @click="handleClick1(i, two)" :key="i">
                      <div class="ep-submenu__title">
                        <span class="ep-title one-line" :title="two.title">{{ two.title }}</span>
                        <i
                          class="el-submenu__icon-arrow"
                          v-show="two.children && two.children.length > 0"
                          :class="isExpand && selTwoIndex === i ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                        ></i>
                      </div>
                    </li>
                    <!-- S 三级菜单 -->
                    <transition name="slide-fade" :key="i">
                      <ul class="ep-menu-body" v-show="isExpandTwo && selTwoIndex === i">
                        <template v-for="(three, j) in two.children">
                          <li :class="['ep-submenu', (three.location === routePath) && 'selectedItemBgc']" @click="handleClick2(j, three)" :key="j">
                            <div class="ep-submenu__title">
                              <span class="ep-title one-line" :title="three.title">{{ three.title }}</span>
                              <i
                                class="el-submenu__icon-arrow"
                                v-show="three.children && three.children.length > 0"
                                :class="selIndex === index ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                              ></i>
                            </div>
                          </li>
                        </template>
                      </ul>
                    </transition>
                    <!-- S 三级菜单 -->
                  </template>
                </ul>
              </transition>
            </template>
            <!-- S 二级菜单 -->
          </template>
        </ul>
      </el-scrollbar>
      <!--</el-scrollbar>-->
    </div>
    <div class="ep-sidebar-bg" :style="isSidebar ? 'width: 256px;' : 'width: 80px;'"></div>
  </div>
</template>

<script type="es6">
import onlineLeftMenu from '../mock/onlineLeftMenu';

export default {
  props: ['index'],
  data() {
    return {
      menus: onlineLeftMenu,
      selIndex: -1,
      selTwoIndex: -1,
      selThreeIndex: -1,
      isExpand: false,
      isExpandTwo: false
    };
  },
  computed: {
    isSidebar() {
      return this.$store.getters.isSidebar;
    },
    routePath() {
      return this.$route.path;
    }
  },
  watch: {
    isSidebar: {
      handler(value) {
        return value;
      },
      deep: true
    },
    routePath(value) {
      if (value === '/Home') {
        this.isExpand = false;
        this.isExpandTwo = false;
      }
      return value;
    }
  },
  created() {
    if (sessionStorage.getItem('selIndex')) {
      this.isExpand = true;
      this.isExpandTwo = true;
      this.selIndex = Number(sessionStorage.getItem('selIndex'));
      this.selTwoIndex = Number(sessionStorage.getItem('selTwoIndex'));
      this.selThreeIndex = Number(sessionStorage.getItem('selThreeIndex'));
    }
  },
  methods: {
    // 一级菜单点击
    handleClick(index, item) {
      sessionStorage.setItem('selIndex', index);
      if (index !== this.selIndex) {
        this.isExpand = true;
      } else {
        this.isExpand = !this.isExpand;
      }
      this.selIndex = index;
      this.selTwoIndex = -1;
      this.selThreeIndex = -1;
      this.gotoPage(item);
    },
    // 二级菜单点击
    handleClick1(index, item) {
      sessionStorage.setItem('selTwoIndex', index);
      if (index !== this.selTwoIndex) {
        this.isExpandTwo = true;
      } else {
        this.isExpandTwo = !this.isExpandTwo;
      }
      this.selTwoIndex = index;
      this.selThreeIndex = -1;
      this.gotoPage(item);
    },
    // 三级菜单点击
    handleClick2(index, item) {
      sessionStorage.setItem('selThreeIndex', index);
      this.selThreeIndex = index;
      this.gotoPage(item);
    },
    // 打开Tab页
    gotoPage(item) {
      if (item.children === undefined) {
        this.$router.push({
          path: item.location
        });
      }
    }
  }
};
</script>

<style lang="less">
.selectedItemBgc {
  background: #1891ff;
}
.ep-aside {
  min-height: 100vh;
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
  z-index: 10;
  position: fixed;
  background-color: #333;
  transition: width 0.1s;
  .ep-logo {
    position: relative;
    z-index: 2;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    text-align: left;
    img {
      float: left;
      vertical-align: middle;
      width: 25px;
      height: 25px;
      margin-top: 20px;
      margin-left: 25px;
    }
    h1 {
      float: left;
      vertical-align: middle;
      font-size: 20px;
      color: #fff;
      margin-left: 12px;
      font-weight: 600;
    }
  }
  .ep-menu {
    position: relative;
    z-index: 2;
    height: calc(100vh - 64px);
    .ep-scrollbar {
      height: calc(100vh);
    }
    .ep-title {
      width: 256px;
      text-align: left;
    }
    .ep-menu-body {
      .ep-submenu {
        margin: 0 10px;
      }
      .ep-menu-body {
        .ep-submenu {
          padding-left: 10px;
          margin: 0 15px;
        }
        .ep-menu-body .ep-submenu {
          padding-left: 20px;
        }
      }
    }
    .ep-submenu {
      position: relative;
      border-radius: 5px;

      .el-icon-menu{
        margin-right: 3px;
      }
      &__title {
        height: 46px;
        line-height: 46px;
        color: #fff;
        padding-left: 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
      }
      &__icon-arrow {
        right: 10px;
      }
    }
  }
}

.ep-sidebar-bg {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: block;
  position: absolute;
  // background: url(/static/img/sidebar.jpg) no-repeat center center / cover;
}
.ep-sidebar-bg:after {
  content: "";
  width: 100%;
  height: 100%;
  z-index: 3;
  display: block;
  opacity: .2;
  position: absolute;
  background: #000;
}
</style>
