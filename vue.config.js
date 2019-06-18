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

  css:{
    loaderOptions: {
      less: {
        javaEnabled: true
      }
    }
  },

  devServer: {
    port: 8085,
    host: 'localhost',
    https: false

  }
}
