// package文件中获取版本号
process.env.VUE_APP_Version = require('./package.json').version

const NowDate = new Date();
const NowTime = `${NowDate.getFullYear()}-${NowDate.getMonth() + 1}-${NowDate.getDate()}__${NowDate.getHours()}:${NowDate.getMinutes()}:${NowDate.getSeconds()}`

const path = require('path')
function resolve (dir) {
  return path.join(__dirname, './', dir)
}
module.exports = {
  runtimeCompiler: true,  // 是否使用包含运行时编译器的 Vue 构建版本。
  publicPath: '/', // 设置打包文件相对路径
  devServer: {
    // open: process.platform === 'darwin',
    // host: 'localhost',
    port: 8087,
    // open: true, //配置自动启动浏览器
    proxy: {
      '/proxyApi': {
        target: '//10.85.94.231:8080', // 对应自己的接口
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/proxyApi': ''
        }
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg') // 找到svg-loader
    svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
    svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
    svgRule // 添加svg新的loader处理
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })

    // 修改images loader 添加svg处理
    const imagesRule = config.module.rule('images')
    imagesRule.exclude.add(resolve('src/svg-icons'))
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
  },


  // webpack 打包时添加当前版本+时间后缀
  configureWebpack: {
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.版本号.时间戳】
      filename: `[name].${process.env.VUE_APP_Version}.${NowTime}.js`,
      chunkFilename: `[name].${process.env.VUE_APP_Version}.${NowTime}.js`
    },
  },
}