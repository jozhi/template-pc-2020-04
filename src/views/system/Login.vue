<template>
  <div class="loginPage">
    <div class="form-content">
      <h1>自定义表单系统</h1>
      <el-form label-width="0" ref="ruleForm" :model="ruleForm" :rules="rules" class="ruleForm">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" auto-complete="off" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="ruleForm.password" type="password" auto-complete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-row class="more-somthing">
          <el-col :span="12">
            <el-checkbox v-model="checked">自动登录</el-checkbox>
          </el-col>
          <el-col :span="12" class="ey-login-for">
            <span>忘记密码</span>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style lang="less" >
.loginPage{
  width: 100%;
  height: 100%;
  position: relative;
  background: url(/assets/login-bg.jpg) 100% 100%;
}
.ey-login-page {
  width: 100%;
  height: 100%;
  position: relative;
  background: url(/static/img/loginBack.jpg) 100% 100%;
  .ey-login-box {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 800px;
    height: 450px;
    background-color: #ffffff;
    box-shadow: 5px 9px 10px 0px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    .ey-login-content {
      width: 90%;
      margin-left: 5%;
      margin-top: 74px;
      .ey-img {
        width: 350px;
        height: 310px;
        background: url(/static/img/loginLeft.png) 100% 100%;
      }
      .ey-top-title {
        text-align: center;
        span {
          font-family: "MicrosoftYaHei";
          font-weight: bold;
          font-size: 20px;
          color: #333333;
        }
      }

      .ruleForm {
        width: 90%;
        margin-left: 10%;
        margin-top: 40px;
        .ey-login-row {
          border-bottom: 1px solid #cccccc;
          /deep/ .el-form-item__error {
            background: none;
            // padding: 0;
            display: block;
          }
          .ey-login-icon {
            // padding-top: 10px;
            position: relative;
            top: 22px;
            // text-align: right;
          }
          .el-form-item {
            margin: 15px 0 0 0;
            .el-form-item__content {
              .el-input {
                .el-input__inner {
                  border: 0;
                  padding: 0 8px;
                }
              }
            }
          }
        }
        .ey-login-rem {
          margin: 14px 0;
          .el-checkbox__inner:hover {
            border-color: #f95075;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #f95075;
          }
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            background-color: #f95075;
            border-color: #f95075;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #aaaaaa;
          }
          .ey-login-for {
            text-align: right;
          }
        }
        .ey-login-button {
          margin-top: 40px;
          .el-button {
            width: 100%;
            height: 36px;
            background-color: #19489a;
            border-radius: 18px;
          }
        }
      }
    }
  }
}
</style>


<script>
// @ is an alias to /src
export default {
  name: 'Login',
  data(){
    return {
      ruleForm:{
        name:'',
        password:'',
      },
      checked:false,
      rules: {
        name: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
      }
    }
  },
  methods:{
    submitForm(){
      console.log('to submit');

      this.$router.push({
        path: '/Home'
      })
    }
  }
};
</script>
