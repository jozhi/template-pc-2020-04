<template>
  <el-container>
    <keep-alive>
      <Sidebar></Sidebar>
    </keep-alive>
    <el-container class="is-vertical" :style="isSidebar ? 'margin-left: 256px;' : 'margin-left: 80px;'">
      <Header></Header>
      <router-view />
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
    .is-vertical {
        height: 100vh;
        overflow-y: auto;
    }
</style>

<script>
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Sidebar
  },
  computed: {
    isSidebar() {
      return this.$store.getters.isSidebar
    },
  },
}
</script>
