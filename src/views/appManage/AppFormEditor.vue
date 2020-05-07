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
        <el-button size="small" @click="toConsole">打印</el-button>
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
                <draggable
                  class="dragArea list-group"
                  :list="formFieldData"
                  :group="{ name: 'people', pull: 'clone', put: false }"
                  :clone="cloneDog"
                  @change="log"
                >
                  <a href="javascript:;" v-for="element in formFieldData" :key="element.id" class="item list-group-item">{{ element.name }}</a>
                </draggable>
              </div>
              <div class="fp_tit">增强字段</div>
              <div class="fp_cont cf">
                <draggable
                  class="dragArea list-group"
                  :list="formFieldDataAugmented"
                  :group="{ name: 'people', pull: 'clone', put: false }"
                  :clone="cloneDogAugmented"
                  @change="log"
                >
                  <a href="javascript:;" v-for="element in formFieldDataAugmented" :key="element.id" class="item list-group-item">{{ element.name }}</a>
                </draggable>
              </div>
              <div class="fp_tit">其他字段</div>
              <div class="fp_cont cf">
                <draggable
                  class="dragArea list-group"
                  :list="formFieldDataOther"
                  :group="{ name: 'people', pull: 'clone', put: false }"
                  :clone="cloneDogOther"
                  @change="logOther"
                >
                  <a href="javascript:;" v-for="element in formFieldDataOther" :key="element.id" class="item list-group-item">{{ element.name }}</a>
                </draggable>
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
              <draggable
                class="workbench list-group"
                v-bind="dragOptions"
                :list="formItemData"
                :clone="cloneDogWorkbench"
                group="people"
                @change="logWorkbench"
              >
                <div class="list-group-item" v-for="element in formItemData" :key="element.id">
                  <span class="close" @click="listGroupItemClone(element)">✕</span>
                  <strong class="title">{{ element.name }}</strong>
                </div>
              </draggable>
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
.titlePart .conterTitle {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  a {
    margin-right: -1px;
    padding: 8px 20px;
    line-height: 1;
    border: 1px solid #e2e2e2;
    background-color: #f5f5f5;
    color: #666;
  }
  a.active,
  a:hover {
    position: relative;
    background-color: #03a7f0;
    color: #fff;
  }
}

.content {
  position: relative;
  .tool_btn {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
  }
  .el-tabs__header {
    margin-bottom: 10px;
  }
}
.formDesignWarp {
  height: calc(100vh - 280px);
  .fieldPart {
    float: left;
    width: 220px;
    height: 100%;
    overflow-y: auto;
    .fp_tit {
      font-size: 16px;
      padding-bottom: 5px;
    }
    .fp_cont {
      margin-bottom: 10px;
      text-align: center;
      .item {
        float: left;
        margin-right: 5%;
        margin-bottom: 5px;
        width: 45%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 14px;
        color: #333;
        background-color: #f2f2f2;
        &:nth-child(even) {
          margin-right: 0;
        }
      }
    }
  }
  .configPart {
    float: right;
    width: 200px;
    padding: 0 10px;
    height: 100%;
    .el-tabs__nav {
      margin-left: 30px;
    }
  }
  .formEditing {
    margin: 0 220px;
    box-sizing: border-box;
    border: 1px solid #ddd;
    height: 100%;
    background-color: #f1f2f5;
    .list-group {
      height: 100%;
      font-size: 0;
      .list-group-item {
        margin: 2px;
        display: inline-block;
        box-sizing: border-box;
        // display: grid;
        // width: 50%;
        width: calc(50% - 4px);

        line-height: 50px;
        font-size: 14px;
        border: 1px solid #efefef;
        background-color: #fefefe;
      }
    }
  }
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.workbench {
  .list-group-item {
    position: relative;
    .close {
      float: right;
      width: 50px;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #e0f0fd;
      }
    }
    .title {
      padding-left: 10px;
      display: inline-block;
    }
  }
}
.fieldPart {
}
.configPart {
}
.formEditing {
}
</style>


<script>
import draggable from 'vuedraggable';
let idGlobal = 8;
// @ is an alias to /src
export default {
  name: 'Login',
  components: {
    draggable
    // nestedDraggable
  },
  data() {
    return {
      formField:null,
      formFieldData: [
        { name: '单行文本', id: 1, type: 'base'},
        { name: '多行文本', id: 2, type: 'base'},
        { name: '数字', id: 3, type: 'base'},
        { name: '日期', id: 4, type: 'base'},
        { name: '单选按钮组', id: 5, type: 'base'},
        { name: '复选框组', id: 6, type: 'base'},
        { name: '下拉框', id: 7, type: 'base'},
        { name: '下拉复选框', id: 8, type: 'base'},
        { name: '按钮', id: 9, type: 'base'},
        { name: '地址', id: 10, type: 'base'},
        { name: '定位', id: 11, type: 'base'},
        { name: '图片', id: 12, type: 'base'},
        { name: '附件', id: 13, type: 'base'},
        { name: '超链接', id: 14, type: 'base'}
      ],
      formFieldDataAugmented: [
        { name: '子表单', id: 301, type: 'Augmented' },
        { name: '关联查询', id: 302, type: 'Augmented' }
      ],
      formFieldDataOther: [
        { name: '标签Tab', id: 401, type: 'Other' },
      ],
      formItemData: [
        { name: '单行文本', id: 1, type: 'base'},
        { name: '多行文本', id: 2, type: 'base'},
        { name: '数字', id: 3, type: 'base'},
      ],
      conterTitleType: 1,
      activeName: 'formDesign',
      formConfigType: 'cpField'
    };
  },
  computed: {
    dragOptions() {
      return {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost'
      };
    }
  },
  methods: {
    // 基本字段
    log: function(evt) {
      console.log('log', evt);
    },
    cloneDog(copy) {
      console.log('cloneDog', copy);
      return {
        id: copy.id,
        name: copy.name,
        type: copy.type,
      };
    },
    // 增强字段
    logAugmented: function(evt) {
      console.log('logAugmented', evt);
    },
    cloneDogAugmented(copy) {
      console.log('cloneDogAugmented', copy);
      return {
        id: copy.id,
        name: copy.name,
        type: copy.type,
      };
    },
    // 其他字段
    cloneDogOther(copy) {
      console.log('cloneDogOther', copy);
      return {
        id: idGlobal++,
        name: copy.name
      };
    },
    logOther: function(evt) {
      console.log('logOther', evt);
    },
    // 工作台字段
    logWorkbench: function(evt) {
      console.log('logWorkbench', evt);
    },
    cloneDogWorkbench(copy) {
      console.log('cloneDogWorkbench', copy);
      return {
        id: idGlobal++,
        name: copy.name
      };
    },

    // 打印
    toConsole() {
      console.log('this.formItemData:', this.formItemData);
    },

    changeConterTitleType(type) {
      this.conterTitleType = type;
      console.log(type);
    },
    formConfigSwitch(component) {
      console.log(component);
      // this.formConfigType = type
    },
    handleClick(component) {
      console.log(component);
    },

    // 工作台删除item
    listGroupItemClone(eleItem) {
      console.log('ele:', eleItem);
      const self = this;
      this.formItemData.forEach(function(item, index) {
        console.log(item, index);
        if (eleItem === item) {
          self.formItemData.splice(index, 1);
          console.log('bingo');
        }
      });
    }
  }
};
</script>
