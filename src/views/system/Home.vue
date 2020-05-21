<template>
  <el-container>
    <keep-alive>
      <Sidebar></Sidebar>
    </keep-alive>
    <el-container class="is-vertical" :style="isSidebar ? 'margin-left: 256px;' : 'margin-left: 80px;'">
      <Header></Header>
      <div class="content">
        <div class="innerPage">
          <router-view />
        </div>
      </div>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.is-vertical {
  height: 100vh;
  overflow-y: auto;
  background-color: #f1f2f5;
}
.content{
  padding: 30px 20px 20px;
  text-align: left;
}
.innerPage{
  padding: 30px 20px 20px;
  border-radius: 3px;
  background-color: #fff;

  min-height: calc(100vh - 160px);
}
</style>

<script>
import Header from '@/components/Header.vue';
import Sidebar from '@/components/Sidebar.vue';

export default {
  name: 'Home',
  components: {
    Header,
    Sidebar
  },
  computed: {
    isSidebar() {
      return this.$store.getters.isSidebar;
    }
  }
};
</script>
