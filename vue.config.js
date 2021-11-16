const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = ["js", "css"];
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
const port = 4200; // dev port
module.exports = {
  publicPath: "/dcms",
  parallel: false,
  devServer: {
    port: port
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
      /*new CompressionWebpackPlugin({
        algorithm: "gzip",
        test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"),
        threshold: 10240,
        minRatio: 0.8
      })*/
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
