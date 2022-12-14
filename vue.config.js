const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// require('vue-cli-plugin-style-resources-loader')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    // open: true, // 是否自动打开浏览器页面
    // host: 'localhost',    // 指定使用一个 host，默认是 localhost
    // port: 8080,         // 端口地址
    overlay: {
      warnings: false, //不显示警告
      errors: false	//不显示错误
    },
    proxy: {
      '^/baidu': {
        target: 'http://10.59.81.31:8088',
        changeOrigin: true,
        pathRewrite: {
          '^/baidu': ''
        }
      },
      '^/default': {
        target: 'http://10.59.81.31:8088',
        changeOrigin: true,
        pathRewrite: {
          '^/default': ''
        }
      },
    }
  },
  chainWebpack: (config)=>{
    config.resolve.alias
        .set('@$', resolve('src'))
  },
  lintOnSave:false, //关闭eslint检查
  publicPath: './', // 打包后引用的资源路径
  // outputDir: 'dist', // 打包目录
  configureWebpack: (config) => { // webpack自定义配置
    // 生产环境打包分析体积
    if (process.env.NODE_ENV === 'production' && process.env.npm_config_report) {
      return {
        plugins: [
          new BundleAnalyzerPlugin()
        ]
      }
    }
  },
  chainWebpack: config => { // CLI内部webpack配置
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('less').oneOf(type)))

    config.when(process.env.NODE_ENV === 'production', config => {
      {
        config.entry('app').clear().add('./src/main-prod.js')
        config.set('externals', {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          axios: 'axios',
          lodash: '_',
          moment: 'moment',
          nprogress: 'NProgress',
          'element-ui': 'ELEMENT'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
      }
    })
    // 开发环境设置
    config.when(process.env.NODE_ENV === 'development', config => {
      {
        config.entry('app').clear().add('./src/main-dev.js')
        config.plugin('html').tap(args =>{
          args[0].isProd = false
          return args
        })
      }
    })




  },

}

// 全局样式 变量、函数
function addStyleResource (rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        resolve('src/styles/variables.less'),
        resolve('src/styles/mixin.less'),
      ],
    })
}
