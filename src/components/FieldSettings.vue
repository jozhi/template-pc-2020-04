<template>
  <div class="FieldSettings">
    <div class="fs_tit">标题</div>
    <div class="fs_cont">
      <input type="text" name="title" id="title" @change="inputChange('title')" v-model="baseData.title" />
    </div>

    <div class="fs_tit">占位符</div>
    <div class="fs_cont">
      <textarea class="textarea" @change="inputChange('placeholder')" v-model="baseData.placeholder"></textarea>
    </div>

    <div class="fs_tit">校验规则</div>
    <div class="fs_cont">
      <ul class="ul">
        <li>
          <span class="q">是否必填：</span>
          <select name="requiredVerification" id="requiredVerification" @change="inputChange('requiredVerification')" v-model="baseData.requiredVerification">
            <option value='0' selected>否</option>
            <option value='1'>是</option>
          </select>
        </li>
        <li>
          <span class="q">其他校验：</span>
          <select name="verificationList" id="verificationList" @change="inputChange('verificationList')" v-model="baseData.verificationList">
            <option value='0' selected>自定义</option>
            <option value='1'>数据联动</option>
            <option value='2'>公式编辑</option>
          </select>
        </li>
      </ul>
    </div>

    <div class="fs_tit">数据源初始化</div>
    <div class="fs_cont">
      <select name="defaultValue" id="defaultValue" @change="inputChange('defaultValue')" v-model="baseData.defaultValue">
        <option value='0' selected>自定义</option>
        <option value='1'>数据联动</option>
        <option value='2'>公式编辑</option>
      </select>
    </div>

    <div class="fs_tit">布局</div>
    <div class="fs_cont">
      <select name="layout" id="layout" @change="inputChange('layout')" v-model="baseData.layout">
        <option value="0" selected>占整行</option>
        <option value="1">占整行1/2</option>
        <option value="2">占整行1/3</option>
      </select>
    </div>

    <div class="fs_tit">提交目标</div>
    <div class="fs_cont">
      <select name="submitGoal" id="submitGoal" @change="inputChange('submitGoal')" v-model="baseData.submitGoal">
        <option value="0">自动生成</option>
        <option value="1">绑定目标字段</option>
      </select>
    </div>

  </div>
</template>

<script type="es6">
export default {
  data() {
    return {
      baseData: {
        title:'',         // 标题
        placeholder:'',   // 占位符
        requiredVerification:'',    // 必填校验
        verificationList:'',    // 其他校验
        defaultValue:'',    // 数据源初始化
        layout:'',    // 布局
        submitGoal:'',    // submitGoal
      }
    };
  },
  props: ['data'],
  methods: {
    /**
     * 更改数据
     */
    inputChange(type) {
      console.log(type, this.baseData[type]);
    }
  }
};
</script>

<style lang="less">
.FieldSettings {
  height: 100%;
  overflow-y: auto;

  input,
  textarea,
  select {
    border: 1px solid #d2d2d2;
    width: 96%;
    padding: 2px;
    border-radius: 3px;
    font-size: 14px;
  }
  .fs_cont {
    margin-bottom: 5px;
    font-size: 0;
    .ul {
      padding-left: 10px;
      li{
        margin-bottom: 5px;
      }
      .q {
        float: left;
        font-size: 14px;
      }
      input,
      select {
        display: inline-block;
        width: 100px;
      }
    }
  }
}
</style>
