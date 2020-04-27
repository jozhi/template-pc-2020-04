<template>
  <div class="sidebarFastPhoto">
    <div class="ep-aside" :style="isSidebar ? 'width: 256px;' : 'width: 80px;'">
      <div class="ep-logo">
        <h1>模板系统</h1>
      </div>
      <div class="ep-menu">
        <el-scrollbar v-if="isSidebar" style="height: calc(100vh - 64px);">
          <!-- S 一级菜单 -->
          <ul class="ep-menu-body" :style="isSidebar ? 'width: 256px;' : 'width: 80px;'">
            <template v-for="(item, index) in menus">
              <el-tooltip class="item" effect="dark" :content="item.title" placement="right" v-if="!isSidebar && !item.children" :key="index">
                <li class="ep-submenu" @click="handleClick(index, item)" :style="isSidebar && selIndex === index ? 'background: #1891ff;' : ''">
                  <div class="ep-submenu__title">
                    <i class="el-icon-menu" :style="isSidebar ? '' : 'margin-left: 8px;'"></i>
                    <span class="ep-title" v-show="isSidebar" :title="item.title">{{ item.title }}</span>
                    <i
                      class="el-submenu__icon-arrow"
                      v-show="isSidebar && item.children"
                      :class="selIndex === index ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                    ></i>
                  </div>
                </li>
              </el-tooltip>
              <li
                class="ep-submenu"
                :key="index"
                @click="handleClick(index, item)"
                :style="isSidebar && selIndex === index && selTwoIndex === -1 ? 'background: #1891ff; margin:0 10px; border-radius: 5px;' : ' margin:0 10px;'"
                v-else
              >
                <div class="ep-submenu__title">
                  <i class="el-icon-menu" :style="isSidebar ? '' : 'margin-left: 8px;'"></i>
                  <span class="ep-title" v-show="isSidebar" :title="item.title" style="width: 80%;">{{ item.title }}</span>
                  <i
                    class="el-submenu__icon-arrow"
                    v-show="isSidebar && item.children"
                    :class="isExpand && selIndex === index ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                  ></i>
                </div>
                <!-- S 收缩后效果 -->
                <ul v-show="!isSidebar">
                  <li v-for="(two, i) in item.children" :key="index + '-' + i" @click="handleClick1(i, two)">
                    <span class="ep-title" :title="two.title">{{ two.title }}</span>
                    <i class="el-submenu__icon-arrow el-icon-arrow-right" v-show="two.children"></i>
                    <ul v-show="two.children">
                      <li v-for="(three, j) in two.children" :key="index + '-' + i + '-' + j" @click="handleClick2(j, three)">
                        <span :title="three.title">{{ three.title }}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
                <!-- E 收缩后效果 -->
              </li>
              <!-- S 二级菜单 -->
              <template v-if="isSidebar">
                <transition name="slide-fade" :key="index">
                  <ul v-show="isExpand && selIndex === index">
                    <template v-for="(two, i) in item.children">
                      <li
                        class="ep-submenu"
                        style="padding-left: 10px; margin: 0 15px; border-radius: 5px;"
                        @click="handleClick1(i, two)"
                        :style="selTwoIndex === i && selThreeIndex === -1 ? 'background: #1891ff;' : ''"
                        :key="i"
                      >
                        <div class="ep-submenu__title">
                          <!--<i :class="two.icon"></i>-->
                          <span class="ep-title" :title="two.title">{{ two.title }}</span>
                          <i
                            class="el-submenu__icon-arrow"
                            v-show="two.children && two.children.length > 0"
                            :class="isExpand && selTwoIndex === i ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                          ></i>
                        </div>
                      </li>
                      <!-- S 三级菜单 -->
                      <transition name="slide-fade" :key="i">
                        <ul v-show="isExpandTwo && selTwoIndex === i">
                          <template v-for="(three, j) in two.children">
                            <li
                              class="ep-submenu"
                              style="padding-left: 20px; margin: 0 15px; border-radius: 5px;"
                              @click="handleClick2(j, three)"
                              :style="three.location === routePath ? 'background: #1891ff;' : ''"
                              :key="j"
                            >
                              <div class="ep-submenu__title">
                                <!--<i :class="three.icon"></i>-->
                                <span class="ep-title" :title="three.title">{{ three.title }}</span>
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
                      <!-- E 三级菜单 -->
                    </template>
                  </ul>
                </transition>
                <!--</el-scrollbar>-->
              </template>
              <!-- E 二级菜单 -->
            </template>
          </ul>
          <div v-if="meunquery" style="text-align:center;">{{meunquery}}</div>
        </el-scrollbar>
      </div>
      <div class="ep-sidebar-bg" :style="isSidebar ? 'width: 256px;' : 'width: 80px;'"></div>
    </div>
  </div>
</template>

<script type="es6">
import qs from 'qs'
import onlineLeftMenu from '../mock/onlineLeftMenu'

