module.exports = {
  devServer: {
    open: true,
    // proxy: {
    //   '/api': {
    //     //代理api
    //     target: 'http://192.168.1.34:9996', // 代理接口(注意只要域名就够了)
    //     changeOrigin: true, //是否跨域
    //     pathRewrite: {
    //       //重写路径
    //       '^/api': '' //代理路径
    //     }
    //   }
    // }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 37.5, // 换算的基数
            propList: ['*'],
          }),
          require('autoprefixer')({
            browsers: ['Android >= 4.0', 'iOS >= 8']
          }),
        ]
      }
    }
  },
  runtimeCompiler: true,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static'
}