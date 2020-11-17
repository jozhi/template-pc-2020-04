<template>
  <div class="headerFastPhoto">
    <el-header class="ep-header">
      <i class="ep-icon ep-icon-sidebar" v-show="!isSidebar" @click="shrink">
        <svg-icon class="svgIcon" icon-class="sidebarLeft" ></svg-icon>
      </i>
      <i class="ep-icon ep-icon-sidebar" v-show="isSidebar" @click="shrink">
        <svg-icon class="svgIcon" icon-class="sidebarRight" ></svg-icon>
      </i>
      <div class="ep-header-right">
        <el-dropdown @command="handleCommand">
          <span class="ep-header-right-account">
            <span>admin</span>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="rePw">修改密码</el-dropdown-item>
            <el-dropdown-item command="exit" divided>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
  </div>
</template>

<script type="es6">
export default {
  data() {
    return {};
  },
  computed: {
    isSidebar() {
      return this.$store.getters.isSidebar;
    }
  },
  watch: {
    isSidebar: {
      handler(value) {
        return value;
      },
      deep: true
    }
  },
  methods: {
    /**
     * 收缩左侧菜单
     */
    shrink() {
      this.$store.dispatch('SET_SIDEBAR', !this.isSidebar);
    },
    handleCommand(command) {
      // console.log(command);
      if (command === 'rePw') {
        this.$api.get('/login', { cmd: 'logout' }).then(res => {
          if (res.success) {
            // this.$router.push('/');
            // this.$message.success(res.resultDes);
          } else {
            // this.$message.error(res.resultDes);
          }
        });
      }else if(command === 'exit'){
        console.log('exit');
      }
    }
  }
};
</script>

<style lang="less">
.headerFastPhoto {
  .svgIcon{
    width: 22px;
    height: 22px;
  }
  .ep-header {
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .ep-icon-sidebar {
      font-size: 20px;
      cursor: pointer;
      transition: all 0.3s, padding 0s;
      float: left;
    }
    &-right {
      display: flex;
      align-items: center;
      float: right;
      span {
        cursor: pointer;
        height: 60px;
        display: flex;
        align-items: center;
        margin: 0 12px;
        transition: all 0.3s;
      }
      .ep-icon-help {
        margin-top: 5px;
      }
      &-account {
        display: inline-block;
        transition: all 0.3s;
        img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>
