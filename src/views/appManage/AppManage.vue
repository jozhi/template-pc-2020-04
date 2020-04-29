<template>
  <div class="AppManage">
    <div class="titlePart cf">
      <span class="searchBox">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
      </span>
      <strong class="h1">应用管理</strong>
    </div>
    <div class="contPart">
      <a class="creatApp" href="#"><i class="el-icon-plus"></i> 创建应用</a>
      <div class="itemPart" @click="itemPartClick">
        <div class="tool_box">
          <a href="javascript:;" @click.stop="itemEdit">编辑</a>
          <a href="javascript:;" @click.stop="itemCopy">复制</a>
          <a href="javascript:;" @click.stop="itemDel">删除</a>
        </div>
        <div class="h2"><i class="el-icon-menu"></i> 应用名称</div>
        <div class="info">
          <span class="name"><i class="el-icon-s-custom"></i> 省社保集中团队</span>

          <span class="edit_info"><i class="el-icon-time"></i> sunny 保存了应用 2020-03-25 12:09</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scope>
.AppManage{}
.titlePart {
  .searchBox{
    width: 300px;
    float: right;
  }
  .h1{
    float: left;
    font-weight: normal;
    font-size: 26px;
  }
}
.contPart{
  margin-bottom: 10px;
  .creatApp{
    display: inline-block;
    margin: 20px 0 5px;
    color: #02A7F0;
    font-size: 18px;
  }
  .itemPart{
    margin-bottom: 20px;
    padding: 15px 10px 15px 20px;
    border: 1px solid #ccc;
    cursor: pointer;

    .tool_box{
      float: right;
      a{
        display: inline-block;
        line-height: 60px;
        padding: 0 20px;
        color: #02A7F0;
        &:hover{
          background-color: #eff4fd;
        }
      }
    }
    .h2{
      // margin-bottom: 10px;
      font-size: 20px;
      color: #444;
    }
    .info{
        color: #aaa;
      .name{
        margin-right: 20px;
      }
      // .edit_info{}
    }
  }
}
</style>


<script>
// @ is an alias to /src
export default {
  name: 'Login',
  data() {
    return {
      input:''
    };
  },
  methods: {
    itemPartClick() {
      // this.$router()
      this.$router.push('/AppDetails')
    },
    itemEdit() {
      console.log(2);
    },
    itemCopy() {
      console.log(3);
    },
    itemDel() {
      console.log(4);
    },
    autocompleteBingo() {},
  }
};
</script>
