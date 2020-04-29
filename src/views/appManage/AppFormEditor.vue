<template>
  <div class="AppFormEditor">
    <div class="titlePart cf">
      <div class="conterTitle">
        <a href="javascript:;" data-type="1">基础设置</a>
        <a href="javascript:;" data-type="2">数据管理</a>
      </div>
      <strong class="h1">应用管理</strong>
    </div>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="formDesign">表单设计</el-tab-pane>
        <el-tab-pane label="配置管理" name="processDesign">流程设计</el-tab-pane>
        <el-tab-pane label="角色管理" name="formPublishing">表单发布</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style lang="less" scope>
  .titlePart .conterTitle{
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      a{
        margin-right: -1px;
        padding: 8px 20px;
        line-height: 1;
        border: 1px solid #e2e2e2;
        background-color: #f5f5f5;
        color: #666;
      }
      a.active,a:hover{
        position: relative;
        background-color: #03a7f0;
        color: #fff;
      }
    }
</style>


<script>
// @ is an alias to /src
export default {
  name: 'Login',
  data(){
    return {
      activeName:'formDesign'
    }
  },
  methods:{
    handleClick(type){
      console.log(type);
    }
  }
};
</script>
