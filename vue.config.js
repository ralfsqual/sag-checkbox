module.exports = {

  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views'
      }
    }
  },

  devServer: {
    port: 8085, // 端口号
    host: 'localhost',

  }
}
