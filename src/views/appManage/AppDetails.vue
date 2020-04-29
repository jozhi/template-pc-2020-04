<template>
  <div class="AppDetails">
    <div class="formMenu">
      <div class="searchBox">
        <span class="add" @click="folderAdd"><i class="el-icon-folder-add"></i></span>
        <el-input v-model="input" size="small" placeholder="请输入内容"></el-input>
      </div>
      <div class="menu">
        <el-menu default-active="1-4-1" @open="handleOpen" @close="handleClose" @select="handleSelect" class="el-menu-vertical-demo">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-folder"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-s-order"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <div class="formWorkbench cf">
      <div class="item" @click="itemAdd('form')">
        <i class="el-icon-document-add"></i>
        新建表单
      </div>
      <div class="item">
        <i class="el-icon-document-add"></i>
        新建流程图
      </div>
      <div class="item">
        <i class="el-icon-document-add"></i>
        发布表单
      </div>
      <div class="item">
        <i class="el-icon-document-add"></i>
        发布应用
      </div>
    </div>
  </div>
</template>

<style lang="less" scope>
.AppDetails {
  position: relative;

  .formMenu {
    position: absolute;
    top: 0;
    left: 0;
    width: 280px;
    height: 100%;
    .searchBox{
      padding: 5px 0;

      .add{
        margin-right: 10px;
        float: right;
        font-size: 32px;
        line-height: 1.2;
        i{color: #1396db;}
      }
      .el-input{
        width: 210px;
      }
    }
  }
  .formWorkbench {
    padding-left: 280px;
    .item{
      float: left;
      padding: 60px 0;
      width: 50%;
      text-align: center;
      color: #7e7e7e;
      cursor: pointer;
      font-size: 22px;
      &:hover{
        background-color: #f6f6f6;
      }
      i{
        margin-bottom: 10px;
        font-size: 80px;
        display: block;
        color: #7e7e7e;
      }
    }
  }
}
</style>

<script>
export default {
  name: 'Login',
  data() {
    return {
      input:''
    };
  },
  methods: {
    folderAdd() {
      // console.log('11');
    },
    itemAdd(type){
      switch (type){
        case 'form':
        this.$router.push('/AppFormEditor')
      }
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  }
};
</script>
