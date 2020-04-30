<template>
  <div class="AppFormEditor">
    <div class="titlePart cf">
      <div class="conterTitle">
        <a href="javascript:;" :class="[(conterTitleType===1) && 'active']" @click="changeConterTitleType(1)">基础设置</a>
        <a href="javascript:;" :class="[(conterTitleType===2) && 'active']" @click="changeConterTitleType(2)">数据管理</a>
      </div>
      <strong class="h1">应用管理</strong>
    </div>
    <div class="content">
      <div class="tool_btn">
        <el-button size="small">预览</el-button>
        <el-button size="small">保存</el-button>
        <el-button size="small" type="primary">下一步</el-button>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 表单设计 -->
        <el-tab-pane label="表单设计" name="formDesign">
          <div class="formDesignWarp">
            <!-- 表单设计 - 字段列表 -->
            <div class="fieldPart">
              <div class="fp_tit">基本字段</div>
              <div class="fp_cont cf">
                <a href="javascript:;" class="item">单行文本</a>
                <a href="javascript:;" class="item">多行文本</a>
                <a href="javascript:;" class="item">单行文本</a>
                <a href="javascript:;" class="item">多行文本</a>
                <a href="javascript:;" class="item">单行文本</a>
                <a href="javascript:;" class="item">多行文本</a>
              </div>
              <div class="fp_tit">增强字段</div>
              <div class="fp_cont cf">
                <a href="javascript:;" class="item">子表单</a>
                <a href="javascript:;" class="item">关联查询</a>
              </div>
            </div>
            <!-- 表单设计 - 字段属性 & 表单配置 -->
            <div class="configPart">
              <el-tabs v-model="formConfigType" @tab-click="formConfigSwitch">
                <el-tab-pane label="字段" name="cpField">字段</el-tab-pane>
                <el-tab-pane label="表单" name="cpForm">表单</el-tab-pane>
                <el-tab-pane label="接口" name="cpInterface">接口</el-tab-pane>
              </el-tabs>
            </div>
            <!-- 表单设计 - 工作台 -->
            <div class="formEditing">
              
            </div>
          </div>
          
        </el-tab-pane>
        <!-- End 表单设计 -->

        <!-- 流程设计 -->
        <el-tab-pane label="流程设计" name="processDesign">流程设计</el-tab-pane>
        <!-- End 流程设计 -->

        <!-- 表单发布 -->
        <el-tab-pane label="表单发布" name="formPublishing">表单发布</el-tab-pane>
        <!-- End 表单发布 -->
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

  .content{
    position: relative;
    .tool_btn{
      position: absolute;
      top: 0;
      right: 0;
      z-index: 1;
    }
    .el-tabs__header{
      margin-bottom: 10px;
    }
  }
  .formDesignWarp{
    height: calc(100vh - 280px);
    .fieldPart{
      float: left;
      width: 220px;
      height: 100%;
      .fp_tit{
        font-size: 16px;
        padding-bottom: 5px;
      }
      .fp_cont{
        margin-bottom: 10px;
        text-align: center;
        .item{
          float: left;
          margin-right: 5px;
          margin-bottom: 5px;
          width: 105px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          font-size: 14px;
          color: #333;
          background-color: #f2f2f2;
          &:nth-child(even){
            margin-right: 0;
          }
        }
      }
    }
    .configPart{
      float: right;
      width: 200px;
      padding: 0 10px;
      height: 100%;
      .el-tabs__nav{
        margin-left: 30px;
      }
    }
    .formEditing{
      margin: 0 220px;
      border: 1px solid #ddd;
      height: 100%;
    }
  }
  .fieldPart{}
  .configPart{}
  .formEditing{}


</style>


<script>
// @ is an alias to /src
export default {
  name: 'Login',
  data(){
    return {
      conterTitleType:1,
      activeName:'formDesign',
      formConfigType:'cpField'
    }
  },
  methods:{
    changeConterTitleType(type){
      this.conterTitleType = type
      console.log(type);
    },
    formConfigSwitch(component){
      console.log(component);
      // this.formConfigType = type
    },
    handleClick(component){
      console.log(component);
    }
  }
};
</script>
