module.exports = {
  devServer: {
    port: 9992,
    proxy: {
      '/api': {
        target: 'http://localhost:9991',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
};