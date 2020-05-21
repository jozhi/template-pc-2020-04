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
                <draggable class="dragArea list-group" :list="formFieldData" :group="{ name: 'people', pull: 'clone', put: false }" :clone="cloneDog">
                  <div v-for="element in formFieldData" :key="element.id" :class="['item', 'list-group-item', element.type]">{{ element.name }}</div>
                </draggable>
              </div>
              <div class="fp_tit">增强字段</div>
              <div class="fp_cont cf">
                <draggable
                  class="dragArea list-group"
                  :list="formFieldDataAugmented"
                  :group="{ name: 'people', pull: 'clone', put: false }"
                  :clone="cloneDogAugmented"
                >
                  <div v-for="element in formFieldDataAugmented" :key="element.id" :class="['item', 'list-group-item', element.type]">{{ element.name }}</div>
                </draggable>
              </div>
              <div class="fp_tit">其他字段</div>
              <div class="fp_cont cf">
                <draggable class="dragArea list-group" :list="formFieldDataOther" :group="{ name: 'people', pull: 'clone', put: false }" :clone="cloneDogOther">
                  <div v-for="element in formFieldDataOther" :key="element.id" :class="['item', 'list-group-item', element.type]"> {{ element.name }}</div>
                </draggable>
              </div>
            </div>


            <!-- 表单设计 - 字段属性 & 表单配置 -->
            <div class="configPart">
              <el-tabs v-model="formConfigType" @tab-click="formConfigSwitch">
                <el-tab-pane label="字段" name="cpField">
                  <FieldSettings :data="selectedField" @updateField="updateFieldFn"></FieldSettings>
                </el-tab-pane>
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
                <div
                  :class="['list-group-item',element.globalIndex === selectedField.globalIndex && 'selected', element.type]"
                  v-for="element in formItemData"
                  :key="element.globalIndex"
                  :data-type="JSON.stringify(element)"
                  @click="workbenchItemClick"
                >
                  <span class="close" @click="deleteItem(element)">✕</span>
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
  height: calc(100vh - 255px);
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
    width: 210px;
    padding-left: 10px;
    height: 100%;
    .el-tabs {
      height: 100%;
      .el-tabs__nav {
        margin-left: 30px;
      }
      .el-tabs__content {
        height: calc(100% - 50px);
        .el-tab-pane {
          height: 100%;
        }
      }
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
      overflow-y: auto;
      .list-group-item {
        margin: 2px;
        display: inline-block;
        box-sizing: border-box;
        width: calc(50% - 4px);

        line-height: 50px;
        font-size: 14px;
        border: 1px solid #efefef;
        background-color: #fefefe;
      }
      .selected {
        background-color: #cfe1f3;
      }
      .list-group-item.DividingLine {
        width: calc(100% - 4px);
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
</style>


<script>
import draggable from 'vuedraggable';
import FieldSettings from '@/components/FieldSettings.vue';

let globalIndex = 0;
export default {
  name: 'Login',
  components: {
    draggable,
    FieldSettings
  },
  data() {
    return {
      selectedField: {}, // 工作台当前选中的字段
      formItemData: [], // 工作台所有字段

      formFieldData: [
        { name: '单行文本', id: 1, type: 'SingleLineText' },
        { name: '多行文本', id: 2, type: 'MultilineText' },
        { name: '数字', id: 3, type: 'Digital' },
        { name: '日期', id: 4, type: 'Date' },
        { name: '单选按钮组', id: 5, type: 'RadioButton' },
        { name: '复选框组', id: 6, type: 'CheckboxGroup' },
        { name: '下拉框', id: 7, type: 'Drop-downBox' },
        { name: '下拉复选框', id: 8, type: 'Drop-downCheckbox' },
        { name: '按钮', id: 9, type: 'Button' },
        { name: '地址', id: 10, type: 'Address' },
        { name: '定位', id: 11, type: 'Positioning' },
        { name: '图片', id: 12, type: 'Image' },
        { name: '附件', id: 13, type: 'Annex' },
        { name: '超链接', id: 14, type: 'Hyperlinks' }
      ],
      formFieldDataAugmented: [
        { name: '子表单', id: 301, type: 'Subform' },
        { name: '关联查询', id: 302, type: 'RelatedQuery' }
      ],
      formFieldDataOther: [{ name: '分割线', id: 401, type: 'DividingLine' }],

      conterTitleType: 1, // 切换 基础设置 & 数据管理
      activeName: 'formDesign', // 切换 表单设计 & 表单发布 & 数据权限
      formConfigType: 'cpField' // 切换字段设置   字段 & 表单 & 接口
    };
  },
  computed: {
    dragOptions() {
      return { animation: 200, group: 'description', disabled: false, ghostClass: 'ghost' };
    }
  },
  methods: {
    // 工作台点击元素
    workbenchItemClick: function(evt) {
      console.log('evt', JSON.parse(evt.target.dataset.type));
      const type = JSON.parse(evt.target.dataset.type);
      const self = this
      // 绑定数据源
      this.formItemData.forEach(function(item) {
        if (type.id === item.id) {
          // console.log(item, index);
          self.selectedField = item;
        }
      });


      // 注释冗余
      // // get请求
      // const params = {}
      // this.$api.get('/url',params).then(data => {
      //   console.log(data);
      // })
      // // post请求
      // this.$api.post('/url',params).then(data => {
      //   console.log(data);
      // })

    },
    // 基本字段
    cloneDog(copy) {
      console.log('cloneDog', copy);
      return {
        globalIndex: globalIndex++,
        id: copy.id,
        name: copy.name,
        type: copy.type
      };
    },
    // 增强字段
    cloneDogAugmented(copy) {
      console.log('cloneDogAugmented', copy);
      return {
        globalIndex: globalIndex++,
        id: copy.id,
        name: copy.name,
        type: copy.type
      };
    },
    // 其他字段
    cloneDogOther(copy) {
      console.log('cloneDogOther', copy);
      return {
        globalIndex: globalIndex++,
        id: copy.id,
        name: copy.name,
        type: copy.type
      };
    },
    // 工作台字段
    logWorkbench: function(evt) {
      console.log('logWorkbench', JSON.stringify(evt));
    },
    cloneDogWorkbench(copy) {
      console.log('cloneDogWorkbench', JSON.stringify(copy));
      return {
        id: copy.id,
        name: copy.name,
        type: copy.type
      };
    },

    updateFieldFn(obj) {
      console.log('updateFieldFn', obj);
    },

    // 打印
    toConsole() {
      console.log('this.formItemData:', this.formItemData);
    },

    // 切换 基础设置 & 数据管理
    changeConterTitleType(type) {
      this.conterTitleType = type;
      console.log(type);
    },
    // 切换 表单设计 & 表单发布 & 数据权限
    formConfigSwitch(component) {
      console.log(component);
      // this.formConfigType = type
    },

    // 切换字段设置  字段 & 表单 & 接口
    handleClick(component) {
      console.log(component);
    },

    // 工作台删除item
    deleteItem(eleItem) {
      // console.log('ele:', eleItem);
      const self = this;
      this.formItemData.forEach(function(item, index) {
        // console.log(item, index);
        if (eleItem === item) {
          self.formItemData.splice(index, 1);
          // console.log('bingo');
        }
      });
    }
  }
};
</script>
