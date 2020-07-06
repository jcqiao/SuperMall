//导出配置 这个配置会和webpack.base.config(cli2)合并
//cli3隐藏了webpack.base.config文件 

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'views': '@/views',
        'network': '@/network',
        'common': '@/common'
      }
    }
  },
}