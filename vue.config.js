const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const ProjectUrl = {
  "pf-gateway": process.env.VUE_APP_BASE_URL,
  "pf-system": process.env.VUE_APP_SYSTEM_URL,
  "pf-auth": process.env.VUE_APP_AUTH_URL
};
const port = 4200; // dev port
const getProxyApi = () => {
  const api = {};
  for (const key in ProjectUrl) {
    console.log(key);
    api[`/${key}-api`] = {
      target: ProjectUrl[key], //代理地址
      changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
      //ws: true, // proxy websockets
      //pathRewrite方法重写url
      pathRewrite: {
        [`^/${key}-api`]: "/"
      }
    };
  }
  return api;
};
module.exports = {
  publicPath: "/dcms",
  parallel: false,
  devServer: {
    port: port,
    // headers: {
    //   "Access-Control-Allow-Origin": "*"
    // },
    proxy: getProxyApi()
  },
  productionSourceMap: process.env.NODE_ENV !== "production",
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/css/index.scss";`
      }
    }
  },
  // 自定义webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
    plugins: [
      new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8
      })
    ]
  },
  transpileDependencies: [],
  chainWebpack: config => {
    config.module
      .rule("compile")
      .test(/\.js$/)
      .include.add(resolve("src"))
      // .add(resolve("node_modules/element-ui"))
      .end()
      .use("babel")
      .loader("babel-loader");
  }
};
