process.env.VUE_APP_Version = require('./package.json').version
const NowDate = new Date();
const NowTime = `${NowDate.getFullYear()}-${NowDate.getMonth() + 1}-${NowDate.getDate()}__${NowDate.getHours()}:${NowDate.getMinutes()}:${NowDate.getSeconds()}`

module.exports = {
  configureWebpack: { // webpack 配置
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${process.env.VUE_APP_Version}.${NowTime}.js`,
      chunkFilename: `[name].${process.env.VUE_APP_Version}.${NowTime}.js`
    },
  },
}