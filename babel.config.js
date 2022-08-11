module.exports = {
    presets: [
      '@vue/app',
        '@babel/preset-env'
    ],
    plugins: [
        // babel-plugin-import 是一款 babel 插件
        // 它会在编译过程中将 import 的写法自动转换为按需引入的方式
        ['import', {
            libraryName: 'vant',
            libraryDirectory: 'es',
            style: true
        }, 'vant'],
        ["component", {
            "libraryName": "mint-ui",
            "style": true
        }],
        ['@babel/plugin-transform-runtime', {
            'corejs': 2
        }]
    ]
  }