export default {
  props: ['index'],
  data() {
    return {
      meunquery: this.$route.query.menuquery || false,
      isCollapse: true,
      menus: onlineLeftMenu,
      list: [],
      menuCur: [],
      selIndex: -1,
      selTwoIndex: -1,
      selThreeIndex: -1,
      isExpand: false,
      isExpandTwo: false
    }
  },
  computed: {
    isSidebar() {
      return this.$store.getters.isSidebar
    },
    menu() {
      return this.$store.getters.menu
    },
    routePath() {
      // console.log(this.$route.path)
      return this.$route.path
    }
    // meunquery() {
    //   return this.$route.query.menuquery
    // }
  },
  watch: {
    isSidebar: {
      handler(value) {
        return value
      },
      deep: true
    },
    menu: {
      handler(value) {
        return value
      },
      deep: true
    },
    routePath(value) {
      if (value === '/Home') {
        this.isExpand = false
        this.isExpandTwo = false
      }
      return value
    }
  },
  mounted() {
    this.list = sessionStorage.getItem('menuList') ? qs.parse(sessionStorage.getItem('menuList')) : []
  },
  created() {
    if (sessionStorage.getItem('selIndex')) {
      this.isExpand = true
      this.isExpandTwo = true
      this.selIndex = Number(sessionStorage.getItem('selIndex'))
      this.selTwoIndex = Number(sessionStorage.getItem('selTwoIndex'))
      this.selThreeIndex = Number(sessionStorage.getItem('selThreeIndex'))
    }
  },
  methods: {
    // 一级菜单点击
    handleClick(index, item) {
      // console.log(index);
      sessionStorage.setItem('selIndex', index)
      if (index !== this.selIndex) {
        this.isExpand = true
      } else {
        this.isExpand = !this.isExpand
      }
      this.selIndex = index
      this.selTwoIndex = -1
      this.selThreeIndex = -1
      if (item.children === undefined) {
        this.gotoPage(item)
      }
    },
    // 二级菜单点击
    handleClick1(index, item) {
      // console.log(index);
      sessionStorage.setItem('selTwoIndex', index)
      if (index !== this.selTwoIndex) {
        this.isExpandTwo = true
      } else {
        this.isExpandTwo = !this.isExpandTwo
      }
      this.selTwoIndex = index
      this.selThreeIndex = -1
      if (item.children === undefined) {
        this.gotoPage(item)
      }
    },
    // 三级菜单点击
    handleClick2(index, item) {
      sessionStorage.setItem('selThreeIndex', index)
      this.selThreeIndex = index
      if (item.children === undefined) {
        this.gotoPage(item)
      }
    },
    // 打开Tab页
    gotoPage(item) {
      this.list = []
      this.$router.push({
        path: item.location
      })
      this.list.push({
        title: item.title,
        path: item.location
      })
      this.menuCur = item
      sessionStorage.setItem('menuList', qs.stringify(this.list))
      this.$store.dispatch('SET_MENU', this.unique(this.list))
      this.$store.dispatch('SET_CLOSE', false)
    },
    // 去重
    unique(newList) {
      let list = []
      for (let i in this.menu) {
        list.push(this.menu[i])
      }
      if (newList) {
        if (!list) {
          return newList
        } else {
          let temp = []
          newList.forEach(item => {
            let flag = false
            list.forEach(menu => {
              if (menu.path && item.path && menu.path === item.path) {
                flag = true
              }
            })
            if (!flag) {
              temp.push(item)
            }
          })
          return list.concat(temp)
        }
      } else {
        return []
      }
    }
  }
}
</script>

<style lang="less">
.sidebarFastPhoto {
  .ep-aside {
    min-height: 100vh;
    box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
    z-index: 10;
    position: fixed;
    .ep-logo {
      height: 64px;
      position: relative;
      line-height: 64px;
      transition: all 0.3s;
      overflow: hidden;
      z-index: 9;
      img {
        display: inline-block;
        vertical-align: middle;
        width: 43px;
        height: 32px;
        margin-top: 16px;
        margin-left: 17px;
        float: left;
      }
      h1 {
        float: left;
        color: #fff;
        display: inline-block;
        vertical-align: middle;
        font-size: 20px;
        margin: 0 0 0 12px;
        font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
        font-weight: 600;
      }
    }
    .ep-menu {
      z-index: 9;
      position: relative;
      height: calc(100vh - 64px);

      .scrollbar /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      .ep-title {
        // width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-body {
        width: 256px;
        display: inline-block;
        text-align: left;
        padding: 0;
        .el-tooltip {
          display: flex;
          justify-content: center;
        }
        .ep-submenu {
          position: relative;
          &__title {
            height: 46px;
            line-height: 46px;
            font-size: 14px;
            color: #fff;
            padding: 0 10px;
            list-style: none;
            cursor: pointer;
            position: relative;
            transition: all 0.3s;
            box-sizing: border-box;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: flex;
            align-items: center;
            &__icon-arrow {
              position: absolute;
              top: 50%;
              right: 20px;
              margin-top: -7px;
              transition: all 0.3s;
              font-size: 12px;
            }
          }
          ul {
            position: absolute;
            left: -999em;
            width: 200px;
            font-weight: normal;
            margin: 10px 0 0 0;
            padding: 0;
            background: #fff;
            box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
            li {
              width: 200px;
              height: 40px;
              line-height: 40px;
              padding: 0 20px;
              font-size: 14px;
              cursor: pointer;
              box-sizing: border-box;
              transition: border-color 0.3s, background-color 0.3s, color 0.3s;
              position: relative;
              ul {
                margin: 0 0 0 120px;
                li {
                  color: #606266;
                  width: 200px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
              }
            }
          }
        }
        .ep-submenu [class^='el-icon-'],
        [class^='ep-icon-'] {
          vertical-align: middle;
          margin-right: 5px;
          width: 24px;
          text-align: center;
          font-size: 18px;
        }
        .ep-submenu:hover {
          left: auto;
        }
        .ep-submenu:hover ul ul {
          left: -999em;
        }
        .ep-submenu:hover ul,
        .ep-submenu li:hover ul {
          left: 80px;
          top: 0;
        }
        .ep-submenu ul li:hover {
          background: #1891ff;
          color: #fff;
        }
        ul {
          padding: 0;
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
      width: 100%;
      height: 100%;
      z-index: 3;
      content: '';
      display: block;
      opacity: 0.8;
      position: absolute;
      background: #000;
    }
  }
}
</style>
