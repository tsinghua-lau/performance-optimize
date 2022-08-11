const config = {
    mcHd: {
      pages: {
        index: {
          entry: "src/projects/aproject/main.js",
          template: "public/index.html",
          filename: "index.html"
        }
      },
      devServer: {
        port: 8080, // 端口号
        host: "0.0.0.0",
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        disableHostCheck: true,
        // 设置代理
        proxy: {
          "/": {
            target: "",
            changeOrigin: true,
            ws: false
          }
        }
      }
    },
    projectB: {
      pages: {
        index: {
          entry: "src/projects/bproject/main.js",
          template: "public/index.html",
          filename: "index.html"
        }
      },
      devServer: {
        port: 8080, // 端口号
        host: '0.0.0.0',
        https: false, // https:{type:Boolean}
        open: false, //配置自动启动浏览器
        disableHostCheck: true,
        // 设置代理
        proxy: {
          "/": {
            target: "",
            changeOrigin: true,
            ws: false
          }
        }
      }
    },
  };
  module.exports = config;
  
  