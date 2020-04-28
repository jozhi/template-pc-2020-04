<template>
  <div class="titlePart">
    <span class="searchBox">
      <el-autocomplete popper-class="my-autocomplete" v-model="state" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect">
        <i class="el-icon-edit el-input__icon" slot="suffix" @click="handleIconClick"></i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="addr">{{ item.address }}</span>
        </template>
      </el-autocomplete>
    </span>

    <strong class="h1">应用管理</strong>
  </div>
</template>

<style lang="less" scope>
.my-autocomplete {
  li {
    line-height: normal;
    padding: 7px;

    .name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .addr {
      font-size: 12px;
      color: #b4b4b4;
    }

    .highlighted .addr {
      color: #ddd;
    }
  }
}
</style>


<script>
// @ is an alias to /src
export default {
  name: 'Login',
  data() {
    return {};
  },
  methods: {
    method() {}
  }
};
</script>
